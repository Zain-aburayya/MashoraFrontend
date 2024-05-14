/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {get_post_comments, send_comment} from '../api/post_api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Item = ({data}) => {
  const date = new Date(data.timestamp);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const ymd = date.getFullYear() + '-' + month + '-' + day;
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{data.username}</Text>
      <Text style={styles.title}>{data.content}</Text>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.button}>
          <Text>اوافق</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>لا اوافق</Text>
        </TouchableOpacity>
        <Text>{hours + ':' + minutes}</Text>
        <Text>{ymd}</Text>
      </View>
    </View>
  );
};

function PostUI({route}) {
  const data = route.params.data;
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [role, setRole] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    get_post_comments({id: data.id})
      .then(result => {
        if (result.status === 200) {
          setComments(result.data.data);
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setRefreshing(false);
      });
  };

  useEffect(() => {
    onRefresh();
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('role').then(res => {
      setRole(res);
    });
  }, []);

  function handleQuerySend({id}) {
    console.log(id);
    send_comment({id: id, content: content})
      .then(result => {
        if (result.status === 201) {
          console.log('comment -> ', result.data);
          setContent('');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  const date = new Date(data.timestamp);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const ymd = date.getFullYear() + '-' + month + '-' + day;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{data.username}</Text>
        <Text style={styles.title}>{data.title}</Text>
        <Text>{data.content}</Text>
        <View style={styles.bottomContainer}>
          <Text>{hours + ':' + minutes + '\t\t\t\t\t\t\t\t' + ymd}</Text>
        </View>
      </View>
      <FlatList
        data={comments}
        renderItem={({item}) => <Item data={item} />}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <View style={{margin: 35}}></View>
      {role === 'ROLE_LAWYER' && (
        <View style={styles.bottomTab}>
          <TextInput
            style={styles.input}
            placeholderTextColor={'black'}
            value={content}
            placeholder="اسم المستخدم"
            onChangeText={e => setContent(e)}
          />
          <FontAwesome.Button
            name="send"
            size={30}
            color={'#8A6F42'}
            backgroundColor="#DAD2C5"
            onPress={() => handleQuerySend({id: data.id})}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2EFEB',
    paddingTop: StatusBar.currentHeight,
  },
  item: {
    backgroundColor: '#FFFFFF',
    width: 390,
    paddingHorizontal: 10,
    paddingBottom: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(110, 101, 85, 0.3)',
    marginBottom: 10,
  },
  card: {
    width: 390,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 30,
    marginBottom: 10,
    backgroundColor: '#CEC3B0',
    shadowColor: 'black',
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 10, // for Android shadow
    alignItems: 'flex-end', // Align text to the right
  },
  button2: {
    backgroundColor: '#8A6F42',
    width: 80,
    borderRadius: 12,
    borderColor: '#f2efeb',
    borderWidth: 2,
  },
  title: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'right',
  },
  input: {
    height: 60,
    width: 300,
    borderColor: '#8A6F42',
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#F9F9F9',
  },
  bottomContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: -10,
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
  button: {
    backgroundColor: '#f2efeb',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 12,
    borderColor: '#8A6F42',
    borderWidth: 2,
  },
});

export default PostUI;
