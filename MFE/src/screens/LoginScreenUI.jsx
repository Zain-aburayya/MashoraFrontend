/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import isValidEmail from '../validation/Email';
import {isValidPassword} from '../validation/Password';

function Title() {
  return (
    <View style={styles.title}>
      <Text style={styles.titleFont}>مرحباً بك...</Text>
    </View>
  );
}

function ButtonReuse({text, onPress}) {
  return (
    <TouchableOpacity style={styles.button2} onPress={onPress}>
      <Text style={styles.buttonText2}>{text}</Text>
    </TouchableOpacity>
  );
}

function LoginScreen() {
  const [Info, setInfo] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const {email, password} = Info;

  const navigation = useNavigation();

  const errorMessage = 'هناك خطأ في كلمة المرور او البريد الالكتروني';

  function handleOnChange(value, feildName) {
    setInfo({...Info, [feildName]: value});
  }

  async function handleLogin() {
    if (!isValidEmail(email) || !isValidPassword(password)) {
      Alert.alert('خطأ في تسجيل الدخول', errorMessage, [{text: 'حسناً'}]);
    }
    // TODO Add an API for Login process
    // const currentUser = await auth().signInWithEmailAndPassword(
    //   email,
    //   password,
    // );
    // const user = currentUser.user;
    // if (user) {
    //   const isEmailVerified = user.emailVerified;
    //   if (isEmailVerified) {
    //     console.log('User is signed in and email is verified.');
    //   } else {
    //     console.log('User is signed in but email is not verified.');
    //   }
    // }
  }

  return (
    <View style={styles.container}>
      <Title />
      <View style={{flexDirection: 'row', alignContent: 'space-between'}}>
        <TouchableOpacity
          style={[styles.button, {marginRight: 20}]}
          onPress={() => {
            navigation.navigate('LawyerRegister');
          }}>
          <Text style={styles.buttonText}>محامي جديد</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('UserRegister');
          }}>
          <Text style={styles.buttonText}>مستخدم جديد</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholderTextColor={'black'}
        value={email}
        keyboardType="email-address"
        placeholder="البريد الالكتروني"
        onChangeText={e => handleOnChange(e, 'email')}
      />
      <TextInput
        style={[styles.input, {textAlign: 'right'}]}
        placeholderTextColor={'black'}
        value={password}
        secureTextEntry={!showPassword}
        placeholder="كلمة المرور"
        onChangeText={e => handleOnChange(e, 'password')}
      />
      <TouchableOpacity
        style={{marginBottom: 20, marginTop: -10, flex: 0.5}}
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
      <TouchableOpacity>
        <Text style={{fontWeight: 'bold'}}>هل نسيت كلمة المرور؟</Text>
      </TouchableOpacity>
      <ButtonReuse text={'دخول'} onPress={() => handleLogin()} />
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

export default LoginScreen;
