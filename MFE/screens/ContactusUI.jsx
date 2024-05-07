/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function ContactUs() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleFont}>تواصل معنا</Text>
      <View style={[styles.card, {alignItems: 'center', flex: 0.5}]}>
        <View style={{marginBottom: 20}}>
          <Entypo name="instagram" size={30} color={'#8A6F42'}>
            <Text style={{fontSize: 21}}> mashora.app</Text>
          </Entypo>
        </View>
        <View style={{marginBottom: 20}}>
          <Entypo name="facebook" size={30} color={'#8A6F42'}>
            <Text style={{fontSize: 21}}> mashora.app</Text>
          </Entypo>
        </View>
        <View style={{marginBottom: 20}}>
          <Entypo name="linkedin" size={30} color={'#8A6F42'}>
            <Text style={{fontSize: 21}}> mashora.app</Text>
          </Entypo>
        </View>
        <View style={{marginBottom: 20}}>
          <Entypo name="phone" size={30} color={'#8A6F42'}>
            <Text style={{fontSize: 21}}> +96239045954</Text>
          </Entypo>
        </View>
        <View style={{marginBottom: 20, marginLeft: -70}}>
          <FontAwesome name="fax" size={30} color={'#8A6F42'}>
            <Text style={{fontSize: 21, fontWeight: '500'}}> 213983</Text>
          </FontAwesome>
        </View>
        <View>
          <Entypo name="mail" size={30} color={'#8A6F42'}>
            <Text style={{fontSize: 21}}> mashora@gmail.com</Text>
          </Entypo>
        </View>
        <Text style={{marginTop: 30, color: '#8A6F42'}}>
          Made by DevPro Team (Jordan)
        </Text>
        <Text style={{color: '#8A6F42'}}>@JUST_Team LLC</Text>
      </View>
      <Image
        source={require('./Images/mashoralogo.png')}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 0.5,
    width: '80%',
    paddingVertical: 140,
    borderWidth: 6,
    borderStyle: 'solid',
    borderColor: '#D0C5B3',
    borderRadius: 25,
    backgroundColor: '#D0C5B3',
    position: 'relative',
    shadowColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5, // for Android shadow
  },
  title: {
    marginBottom: 20,
  },
  titleFont: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 30,
    marginBottom: 20,
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
  image: {
    marginTop: 40,
    width: 120,
    height: 140,
  },
});

export default ContactUs;
