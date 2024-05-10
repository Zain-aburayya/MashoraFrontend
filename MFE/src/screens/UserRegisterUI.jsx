/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import Checkbox from '../components/Checkbox';
import isValidName from '../validation/Username';
import isValidEmail from '../validation/Email';
import isValidPhoneNumber from '../validation/PhoneNumber';
import {useNavigation} from '@react-navigation/native';
import {BASE_URL} from '../constants/constant';

import {
  isValidPassword,
  confirmPasswordValidation,
} from '../validation/Password';

import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

function Title() {
  return (
    <View style={styles.title}>
      <Text style={styles.titleFont}>مرحباً بك...</Text>
    </View>
  );
}

function LoginButton({navigation}) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('LoginScreen')}>
      <Text style={styles.buttonText}>تسجيل الدخول</Text>
    </TouchableOpacity>
  );
}

function ButtonReuse({text, onPress}) {
  return (
    <TouchableOpacity style={styles.button2} onPress={onPress}>
      <Text style={styles.buttonText2}>{text}</Text>
    </TouchableOpacity>
  );
}

export default function UserRegister() {
  const navigation = useNavigation();
  const [checkBoxState, setCheckBoxState] = useState(false);
  // const [currentUser, setCurrentUser] = useState(null);
  const [userInfo, setUserInfo] = useState({
    username: '',
    firstname: '',
    lastname: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const {
    username,
    firstname,
    lastname,
    phoneNumber,
    email,
    password,
    confirmPassword,
  } = userInfo;

  const errorMessages = {
    username: 'اسم المستخدم المدخل غير صالح.',
    name: 'يجب أن يكون الاسم الأول والأخير أكثر من حرفين وأقل من 26 حرفًا، ويجب أن يحتوي فقط على أحرف عربية.',
    email: 'البريد الإلكتروني غير صحيح، يرجى إدخاله مرة أخرى.',
    phone:
      'رقم الهاتف غير صحيح، يرجى التأكد منه مرة أخرى.\nتنويه: يرجى إضافة رمز الدولة مع علامة +\n+9627********',
    password:
      'يجب أن تكون كلمة المرور الخاصة بك على الأقل 8 أحرف ولكن لا تزيد عن 15 حرفًا. يجب أن تحتوي على مزيج من الرموز الخاصة والحروف الصغيرة والحروف الكبيرة والأرقام.',
    confirmPassword: 'كلمة المرور غير متطابقة',
    checkBox: 'لم توافق بعد على شروط الاستخدام الخاصة بنا.',
  };

  function handlePress() {
    console.log(username);
    if (!isValidName(username, 'username')) {
      Alert.alert('خطأ في اسم المستخدم', errorMessages.username, [
        {text: 'حسناً'},
      ]);
    } else if (
      !isValidName(lastname, 'name') ||
      !isValidName(firstname, 'name')
    ) {
      Alert.alert('خطأ في الإسم الاول او الأخير', errorMessages.name, [
        {text: 'حسناً'},
      ]);
    } else if (!isValidEmail(email)) {
      Alert.alert('خطأ في البريد الإلكتروني', errorMessages.email, [
        {text: 'حسناً'},
      ]);
    } else if (!isValidPhoneNumber(phoneNumber)) {
      Alert.alert('خطأ في رقم الهاتف', errorMessages.phone, [{text: 'حسناً'}]);
    } else if (!isValidPassword(password)) {
      Alert.alert('خطأ في كلمة السر', errorMessages.password, [
        {text: 'حسناً'},
      ]);
    } else if (!confirmPasswordValidation(password, confirmPassword)) {
      Alert.alert('خطأ في تأكيد كلمة السر', errorMessages.confirmPassword, [
        {text: 'حسناً'},
      ]);
    } else if (!checkBoxState) {
      Alert.alert('لم توافق على الشروط', errorMessages.checkBox, [
        {text: 'حسناً'},
      ]);
    } else {
      //signup();
      navigation.navigate("ChatListLawyer");
    }
  }

  function handleOnChange(value, feildName) {
    setUserInfo({...userInfo, [feildName]: value});
  }

  const signup = async () => {
    const apiUrl = BASE_URL + 'auth/signup';
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, email, password, role: ['user']}),
    };
    try {
      const response = await fetch(apiUrl, option);

      if (!response.ok) {
        console.log(response);
        if (response.status === 400) {
          const responseData = await response.json();
          if (responseData.message === 'Error: Email is already in use!') {
            Alert.alert(
              'البريد الاكتروني مستخدم',
              'الرجاء استخدام بريد الكتروني آخر.',
              [{text: 'حسناً'}],
            );
          } else if (
            responseData.message === 'Error: Username is already taken!'
          ) {
            Alert.alert(
              'اسم المستخدم مُستخدم بالفعل',
              'الرجاء ادحل اسم مستخدم جديد.',
              [{text: 'حسناً'}],
            );
          }
        }
        throw new Error(`HTTP error! status: ${response}`);
      }

      const responseData = await response.json(); // Use response.text() for plain string
      console.log(responseData);
      Alert.alert(
        'تم إضافتك كمستخدم جديد',
        'الرجاء قم تأكيد بريدك الاكتروني للسماح لك بالدخول.',
        [{text: 'حسناً', onPress: () => navigation.navigate('LoginScreen')}],
      );
    } catch (err) {
      console.log('error : ', err);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Title />
        <LoginButton navigation={navigation} />
        <TextInput
          style={styles.input}
          placeholderTextColor={'black'}
          value={username}
          placeholder="اسم المستخدم"
          onChangeText={e => handleOnChange(e, 'username')}
        />
        <View style={styles.inputContainer}>
          <View style={styles.nameInput}>
            <TextInput
              style={styles.input_name}
              placeholderTextColor={'black'}
              value={lastname}
              placeholder="الاسم الأخير"
              onChangeText={e => handleOnChange(e, 'lastname')}
            />
          </View>
          <View style={styles.nameInput}>
            <TextInput
              style={styles.input_name}
              placeholderTextColor={'black'}
              value={firstname}
              placeholder="الاسم الأول"
              onChangeText={e => handleOnChange(e, 'firstname')}
            />
          </View>
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
          style={styles.input}
          placeholderTextColor={'black'}
          value={phoneNumber}
          placeholder="رقم الهاتف"
          onChangeText={e => handleOnChange(e, 'phoneNumber')}
        />

        <TextInput
          style={[styles.input, {textAlign: 'right'}]}
          placeholderTextColor={'black'}
          value={password}
          secureTextEntry={!showPassword}
          placeholder="كلمة المرور"
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
          style={{marginBottom: 20, marginTop: -10, alignItems: 'flex-end'}}
          onPress={() => setShowPassword(!showPassword)}>
          <Text
            style={{
              flexDirection: 'row-reverse',
              textAlign: 'right',
              fontWeight: 'bold',
            }}>
            {showPassword ? 'اخفاء كلمة السر' : 'إظهار كلمة السر'}
          </Text>
        </TouchableOpacity>
        <Checkbox
          text="من خلال إنشاء حساب، فإنك توافق على شروط الاستخدام وسياسة
          الخصوصية الخاصة بنا "
          onPress={isChecked => setCheckBoxState(isChecked)}
        />
        <ButtonReuse text="تسجيل" onPress={handlePress} />
      </View>
    </>
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
    paddingHorizontal: 150,
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
