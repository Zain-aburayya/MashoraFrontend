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
import {isValidPassword} from '../validation/Password';
import {user_login} from '../api/user_api';
import isValidName from '../validation/Username';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {check_lawyer_certificate} from '../api/lawyer_api';

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
  const navigation = useNavigation();

  const [Info, setInfo] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const {username, password} = Info;

  const errorMessage = 'هناك خطأ في كلمة المرور او اسم المستخدم';

  function handleOnChange(value, feildName) {
    setInfo({...Info, [feildName]: value});
  }

  async function handleLogin() {
    if (!isValidName(username, 'username') || !isValidPassword(password)) {
      Alert.alert('خطأ في تسجيل الدخول', errorMessage, [{text: 'حسناً'}]);
      return;
    }
    console.log(username);
    try {
      //console.log('---', username);
      const result = await user_login({username: username, password: password});
      if (result.status === 200) {
        const userQuerySnapshot = await firestore()
          .collection('users')
          .where('username', '==', result.data.username)
          .get();
        console.log('usrname inside the firestore : ', result.data.username);
        if (!userQuerySnapshot.empty) {
          console.log(
            'from login -> ',
            JSON.stringify(userQuerySnapshot.docs[0].data()),
          );
          await goToNext(userQuerySnapshot.docs[0].data().userId);
        } else {
          Alert.alert('User not found');
          return;
        }

        // eslint-disable-next-line no-shadow
        const {token, roles, username, id, email} = result.data;
        console.log(result.data);

        // Prepare the data to be saved
        const items = [
          ['token', token],
          ['role', roles[0]],
          ['username', username],
          ['email', email],
          ['id', id.toString()], // Convert id to string as AsyncStorage stores only strings
        ];

        await AsyncStorage.multiSet(items);
        console.log(result.data);
        console.log(token);
        console.log(roles[0]);
        console.log(email);
        console.log(username);
        if (roles[0] === 'ROLE_LAWYER') {
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
        } else {
          navigation.navigate('Main');
        }
      } else {
        Alert.alert(
          'خطأ في تسجيل الدخول',
          'تأكد من البريد الاكتروني وكلمة المرور',
          [{text: 'حسناً'}],
        );
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  const goToNext = async userId => {
    try {
      await AsyncStorage.setItem('USERID', userId);
    } catch (error) {
      console.error('Error saving userId to AsyncStorage:', error);
    }
  };

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
        value={username}
        placeholder="اسم المستخدم"
        onChangeText={e => handleOnChange(e, 'username')}
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
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ForgetPassword');
        }}>
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
