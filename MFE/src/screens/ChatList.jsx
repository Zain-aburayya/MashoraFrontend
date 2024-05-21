import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';

let id='';

const ChatList = () => {
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
      .where('username','!=',username)
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
  );
};
export default ChatList;
const styles = StyleSheet.create({
  container: {
    flex: 0.85,
    marginTop: StatusBar.currentHeight + 45 || 0,
  },
  
  header: {
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
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

