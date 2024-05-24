import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  StatusBar,
  Image,
  TouchableOpacity,
  Alert,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ChatBot from './ChatBot';
import ChatList from './ChatList';
import PostPage from './PostMain';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';


let id='';

const ChatListLawyer = () => {
  const[users,setUsers]=useState([]);
  const navigation= useNavigation();
  useEffect(()=>{
        getUsers();
  },[]);
  const getUsers=async()=>{
    id=await AsyncStorage.getItem('USERID');
    let tempData=[]
    const username=await AsyncStorage.getItem('username');
    console.log(username);
    firestore()
      .collection('users')
      .where('role','==','ROLE_LAWYER')
      .get()
      .then(res=>{
        if(res.docs.length>0){
          res.docs.map(item=>{
              tempData.push(item.data());
              console.log("////////////>>>>>>>>>");
              console.log(username);
              console.log(id);
              console.log(item.data());
          });
      }
      setUsers(tempData);
      });
  };
  return (
    <View style={styles.container}>
      {/* <View style={styles.topTab}> */}
      <FlatList 
          data={users} 
          renderItem={({item,index})=>{
              return(
                  <TouchableOpacity style={styles.userItem} onPress={()=>{
                    navigation.navigate('Chat',{data:item , id:id});
                  }}>
                      <Image 
                          source={require('./Images/profile.png')} 
                          style={styles.userIcon}
                      />
                      <Text style={styles.name}>{item.username}</Text>
                  </TouchableOpacity>
              );
          }}
      />
      </View>
    // </View>
  );
};
export default ChatListLawyer;
const styles = StyleSheet.create({
  container: {
    flex: 0.85,
    marginTop: StatusBar.currentHeight + 45 || 0,
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
    justifyContent: 'space-between',
  },
  title: {
    color: 'purple',
    fontSize: 20,
    fontWeight: '600',
  },
  userItem: {
    width: Dimensions.get('window').width - 50,
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    height: 60,
    borderWidth: 0.5,
    borderRadius: 10,
    paddingLeft: 20,
    alignItems: 'center',
  },
  userIcon: {
    width: 40,
    height: 40,
  },
  name: {
    color: 'black', 
    marginLeft: 20, 
    fontSize: 20,
  },
});

