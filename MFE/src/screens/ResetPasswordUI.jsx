/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {OtpInput} from 'react-native-otp-entry';
import {user_change_password} from '../api/user_api';
import {isValidPassword} from '../validation/Password';
import {useNavigation} from '@react-navigation/native';

function Title() {
  return (
    <View style={[styles.title, {marginBottom: 100}]}>
      <Text style={styles.titleFont}>تغيير كلمة المرور</Text>
    </View>
  );
}

function ResetPassword({route}) {
  console.log(route.params.email);
  console.log(route.params.from);
  const [resetPass, setResetPass] = useState({
    email: '',
    OTP: '',
    password: '',
    confirmPassword: '',
  });
  const errorMessages = {
    confPassword: 'كلمة المرور غير متطابقة',
  };
  const {OTP, password, confirmPassword} = resetPass;
  const [showPassword, setShowPassword] = useState(false);

  // Use useEffect to set the email when the component mounts
  useEffect(() => {
    handleOnChange(route.params.email, 'email');
  }, [route.params.email]);

  function handleOnChange(value, fieldName) {
    console.log(fieldName, ' == ', value);
    setResetPass(prevState => ({...prevState, [fieldName]: value}));
  }
  const navigation = useNavigation();

  function handleChangePassword() {
    // TODO Call an API to reset password
    if (!isValidPassword(password)) {
      Alert.alert('خطأ في تأكيد كلمة السر', errorMessages.confPassword, [
        {text: 'حسناً'},
      ]);
    } else {
      user_change_password({
        email: resetPass.email,
        password: resetPass.password,
        confirmPassword: resetPass.confirmPassword,
        OTP: resetPass.OTP,
      })
        .then(result => {
          console.log(route.params.from);
          if (route.params.from === 'profile') {
            navigation.navigate('Main');
          } else {
            navigation.navigate('LoginScreen');
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  return (
    <View style={styles.container}>
      <Title />
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: '#8A6F42',
          marginBottom: 20,
        }}>
        ادخل رمز التحقق
      </Text>
      <OtpInput
        numberOfDigits={6}
        focusColor="#8A6F42"
        focusStickBlinkingDuration={500}
        onFilled={e => handleOnChange(e, 'OTP')}
        textInputProps={{
          accessibilityLabel: 'One-Time Password',
        }}
        theme={{
          pinCodeContainerStyle: {borderColor: 'gray'},
          containerStyle: {marginBottom: 30, width: 350},
        }}
      />
      <TextInput
        style={[styles.input, {textAlign: 'right'}]}
        placeholderTextColor={'black'}
        value={password}
        secureTextEntry={!showPassword}
        placeholder="كلمة المرور الجديدة"
        onChangeText={e => handleOnChange(e, 'password')}
      />
      <TextInput
        style={[styles.input, {textAlign: 'right'}]}
        placeholderTextColor={'black'}
        value={confirmPassword}
        secureTextEntry={!showPassword}
        placeholder="تأكيد كلمة المرور"
        onChangeText={e => handleOnChange(e, 'confirmPassword')}
      />
      <TouchableOpacity
        style={{marginBottom: 100, flex: 0.5}}
        onPress={() => setShowPassword(!showPassword)}>
        <Text
          style={{
            flexDirection: 'row-reverse',
            textAlign: 'right',
            fontWeight: 'bold',
          }}>
          {showPassword ? 'اخفاء كلمة المرور' : 'إظهار كلمة المرور'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button2, {marginBottom: 100, marginTop: -100}]}
        onPress={() => {
          console.log(route.params.from);
          handleChangePassword(route.params.from);
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

export default ResetPassword;
