/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

function ButtonReuse({emoji, text, color, backColor, navigateTo}) {
  const navigation = useNavigation();
  return (
    <>
      <Entypo.Button
        name={emoji}
        color={color}
        size={40}
        backgroundColor={backColor}
        onPress={() => {
          navigation.navigate(navigateTo);
        }}
        style={{
          flexDirection: 'row-reverse',
          width: 272,
        }}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: color,
            flex: 1,
            textAlign: 'center',
          }}>
          {text}
        </Text>
      </Entypo.Button>
      <View style={{marginBottom: 30}}></View>
    </>
  );
}

function SettingsUI() {
  const navigation = useNavigation();
  function handleLoguot() {
    Alert.alert('تسجيل الخروج', 'هل أنت متأكد من تسجيل خروجك ؟', [
      {
        text: 'لا',
        onPress: () => null,
      },
      {
        text: 'نعم',
        onPress: () => {
          try {
            let keys = ['token', 'role'];
            AsyncStorage.multiRemove(keys);
            console.log('data removed :)');
            navigation.navigate('LoginScreen');
          } catch (err) {
            console.log(err);
          }
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <ButtonReuse
        text={'حسابي'}
        color={'#8A6F42'}
        backColor={'#E6E0D7'}
        emoji={'user'}
        navigateTo={'Profile'}
      />

      <ButtonReuse
        text={'محفظتي'}
        backColor={'#8A6F42'}
        color={'#E6E0D7'}
        emoji={'wallet'}
        navigateTo={'Wallet'}
      />

      <ButtonReuse
        text={'إتصل بنا'}
        color={'#8A6F42'}
        backColor={'#E6E0D7'}
        emoji={'phone'}
        navigateTo={'ContactUs'}
      />

      <ButtonReuse
        text={'عن مشورة'}
        backColor={'#8A6F42'}
        color={'#E6E0D7'}
        emoji={'text-document'}
        navigateTo={'AboutUs'}
      />
      <Entypo.Button
        name={'log-out'}
        color={'#8A6F42'}
        size={40}
        backgroundColor={'#E6E0D7'}
        onPress={() => {
          handleLoguot();
        }}
        style={{
          flexDirection: 'row-reverse',
          width: 272,
        }}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: '#8A6F42',
            flex: 1,
            textAlign: 'center',
          }}>
          تسجيل الخروج
        </Text>
      </Entypo.Button>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
  },
  titleFont: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 36,
    fontWeight: 'bold',
    color: '#8A6F42',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2efeb',
  },
  inputContainer: {
    flexDirection: 'row',
  },
  nameInput: {
    paddingHorizontal: 3,
  },

  input: {
    height: 60,
    width: 350,
    borderColor: '#8A6F42',
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#F9F9F9',
  },
  input_name: {
    height: 60,
    width: 170,
    borderColor: '#8A6F42',
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#F9F9F9',
  },
  button: {
    backgroundColor: '#f2efeb',
    paddingHorizontal: 25,
    paddingVertical: 10,
    marginBottom: 30,
    borderRadius: 12,
    borderColor: '#8A6F42',
    borderWidth: 2,
  },
  buttonText: {
    color: '#8A6F42',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button2: {
    backgroundColor: '#8A6F42',
    paddingHorizontal: 130,
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 20,
    borderColor: '#f2efeb',
    borderWidth: 2,
  },
  buttonText2: {
    color: '#f2efeb',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 12,
    flexDirection: 'row-reverse',
  },
});

export default SettingsUI;
