/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

function Title() {
  return (
    <View style={[styles.title, {marginBottom: 100}]}>
      <Text style={styles.titleFont}>تغيير كلمة المرور</Text>
    </View>
  );
}

function ButtonReuse({text, onPress}) {
  return (
    <TouchableOpacity
      style={[styles.button2, {marginBottom: 100, marginTop: -100}]}
      onPress={onPress}>
      <Text style={styles.buttonText2}>{text}</Text>
    </TouchableOpacity>
  );
}

function ResetPassword() {
  const [resetPass, setResetPass] = useState({
    oldPassword: '',
    newPassword: '',
    confPassword: '',
  });

  const {oldPassword, newPassword, confPassword} = resetPass;
  const [showPassword, setShowPassword] = useState(false);
  function handleOnChange(value, feildName) {
    setResetPass({...resetPass, [feildName]: value});
  }

  function handleResetPassword() {
    // TODO Call an API to reset password
  }

  return (
    <View style={styles.container}>
      <Title />
      <TextInput
        style={[styles.input, {textAlign: 'right'}]}
        placeholderTextColor={'black'}
        value={oldPassword}
        secureTextEntry={!showPassword}
        placeholder="كلمة المرور القديمة"
        onChangeText={e => handleOnChange(e, 'oldPassword')}
      />
      <TextInput
        style={[styles.input, {textAlign: 'right'}]}
        placeholderTextColor={'black'}
        value={newPassword}
        secureTextEntry={!showPassword}
        placeholder="كلمة المرور الجديدة"
        onChangeText={e => handleOnChange(e, 'newPassword')}
      />
      <TextInput
        style={[styles.input, {textAlign: 'right'}]}
        placeholderTextColor={'black'}
        vvalue={confPassword}
        secureTextEntry={!showPassword}
        placeholder="تأكيد كلمة المرور"
        onChangeText={e => handleOnChange(e, 'confPassword')}
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
      <ButtonReuse text={'تغيير كلمة المرور'} />
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
