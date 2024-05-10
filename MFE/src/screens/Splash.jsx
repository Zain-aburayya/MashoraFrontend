import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      checkLogin();
    }, 2000);
  }, []);

  const checkLogin = async () => {
    const token = await AsyncStorage.getItem('AccessToken');
    if (token !== null) {
      navigation.navigate('Wallet');
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
