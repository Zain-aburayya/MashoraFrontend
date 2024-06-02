/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {GiftedChat, Bubble, Avatar} from 'react-native-gifted-chat';
import {useNavigation, useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

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
      firestore()
        .collection('chats')
        .doc('' + route.params.id + route.params.data.userId)
        .collection('messages')
        .add(myMsg);
      firestore()
        .collection('chats')
        .doc('' + route.params.data.userId + route.params.id)
        .collection('messages')
        .add(myMsg);

      // Check if the chat document already exists
      const chatRef = firestore()
        .collection('chats')
        .doc(route.params.id + route.params.data.userId);
      const chatDoc = await chatRef.get();

      // If chat document doesn't exist, create it with status set to 'open'
      if (!chatDoc.exists) {
        await chatRef.set({
          status: 'open',
          feedback: 'open',
          // Add any other initial fields you need for the chat document
        });
      }
    },
    [chatStatus],
  );

  if (chatStatus === 'closed' && feedbackStatus === 'open') {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>
          المحادثة تم إغلاقها...
        </Text>
        {route.params.data.role !== 'ROLE_CUSTOMER' && (
          <TouchableOpacity
            style={styles.button2}
            onPress={() => {
              navigation.navigate('RateLawyer', {
                lawyerUsername: route.params.data.username,
                lawyerUserId: route.params.data.userId,
                customerUserId: route.params.id,
              });
              // const handleFeedbackSubmit = async () => {

              // Update feedback status to 'closed'
              // await firestore()
              //   .collection('chats')
              //   .doc(route.params.id + route.params.data.userId)
              //   .update({
              //     feedback: 'closed',
              //   });

              // await firestore()
              //   .collection('chats')
              //   .doc(route.params.data.userId + route.params.id)
              //   .update({
              //     feedback: 'closed',
              //   });

              // setFeedbackStatus('closed'); // Update local feedback state

              // Alert.alert('Thank you for your feedback.');
              // };
            }}>
            <Text style={styles.buttonText2}>قم بتقييم المحامي من فضلك..</Text>
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
