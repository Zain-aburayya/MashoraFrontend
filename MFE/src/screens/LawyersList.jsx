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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const mockUsers = [
  {id: '1', username: 'John Doe'},
  {id: '2', username: 'Jane Smith'},
  {id: '3', username: 'Alice Johnson'},
  {id: '4', username: 'Bob Brown'},
  {id: '5', username: 'Charlie Davis'},
  // Add more mock users as needed
];

const LawyersList = () => {
  const [token, setToken] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem('token').then(res => {
      setToken(res);
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={mockUsers}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.userItem}
            onPress={() => {
              navigation.navigate('PdfView', {token: token, id: item.id});
            }}>
            <Image
              source={require('./Images/profile.png')}
              style={styles.userIcon}
            />
            <Text style={styles.name}>{item.username}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

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
    height: 70,
    borderWidth: 0.5,
    borderRadius: 10,
    paddingLeft: 20,
    alignItems: 'center',
    backgroundColor: '#DAD2C9',
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
});

export default LawyersList;
