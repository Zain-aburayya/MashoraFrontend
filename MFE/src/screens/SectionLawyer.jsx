/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {get_lawyer_rates} from '../api/lawyer_api';
import firestore from '@react-native-firebase/firestore';
import StarRating from 'react-native-star-rating';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {deposit_lawyer} from '../api/payment_api';

function SectionLawyer({route}) {
  const [userInfo, setUserInfo] = useState(null);
  const [userId, setUserId] = useState('');
  const [lawyer, setLawyer] = useState('');
  const navigation = useNavigation();
  const translationDict = {
    CIVIL_LAW: 'القانون المدني',
    COMMERCIAL_LAW: 'القانون التجاري',
    INTERNATIONAL_LAW: 'القانون الدولي',
    CRIMINAL_LAW: 'القانون الجنائي',
    ADMINISTRATIVE_AND_FINANCE_LAW: 'القانون الإداري والمالي',
    CONSTITUTIONAL_LAW: 'القانون الدستوري',
    PRIVATE_INTERNATIONAL_LAW: 'القانون الدولي الخاص',
    PROCEDURAL_LAW: 'القانون الإجرائي',
  };

  useEffect(() => {
    AsyncStorage.getItem('USERID').then(res => {
      setUserId(res);
    });
  }, []);

  const getUser = async () => {
    try {
      firestore()
        .collection('users')
        .where('username', '==', route.params.lawyerUsername)
        .get()
        .then(res => {
          if (res.docs.length > 0) {
            res.docs.map(item => {
              setLawyer(item.data());
            });
          }
        });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    get_lawyer_rates({id: route.params.lawyerId})
      .then(result => {
        setUserInfo(result.data);
        console.log(result.data);
      })
      .catch(err => {
        console.log(err);
      });
    getUser();
  }, [route.params.lawyerId]);

  function handleStartAChat() {
    Alert.alert(
      'تنبيه!!',
      'للتحدث مع المحامي ، يجب أولاً أن تعلم أنه سيتم خصم مبلغ يقدر بـ 10 دينارًا. إذا لم يكن لديك هذا المبلغ في محفظة التطبيق، يتعين عليك إيداع المال. وفي حال كان لديك المبلغ وأكملت الدفع، ستتمكن من الانتقال إلى الدردشة الخاصة مع المحامي.',
      [
        {
          text: 'لا',
          onPress: () => null,
        },
        {
          text: 'نعم',
          onPress: () => {
            deposit_lawyer({
              lawyerUsername: route.params.lawyerUsername,
              amount: 10,
            })
              .then(result => {
                if (result.status === 200) {
                  navigation.navigate('Chat', {data: lawyer, id: userId});
                }
              })
              .catch(error => {
                console.log(error);
              });
          },
        },
      ],
    );
  }

  return (
    <View style={styles.container}>
      {userInfo ? (
        <View style={styles.card}>
          <View style={styles.profileContainer}>
            <Image
              source={require('./Images/profile.png')}
              style={styles.image}
            />
            <View style={{alignItems: 'flex-end'}}>
              <Text style={styles.title}>
                {userInfo.firstName + ' ' + userInfo.lastName}
              </Text>
              <Text style={styles.title1}>{userInfo.userName}</Text>
              <Text style={styles.title1}>{userInfo.email}</Text>
            </View>
          </View>
          {userInfo.lawFieldsDetails.map((fieldDetail, index) => (
            <View key={index} style={styles.fieldContainer}>
              <Text style={styles.fieldText}>
                {translationDict[fieldDetail.field]}
              </Text>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={fieldDetail.rate}
                fullStarColor={'gold'}
                emptyStarColor={'gray'}
                starSize={20}
                containerStyle={styles.starContainer}
              />
            </View>
          ))}
          <TouchableOpacity
            style={styles.button2}
            onPress={() => {
              handleStartAChat();
            }}>
            <Text style={styles.buttonText2}>ابدأ محادثتك</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2EFEB',
    paddingTop: StatusBar.currentHeight,
  },
  card: {
    width: 390,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginBottom: 10,
    backgroundColor: '#CEC3B0',
    shadowColor: 'black',
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 10, // for Android shadow
    alignItems: 'flex-end', // Align text to the right
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  title1: {
    fontSize: 18,
    textAlign: 'right',
  },
  image: {
    width: 100,
    height: 100,
  },
  imagePost: {
    width: 100,
    height: 100,
  },
  profileContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#f2efeb',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 12,
    borderColor: '#8A6F42',
    borderWidth: 2,
  },
  fieldContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  fieldText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 20,
    marginBottom: 20,
  },
  starContainer: {
    marginRight: 15,
    marginBottom: 20,
    flexDirection: 'row',
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
});

export default SectionLawyer;
