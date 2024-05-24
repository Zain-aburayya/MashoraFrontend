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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

let id = '';

const ChatList = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = async () => {
    try {
      id = await AsyncStorage.getItem('USERID');
      const email = await AsyncStorage.getItem('username');
      const tempData = [];
      console.log(email);
      const usersSnapshot = await firestore()
        .collection('users')
        .where('role', '==', 'ROLE_LAWYER')
        .get();

      await Promise.all(
        usersSnapshot.docs.map(async userDoc => {
          const toId = userDoc.data().userId;
          const messagesSnapshot = await firestore()
            .collection('chats')
            .doc(id + toId)
            .collection('messages')
            .get();

          if (messagesSnapshot.docs.length > 0) {
            tempData.push(userDoc.data());
          }
        }),
      );

      setUsers(tempData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={styles.userItem}
              onPress={() => {
                navigation.navigate('Chat', {data: item, id: id});
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
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('ChatListLawyer')}>
        <MaterialIcons name="post-add" size={30} color="#FFFFFF" />
      </TouchableOpacity>
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
    height: 70,
    borderWidth: 0.5,
    borderRadius: 10,
    paddingLeft: 20,
    alignItems: 'center',
    backgroundColor: '#DAD2C5',
  },
  userIcon: {
    width: 60,
    height: 60,
  },
  name: {
    color: 'black',
    marginLeft: 20,
    fontSize: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: -30,
    right: 20,
    backgroundColor: '#8A6F42',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
