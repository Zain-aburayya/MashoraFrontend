import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

function ClickedProfile({route}) {
  const userInfo = route.params.userInfo;
  return (
    <View style={styles.container}>
      <Image source={require('./Images/profile.png')} style={styles.image} />
      <Text style={styles.input}>{userInfo.username}</Text>
      {/* <Text style={styles.input}>{userInfo.email}</Text> */}
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
  containerCheckbox: {
    justifyContent: 'center',
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    marginBottom: 30,
  },
  input: {
    paddingHorizontal: 10,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
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
  image: {
    width: 150,
    height: 150,
  },
});

export default ClickedProfile;
