/* eslint-disable react/self-closing-comp */
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
  RefreshControl,
  ActivityIndicator,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {get_posts} from '../api/post_api';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Item = ({data}) => {
  const navigation = useNavigation();
  const date = new Date(data.timestamp);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const ymd = date.getFullYear() + '-' + month + '-' + day;
  return (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => navigation.navigate('PostUI', {data: data})}>
        <View>
          <TouchableOpacity
            style={styles.profileContainer}
            onPress={() => {
              navigation.navigate('ClickedProfile', {
                userInfo: {username: data.username},
              });
            }}>
            <Image
              source={require('./Images/profile.png')}
              style={styles.imagePost}
            />
            <Text style={styles.username}>{data.username}</Text>
          </TouchableOpacity>
        </View>
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
    </View>
  );
};

const PostMain = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [role, setRole] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const onRefresh = () => {
    setRefreshing(true);
    get_posts({
      page: page,
    })
      .then(result => {
        if (result.status === 200) {
          setPosts(prevPosts => {
            // Combine previous posts and new posts
            const combinedPosts = [...prevPosts, ...result.data.data.content];
            // Create a Set to remove duplicates
            const uniquePosts = Array.from(
              new Set(combinedPosts.map(post => post.id)),
            ).map(id => combinedPosts.find(post => post.id === id));
            return uniquePosts;
          });
          setTotalPages(result.data.data.totalPages);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // to get the role from Async Storage
  useEffect(() => {
    AsyncStorage.getItem('role').then(res => {
      setRole(res);
    });
  }, []);

  // for the loader
  useEffect(() => {
    get_posts({
      page: page,
    })
      .then(result => {
        if (result.status === 200) {
          setPosts(prevPosts => {
            // Combine previous posts and new posts
            const combinedPosts = [...prevPosts, ...result.data.data.content];
            // Create a Set to remove duplicates
            const uniquePosts = Array.from(
              new Set(combinedPosts.map(post => post.id)),
            ).map(id => combinedPosts.find(post => post.id === id));
            return uniquePosts;
          });
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setRefreshing(false);
      });
  }, [page]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          data={posts}
          renderItem={({item}) => <Item data={item} />}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
      {role === 'ROLE_CUSTOMER' && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('PostQuestion')}>
          <MaterialIcons name="post-add" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      )}
      {page != totalPages && (
        <TouchableOpacity
          style={styles.loadButton}
          onPress={() => setPage(prevPage => prevPage + 1)}>
          <Text style={{color: '#FFFFFF', fontSize: 15, fontWeight: 'bold'}}>
            تحميل المزيد
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.85,
    marginTop: StatusBar.currentHeight + 45 || 0,
  },
  item: {
    backgroundColor: '#CEC3B0',
    paddingHorizontal: 10,
    paddingBottom: 20,
    marginBottom: 10,
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
  loadButton: {
    position: 'absolute',
    bottom: -30,
    left: 20,
    backgroundColor: '#8A6F42',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePost: {
    width: 60,
    height: 60,
  },
  profileContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
});
export default PostMain;
