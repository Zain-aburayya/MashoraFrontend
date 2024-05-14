/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {get_posts} from '../api/post_api';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

const Item = ({data}) => {
  const navigation = useNavigation();
  const date = new Date(data.timestamp);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const ymd = date.getFullYear() + '-' + month + '-' + day;
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('PostUI', {data: data})}>
      <Text style={styles.username}>{data.username}</Text>
      <Text style={styles.title}>{data.title}</Text>
      <View style={styles.bottomContainer}>
        <Text>{hours + ':' + minutes}</Text>
        <Text>{ymd}</Text>
        <View
          style={{
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <FontAwesome5 name="comment-dots" size={22} color={'#8A6F42'} />
          <Text style={{marginRight: 6}}>{data.comments.length}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const PostMain = () => {
  // TODO :: API Call for add a new post
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    get_posts()
      .then(result => {
        if (result.status === 200) {
          setPosts(result.data.data.content);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({item}) => <Item data={item} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#CEC3B0',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 15,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  title: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'right',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: -10,
  },
});
export default PostMain;
