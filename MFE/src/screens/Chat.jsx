/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Chat = () => {
  const [messageList, setMessageList] = useState([]);
  const route = useRoute();
  console.log('Data.UserId: ', route.params.data.userId);

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
          backgroundColor: '#CEC3B0',
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

  const onSend = useCallback(async (messages = []) => {
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
  }, []);
  return (
    <View style={{flex: 1}}>
      <View style={styles.topTab}>
        <Text style={{fontSize: 22, fontWeight: 'bold', alignItems: 'center'}}>
          {route.params.data.username}
        </Text>
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
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Chat;
