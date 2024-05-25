import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {check_lawyer_certificate} from '../api/lawyer_api';

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      checkLogin();
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkLogin = async () => {
    const role = await AsyncStorage.getItem('role');
    const username = await AsyncStorage.getItem('username');
    console.log(role);
    if (role === 'ROLE_LAWYER') {
      check_lawyer_certificate()
        .then(res => {
          if (res === `No certificate ralated to ${username} exist`) {
            navigation.navigate('LawyerInfo');
          } else {
            navigation.navigate('Main');
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else if (role !== null) {
      navigation.navigate('Main');
    } else {
      navigation.navigate('LoginScreen');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>{'مشورة'}</Text>
    </View>
  );
};

export default Splash;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'brown',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 40,
    color: 'white',
    textAlign: 'center',
  },
});
