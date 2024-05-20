import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ChatBot from './ChatBot';
import ChatList from './ChatList';
import PostPage from './PostMain';
import Foundation from 'react-native-vector-icons/Foundation';
import {useNavigation} from '@react-navigation/native';

const LawyerMain = ({route}) => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState(1);
  const [reloadKey, setReloadKey] = useState(0);

  const handleTabSelect = tabIndex => {
    setSelectedTab(tabIndex);
    if (tabIndex === 2) {
      setReloadKey(prevKey => prevKey + 1); // Increment the reload key to force re-render
    }
  };

  useEffect(() => {
    if (route && route.params && route.params.tab !== undefined) {
      setSelectedTab(route.params.tab);
      handleTabSelect(2);
    }
  }, [route]);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('تمهل!', 'هل أنت متأكد من خروجك من التطيبق ؟', [
        {
          text: 'لا',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'نعم', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topTab}>
        <TouchableOpacity
          style={styles.tabtop}
          onPress={() => {
            navigation.navigate('Settings');
          }}>
          <Foundation
            name="list"
            size={30}
            color={'#8A6F42'}
            backgroundColor="#DAD2C5"
          />
        </TouchableOpacity>
      </View>
      {selectedTab === 1 ? (
        <ChatBot />
      ) : selectedTab === 0 ? (
        <ChatList />
      ) : (
        <PostPage key={reloadKey} />
      )}
      <View style={styles.bottomTab}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            setSelectedTab(0);
          }}>
          <Image
            source={require('./Images/MessageImage.png')}
            style={[styles.tabIcon]}
          />
          <Text style={styles.text}>رسائل</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            setSelectedTab(1);
          }}>
          <Image
            source={require('./Images/AdelImage.png')}
            style={[styles.adelIcon]}
          />
          <Text> </Text>
          <Text> </Text>
          <Text> </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            setSelectedTab(2);
          }}>
          <Image
            source={require('./Images/MashoratImage.png')}
            style={[styles.tabIcon]}
          />
          <Text style={styles.text}>مشورات</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default LawyerMain;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  tabtop: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 20,
  },
  tab: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    width: 50,
    height: 50,
  },
  adelIcon: {
    width: 130,
    height: 130,
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
  },
});
