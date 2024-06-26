/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Checkbox from '../components/Checkbox';
import {useNavigation} from '@react-navigation/native';
import {user_password_reset} from '../api/user_api';
import {get_lawyer_fields} from '../api/lawyer_api';

function Title() {
  return (
    <View style={styles.title}>
      <Text style={styles.titleFont}>حسابي</Text>
    </View>
  );
}

function Profile() {
  const [userInfo, setUserInfo] = useState({
    username: '',
    firstname: '',
    lastname: '',
    phoneNumber: '',
    email: '',
    role: '',
  });

  const [showMenu, setShowMenu] = useState(false); // State for menu visibility
  const menuOptions = [
    {text: 'تعديل كلمة المرور', value: 'editPassword'},
    {text: 'تعديل الخبرات', value: 'editStrength'},
  ];

  const [strengths, setStrengths] = useState([]);

  const navigation = useNavigation(); // Get navigation reference

  useEffect(() => {
    get_lawyer_fields()
      .then(result => {
        if (result.status === 200) {
          const translationDict = {
            'Civil Law': 'القانون المدني',
            'Commercial Law': 'القانون التجاري',
            'International Law': 'القانون الدولي',
            'Criminal Law': 'القانون الجنائي',
            'Administrative and Financial Law': 'القانون الإداري والمالي',
            'Constitutional Law': 'القانون الدستوري',
            'Private International Law': 'القانون الدولي الخاص',
            'Procedural Law': 'قانون الإجراءات',
          };
          const translatedStrengths = result.data.map(
            strength => translationDict[strength] || strength,
          );
          setStrengths(translatedStrengths);
          console.log(translatedStrengths);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const keys = [
          'username',
          'firstname',
          'lastname',
          'phoneNumber',
          'email',
          'role',
        ];
        const result = await AsyncStorage.multiGet(keys);
        const userInfoObject = result.reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});
        setUserInfo(userInfoObject);
      } catch (error) {
        console.error('Error fetching user info from AsyncStorage:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const cusStyle = {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#8A6F42',
    padding: 10,
    backgroundColor: '#fff',
    marginTop: 15,
    marginRight: 5,
  };

  const handleMenuPress = () => {
    setShowMenu(!showMenu);
  };

  const handleEditOptionPress = option => {
    setShowMenu(false);
    if (option === 'editPassword') {
      user_password_reset({email: userInfo.email})
        .then(result => {
          console.log(result);
          navigation.navigate('ResetPassword', {
            email: userInfo.email,
            from: 'profile',
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else if (option === 'editStrength') {
      navigation.navigate('EditStrength');
    }
  };

  const renderMenu = () => (
    <View style={styles.menuContainer}>
      {menuOptions
        .filter(
          option =>
            option.value !== 'editStrength' || userInfo.role === 'ROLE_LAWYER',
        )
        .map(option => (
          <TouchableOpacity
            key={option.value}
            onPress={() => handleEditOptionPress(option.value)}
            style={styles.menuItem}>
            <Text style={styles.menuText}>{option.text}</Text>
          </TouchableOpacity>
        ))}
    </View>
  );

  const renderStrengths = () => (
    <View style={styles.strengthsContainer}>
      <Text style={styles.input}>المجالات التي لديك خبرة فيها ...</Text>
      {strengths.map((strength, index) => (
        <View key={index} style={styles.strengthItem}>
          <Text style={styles.strengthText}>{strength}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <>
      <FontAwesome5.Button
        name={'user-edit'}
        color={'#8A6F42'}
        size={30}
        backgroundColor={'#f2efeb'}
        onPress={handleMenuPress}
        style={{
          flexDirection: 'row-reverse',
        }}
      />
      <View style={styles.container}>
        <Title />
        <Image source={require('./Images/profile.png')} style={styles.image} />
        <Text style={styles.input}>{userInfo.username}</Text>
        {userInfo.phoneNumber === '' && (
          <Text style={styles.input}>{userInfo.phoneNumber}</Text>
        )}
        <Text style={styles.input}>{userInfo.email}</Text>
        {userInfo.role === 'ROLE_LAWYER' && renderStrengths()}
      </View>
      {showMenu && renderMenu()}
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
  strengthsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  strengthItem: {
    width: '45%',
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#8A6F42',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  strengthText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    paddingHorizontal: 10,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 7,
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
  menuContainer: {
    position: 'absolute', // Position menu appropriately (consider overflow)
    right: 0,
    top: 50,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Optional for shadows on Android
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuText: {
    fontSize: 16,
  },
});

export default Profile;
