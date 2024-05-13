import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import ChatBot from './ChatBot';
import LawyerChatList from './LawyerChatList';
import LawyerPostPage from './LawyerPostPage';
const LawyerMain = () => {
  const [selectedTab, setSelectedTab] = useState(1);
  return (
    <View style={styles.container}>
      {selectedTab === 1 ? (
        <ChatBot />
      ) : selectedTab === 0 ? (
        <LawyerChatList />
      ) : (
        <LawyerPostPage />
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
