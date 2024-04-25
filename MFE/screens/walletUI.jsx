/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// TODO Call an API to send the deposit verfication
// TODO Call an API to get the balance and total

function Wallet() {
  const [balance, setBalance] = useState(0);
  const [total, setTotal] = useState(0);
  const [cliqUser, setCliqUser] = useState();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>محفظتي</Text>
      <View style={[styles.cardsContainer]}>
        <View style={styles.smallCard}>
          <Text style={styles.titleFont}>إجمالي المدفوعات</Text>
          <Text style={{fontSize: 16}}>{balance} دينار</Text>
        </View>
        <View style={styles.smallCard}>
          <Text style={styles.titleFont}>رصيدك الحالي</Text>
          <Text style={{fontSize: 16}}>{total} دينار</Text>
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
      </View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: '700',
          marginTop: 20,
          marginBottom: 10,
        }}>
        أدخل اسم المستخدم الذي تم استخدامه للإيداع:
      </Text>
      <TextInput
        style={[styles.input, {textAlign: 'right'}]}
        placeholderTextColor={'black'}
        value={cliqUser}
        placeholder="ادخل اسم المستخدم..."
        onChangeText={e => setCliqUser(e)}
      />
      <TouchableOpacity style={styles.button2} /*onPress={onPress}*/>
        <Text style={styles.buttonText2}>طلب تأكيد الإيداع</Text>
      </TouchableOpacity>
      <Image
        source={require('./Images/mashoralogo.png')}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 0.3,
    width: '95%',
    borderWidth: 6,
    borderStyle: 'solid',
    borderColor: '#E6E0D7',
    borderRadius: 25,
    backgroundColor: '#E6E0D7',
    position: 'relative',
    shadowColor: 'black',
    justifyContent: 'space-around',
    alignItems: 'center',
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2efeb',
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
    marginTop: 10,
    marginBottom: -100,
    width: 120,
    height: 140,
  },
});

export default Wallet;
