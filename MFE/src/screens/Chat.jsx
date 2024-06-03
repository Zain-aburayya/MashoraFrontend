/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import {useNavigation, useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {deposit_lawyer} from '../api/payment_api';

const Chat = () => {
  const [messageList, setMessageList] = useState([]);
  const [chatStatus, setChatStatus] = useState('open'); // Add chatStatus state
  const [feedbackStatus, setFeedbackStatus] = useState('open'); // Add feedbackStatus state
  const route = useRoute();
  console.log('Data.UserId: ', route.params.data);
  const navigation = useNavigation();

  const renderBubble = props => (
    <Bubble
      {...props}
      textStyle={{
        right: {
          color: 'white',
        },
        left: {
          color: 'black',
        },
      }}
      wrapperStyle={{
        right: {
          backgroundColor: '#8A6F42',
        },
        left: {
          backgroundColor: 'white',
          borderWidth: 1,
          borderBlockColor: '#8A6F42',
        },
      }}
    />
  );

  useEffect(() => {
    const subscriber = firestore()
      .collection('chats')
      .doc(route.params.id + route.params.data.userId)
      .collection('messages')
      .orderBy('createdAt', 'desc');
    return subscriber.onSnapshot(querysnapshot => {
      const allmessages = querysnapshot.docs.map(item => {
        return {...item._data, createdAt: item._data.createdAt};
      });
      setMessageList(allmessages);
    });
  }, []);

  useEffect(() => {
    // Check chat and feedback status when component mounts
    const unsubscribe = firestore()
      .collection('chats')
      .doc(route.params.id + route.params.data.userId)
      .onSnapshot(doc => {
        if (doc.exists) {
          setChatStatus(doc.data().status);
          setFeedbackStatus(doc.data().feedback || 'open'); // Set feedback status
        }
      });

    return () => unsubscribe();
  }, []);

  const endChat = async () => {
    await firestore()
      .collection('chats')
      .doc(route.params.id + route.params.data.userId)
      .update({
        status: 'closed', // Update chat status to closed
        feedback: 'open', // Set feedback status to open
      });

    await firestore()
      .collection('chats')
      .doc(route.params.data.userId + route.params.id)
      .update({
        status: 'closed', // Update chat status to closed
        feedback: 'open', // Set feedback status to open
      });

    setChatStatus('closed'); // Update local state
    setFeedbackStatus('open'); // Update local feedback state

    // Optional: Add any additional logic you need when chat is ended

    Alert.alert('Chat ended successfully.');
  };

  const onSend = useCallback(
    async (messages = []) => {
      if (chatStatus === 'closed') {
        Alert.alert('Chat is closed and no messages can be sent.');
        return;
      }

      const msg = messages[0];
      const myMsg = {
        ...msg,
        sendBy: route.params.id,
        sendTo: route.params.data.userId,
        createdAt: Date.parse(msg.createdAt),
      };
      setMessageList(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      );

      const docId1 = route.params.id + route.params.data.userId;
      const docId2 = route.params.data.userId + route.params.id;

      // Add the message to both chat document formats
      firestore()
        .collection('chats')
        .doc(docId1)
        .collection('messages')
        .add(myMsg);
      firestore()
        .collection('chats')
        .doc(docId2)
        .collection('messages')
        .add(myMsg);

      // Check if the chat document with docId1 already exists
      const chatRef1 = firestore().collection('chats').doc(docId1);
      const chatDoc1 = await chatRef1.get();

      // If chat document with docId1 doesn't exist, create it with status set to 'open'
      if (!chatDoc1.exists) {
        await chatRef1.set({
          status: 'open',
          feedback: 'open',
          // Add any other initial fields you need for the chat document
        });
      }

      // Check if the chat document with docId2 already exists
      const chatRef2 = firestore().collection('chats').doc(docId2);
      const chatDoc2 = await chatRef2.get();

      // If chat document with docId2 doesn't exist, create it with status set to 'open'
      if (!chatDoc2.exists) {
        await chatRef2.set({
          status: 'open',
          feedback: 'open',
          // Add any other initial fields you need for the chat document
        });
      }
    },
    [chatStatus],
  );

  function handleStartAChat() {
    Alert.alert(
      'تنبيه!!',
      'للتحدث مع المحامي ، يجب أولاً أن تعلم أنه سيتم خصم مبلغ يقدر بـ 10 دينارًا. إذا لم يكن لديك هذا المبلغ في محفظة التطبيق، يتعين عليك إيداع المال. وفي حال كان لديك المبلغ وأكملت الدفع، ستتمكن من الانتقال إلى الدردشة الخاصة مع المحامي.',
      [
        {
          text: 'لا',
          onPress: () => null,
        },
        {
          text: 'نعم',
          onPress: async () => {
            try {
              const result = await deposit_lawyer({
                lawyerUsername: route.params.data.username,
                amount: 10,
              });

              if (result.status === 200) {
                const docId1 = route.params.id + route.params.data.userId;
                const docId2 = route.params.data.userId + route.params.id;

                // Update the status of both chat documents to 'open'
                await firestore().collection('chats').doc(docId1).set(
                  {
                    status: 'open',
                    feedback: 'open',
                  },
                  {merge: true},
                );

                await firestore().collection('chats').doc(docId2).set(
                  {
                    status: 'open',
                    feedback: 'open',
                  },
                  {merge: true},
                );

                // Update local state
                setChatStatus('open');
                setFeedbackStatus('open');

                navigation.navigate('Chat', {
                  data: route.params.data,
                  id: route.params.id,
                });
              }
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
    );
  }

  console.log('here ', chatStatus);
  if (chatStatus === 'closed') {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>
          المحادثة تم إغلاقها...
        </Text>
        {route.params.data.role !== 'ROLE_CUSTOMER' &&
          feedbackStatus !== 'closed' && (
            <TouchableOpacity
              style={styles.button2}
              onPress={() => {
                navigation.navigate('RateLawyer', {
                  lawyerUsername: route.params.data.username,
                  lawyerUserId: route.params.data.userId,
                  customerUserId: route.params.id,
                });
              }}>
              <Text style={styles.buttonText2}>
                قم بتقييم المحامي من فضلك..
              </Text>
            </TouchableOpacity>
          )}
        {route.params.data.role !== 'ROLE_CUSTOMER' && (
          <TouchableOpacity
            style={[styles.button2, {marginTop: 9}]}
            onPress={() => {
              handleStartAChat();
            }}>
            <Text style={styles.buttonText2}>ابدأ محادثتك</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <View style={{flex: 1, paddingTop: 60}}>
      <View style={styles.topTab}>
        <Text style={{fontSize: 22, fontWeight: 'bold', alignItems: 'center'}}>
          {route.params.data.username}
        </Text>
        {route.params.data.role !== 'ROLE_LAWYER' && (
          <TouchableOpacity
            style={styles.button2}
            onPress={() => {
              endChat();
            }}>
            <Text style={styles.buttonText2}>انهاء المحادثة</Text>
          </TouchableOpacity>
        )}
      </View>
      <GiftedChat
        messages={messageList}
        onSend={messages => onSend(messages)}
        user={{
          _id: route.params.id,
        }}
        renderBubble={renderBubble}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bottomTab: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 75,
    backgroundColor: '#F2F2F2',
    borderColor: 'rgba(110, 101, 85, 0.3)',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  topTab: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 60,
    backgroundColor: '#DAD2C5',
    borderColor: 'rgba(110, 101, 85, 0.3)',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button2: {
    backgroundColor: '#8A6F42',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 2,
    height: 50,
  },
  buttonText2: {
    color: '#f2efeb',
    fontSize: 25,
    fontWeight: 'bold',
  },
});
export default Chat;
