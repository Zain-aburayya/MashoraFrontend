/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {get_balance, payment_deposit} from '../api/payment_api';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Wallet() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [body, setBody] = useState('');

  const [role, setRole] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('role').then(res => {
      setRole(res);
    });
  }, []);

  useEffect(() => {
    get_balance()
      .then(result => {
        if (result.status === 200) {
          setBalance(result.data.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function handleOnPress() {
    payment_deposit({body: body, amount: parseFloat(amount)})
      .then(result => {
        if (result.status === 200) {
          // TODO: Handle successful payment deposit
          console.log('done');
          setAmount('');
          setBody('');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <Text style={styles.title}>محفظتي</Text>
        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <Text style={styles.titleFont}>رصيدك الحالي</Text>
            <Text style={{fontSize: 16}}>{balance.toString()} دينار</Text>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={{fontSize: 20, fontWeight: '900'}}>
            الإيداع في المحفظة
          </Text>
          <Text style={{fontSize: 20, fontWeight: '500'}}>
            المفوتر : منصة مَشُورَةٌ
          </Text>
          <Text style={{fontSize: 20, fontWeight: '500'}}>
            الخدمة : إيداع في محفظة العميل
          </Text>
          <Text style={{fontSize: 20, fontWeight: '500'}}>
            الاسم المستعار الخاص بخدمة كليك : mashora
          </Text>
          <Text style={{fontSize: 20, fontWeight: '500'}}>
            رقم التحويل : IBAN00001247832
          </Text>
        </View>
        {role === 'ROLE_CUSTOMER' && (
          <>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                marginTop: 20,
                marginBottom: 10,
              }}>
              أدخل المعلومات المطلوبة لإتمام طلب الإيداع...
            </Text>
            <TextInput
              style={[styles.input, {textAlign: 'right'}]}
              placeholderTextColor={'black'}
              value={body}
              placeholder="ادخل الحساب الذي تم الايداع منه ولماذا.."
              onChangeText={e => setBody(e)}
            />
            <TextInput
              style={[styles.input, {textAlign: 'right'}]}
              placeholderTextColor={'black'}
              value={amount}
              keyboardType="numeric"
              placeholder="ادخل القيمة التي تريد تحويلها..."
              onChangeText={e => setAmount(e)}
            />
            <TouchableOpacity style={styles.button2} onPress={handleOnPress}>
              <Text style={styles.buttonText2}>طلب تأكيد الإيداع</Text>
            </TouchableOpacity>
          </>
        )}
        <Image
          source={require('./Images/mashoralogo.png')}
          style={styles.image}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2efeb',
    marginTop: 120,
  },
  keyboardAvoidingView: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  card: {
    width: '95%',
    borderWidth: 6,
    borderStyle: 'solid',
    borderColor: '#E6E0D7',
    borderRadius: 20,
    backgroundColor: '#E6E0D7',
    position: 'relative',
    shadowColor: 'black',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 10, // for Android shadow
  },
  smallCard: {
    flex: 0.5,
    width: '40%',
    paddingVertical: 30,
    marginHorizontal: 10,
    marginVertical: 10,
    borderWidth: 6,
    borderStyle: 'solid',
    borderColor: '#E6E0D7',
    borderRadius: 25,
    backgroundColor: '#E6E0D7',
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
    elevation: 10, // for Android shadow
  },
  titleFont1: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 28,
    marginBottom: 20,
    marginTop: -200,
    fontWeight: 'bold',
  },
  titleFont: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 36,
    marginBottom: 10,
    marginTop: -90,
    fontWeight: 'bold',
    color: '#8A6F42',
  },
  cardsContainer: {
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
    backgroundColor: '#E6E0D7',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    borderColor: '#E6E0D7',
    borderWidth: 2,
  },
  buttonText2: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 12,
    flexDirection: 'row-reverse',
  },
  image: {
    marginTop: 20,
    marginBottom: -100,
    width: 120,
    height: 140,
  },
});

export default Wallet;
