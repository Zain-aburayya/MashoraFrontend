/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {user_password_reset} from '../api/user_api';
function Title() {
  return (
    <View style={[styles.title, {marginBottom: 50}]}>
      <Text style={styles.titleFont}> نسيت كلمة المرور</Text>
    </View>
  );
}
function ForgetPassword() {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Title />
      <TextInput
        style={styles.input}
        placeholderTextColor={'black'}
        value={email}
        placeholder="ادحل البريد الاكتروني الخاص بك"
        onChangeText={e => setEmail(e)}
      />
      <TouchableOpacity
        style={styles.button2}
        onPress={() => {
          user_password_reset({email: email})
            .then(result => {
              console.log(result);
              navigation.navigate('ResetPassword', {
                email: email,
                from: 'forgetPassword',
              });
            })
            .catch(err => {
              console.log(err);
            });
        }}>
        <Text style={styles.buttonText2}>تغيير كلمة المرور</Text>
      </TouchableOpacity>
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

export default ForgetPassword;
