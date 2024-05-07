/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

function ButtonReuse({emoji, text, color, backColor}) {
  return (
    <>
      <Entypo.Button
        name={emoji}
        color={color}
        size={40}
        backgroundColor={backColor}
        onPress={() => {
          // TODO Add a new function handler for navigation
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
  return (
    <View style={styles.container}>
      <ButtonReuse
        text={'حسابي'}
        color={'#8A6F42'}
        backColor={'#E6E0D7'}
        emoji={'user'}
      />

      <ButtonReuse
        text={'محفظتي'}
        backColor={'#8A6F42'}
        color={'#E6E0D7'}
        emoji={'wallet'}
      />

      <ButtonReuse
        text={'إتصل بنا'}
        color={'#8A6F42'}
        backColor={'#E6E0D7'}
        emoji={'phone'}
      />

      <ButtonReuse
        text={'عن مشورة'}
        backColor={'#8A6F42'}
        color={'#E6E0D7'}
        emoji={'text-document'}
      />

      <ButtonReuse
        text={'تسجيل الخروج'}
        color={'#8A6F42'}
        backColor={'#E6E0D7'}
        emoji={'log-out'}
      />
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
