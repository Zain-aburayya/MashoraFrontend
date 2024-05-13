/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
function Blog({navigation}) {
  const [blogs, setBlogs] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    getBlogs();
  }, [isFocused]);

  const getBlogs = () => {
    // firestore()
    //   .collection('Blogs')
    //   .get()
    //   .then(querySnapshot => {
    //     console.log('Total users: ', querySnapshot.size);
    //     let tempData = [];
    //     querySnapshot.forEach(documentSnapshot => {
    //       tempData.push(documentSnapshot.data());
    //       //   console.log(
    //       //     'User ID: ',
    //       //     documentSnapshot.id,
    //       //     documentSnapshot.data(),
    //       //   );
    //     });
    //     console.log(tempData);
    //     setBlogs(tempData);
    //   });
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          width: '100%',
          height: 50,
          backgroundColor: 'purple',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#fff',
            marginLeft: 20,
            fontSize: 18,
            fontWeight: '700',
          }}>
          BlogApp
        </Text>
        <Text
          style={{
            color: '#fff',
            marginRight: 20,
            fontSize: 18,
            fontWeight: '700',
          }}
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          Profile
        </Text>
      </View>
      <FlatList
        data={blogs}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                width: '90%',

                alignSelf: 'center',
                elevation: 3,
                backgroundColor: '#fff',
                marginTop: 20,
                borderRadius: 10,
              }}>
              <View style={{flexDirection: 'row', width: '100%'}}>
                {item.userImage === '' ? (
                  {
                    /* <Image
                    source={require('../images/user.png')}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      marginTop: 10,
                      marginLeft: 10,
                    }}
                  /> */
                  }
                ) : (
                  <Image
                    source={{uri: item.userImage}}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      marginTop: 10,
                      marginLeft: 10,
                    }}
                  />
                )}

                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 18,
                    fontWeight: '600',
                    marginLeft: 10,
                  }}>
                  {item.name}
                </Text>
              </View>
              <Text style={{margin: 10, fontSize: 16, fontWeight: '600'}}>
                {item.caption}
              </Text>
              <Image
                source={{uri: item.blogImage}}
                style={{
                  width: '90%',
                  height: 200,
                  borderRadius: 10,
                  alignSelf: 'center',
                  marginBottom: 20,
                }}
              />
            </View>
          );
        }}
      />
      <TouchableOpacity
        style={{
          width: 150,
          height: 50,
          borderRadius: 30,
          backgroundColor: 'purple',
          position: 'absolute',
          right: 20,
          bottom: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          navigation.navigate('AddNewBlog');
        }}>
        <Text style={{color: '#fff'}}>Add New Blog</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Blog;
