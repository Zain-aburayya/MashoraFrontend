import {View, Text} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

const Chat=()=>{
  const[messageList,setMessageList]=useState([]);
  const route=useRoute();
  console.log("Data.UserId: " , route.params.data.userId);
  useEffect(()=>{
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
  },[]);

  const onSend=useCallback(async (messages=[])=>{
      const msg=messages[0];
      const myMsg={
        ...msg,
        sendBy: route.params.id,
        sendTo: route.params.data.userId,
        createdAt: Date.parse(msg.createdAt),
      };
      setMessageList(previousMessages =>
          GiftedChat.append(previousMessages,messages),
      );
      firestore()
        .collection('chats')
        .doc(''+ route.params.id + route.params.data.userId)
        .collection('messages')
        .add(myMsg);
      firestore()
        .collection('chats')
        .doc(''+ route.params.data.userId +route.params.id)
        .collection('messages')
        .add(myMsg);
  },[]);
  return(
    <View style={{flex: 1}}>
      <GiftedChat
        messages={messageList}
        onSend={messages=>onSend(messages)}
        user={{
            _id: route.params.id,
        }}
      />
    </View>
  );
}   
export default Chat;