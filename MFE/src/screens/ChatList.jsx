import React, {useEffect, useState} from 'react';
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
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ChatList = () => {
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState('');
  const [roleFirestore, setRoleFireStore] = useState('');
  const [id, setId] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const storedRole = await AsyncStorage.getItem('role');
      setRole(storedRole);
      setRoleFireStore(
        storedRole === 'ROLE_LAWYER' ? 'ROLE_CUSTOMER' : 'ROLE_LAWYER',
      );
    };

    fetchData();
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const storedId = await AsyncStorage.getItem('USERID');
        setId(storedId);
        const email = await AsyncStorage.getItem('username');
        const tempData = [];
        const usersSnapshot = await firestore()
          .collection('users')
          .where('role', '==', roleFirestore)
          .get();

        await Promise.all(
          usersSnapshot.docs.map(async userDoc => {
            const toId = userDoc.data().userId;
            const messagesSnapshot = await firestore()
              .collection('chats')
              .doc(storedId + toId)
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

    getUsers();
  }, [roleFirestore]);

  return (
    <View style={styles.container}>
      {users.length > 0 ? (
        <FlatList
          data={users}
          renderItem={({item}) => (
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
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={styles.noMessagesText}>لا يوجد اي رسائل من قبل...</Text>
      )}
      {role === 'ROLE_CUSTOMER' && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('ChatListLawyer')}>
          <MaterialIcons name="post-add" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight + 45 || 0,
  },
  noMessagesText: {
    textAlign: 'center',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 'bold',
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
