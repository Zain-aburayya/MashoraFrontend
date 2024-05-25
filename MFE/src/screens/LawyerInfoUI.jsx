/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Checkbox from '../components/Checkbox';
import DocumentPicker from 'react-native-document-picker';
import {lawyer_certificate} from '../api/lawyer_api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

function Title({text}) {
  return (
    <View style={styles.title}>
      <Text style={styles.titleFont}>{text}</Text>
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

function LawyerInfo({route}) {
  const [id, setId] = useState(null);
  const [civilLaw, setCivilLaw] = useState(false);
  const [commercialLaw, setCommercialLaw] = useState(false);
  const [internationalLaw, setInternationalLaw] = useState(false);
  const [criminalLaw, setCriminalLaw] = useState(false);
  const [administrativeAndFinancialLaw, setAdministrativeAndFinancialLaw] =
    useState(false);
  const [constitutionalLaw, setConstitutionalLaw] = useState(false);
  const [privateInternationalLaw, setPrivateInternationalLaw] = useState(false);
  const [proceduralLaw, setProceduralLaw] = useState(false);

  const [file, setFile] = useState(null);

  const navigation = useNavigation();
  useEffect(() => {
    AsyncStorage.getItem('id').then(res => {
      setId(res);
    });
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

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.docx],
        allowMultiSelection: false,
      });
      console.log(result);
      if (result.length > 0) {
        setFile(result[0]);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('الغاء', 'تم الغاء اختيار الملف!');
      } else {
        Alert.alert('Error', 'Unknown error: ' + JSON.stringify(err));
      }
    }
  };

  const submitForm = async () => {
    if (!file) {
      Alert.alert('هناك خطأ', 'يرجى تحميل ملف مزاولة المهنة الخاص بك');
      return;
    }

    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      name: file.name,
      type: file.type,
    });
    formData.append('id', id);
    formData.append('civilLaw', Boolean(civilLaw));
    formData.append('commercialLaw', commercialLaw);
    formData.append('internationalLaw', internationalLaw);
    formData.append('criminalLaw', criminalLaw);
    formData.append(
      'administrativeAndFinancialLaw',
      administrativeAndFinancialLaw,
    );
    formData.append('constitutionalLaw', constitutionalLaw);
    formData.append('privateInternationalLaw', privateInternationalLaw);
    formData.append('proceduralLaw', proceduralLaw);
    lawyer_certificate({
      formData: formData,
    });
    navigation.navigate('Main');
  };

  function handleLoguot() {
    Alert.alert('تسجيل الخروج', 'هل أنت متأكد من تسجيل خروجك ؟', [
      {
        text: 'لا',
        onPress: () => null,
      },
      {
        text: 'نعم',
        onPress: () => {
          try {
            let keys = ['token', 'role', 'username', 'email', 'id'];
            AsyncStorage.multiRemove(keys);
            console.log('data removed :)');
            navigation.navigate('LoginScreen');
          } catch (err) {
            console.log(err);
          }
        },
      },
    ]);
  }

  return (
    <>
      <View style={styles.container}>
        <Title text="اكمل خطوات التسجيل لتصبح محامي موثوق..." />
        <Title text="إختر القوانين الذي تمتلك خبرة بها …" />
        <View style={styles.containerCheckbox}>
          <Checkbox
            style={cusStyle}
            text="القانون المدني   "
            onPress={isChecked => setCivilLaw(true)}
          />
          <Checkbox
            style={cusStyle}
            text="الدولية الخاصة   "
            onPress={isChecked => setPrivateInternationalLaw(isChecked)}
          />
          <Checkbox
            style={cusStyle}
            text="القانون الجنائي  "
            onPress={isChecked => setCriminalLaw(isChecked)}
          />
          <Checkbox
            style={cusStyle}
            text="القانون التجاري  "
            onPress={isChecked => setCommercialLaw(isChecked)}
          />
          <Checkbox
            style={cusStyle}
            text="القانون الإجرائية"
            onPress={isChecked => setProceduralLaw(isChecked)}
          />
          <Checkbox
            style={cusStyle}
            text="القانون الدستوري "
            onPress={isChecked => setConstitutionalLaw(isChecked)}
          />
          <Checkbox
            style={cusStyle}
            text="القانون الدولي   "
            onPress={isChecked => setInternationalLaw(isChecked)}
          />
          <Checkbox
            style={cusStyle}
            text="القانون الإداري والمالي"
            onPress={isChecked => setAdministrativeAndFinancialLaw(isChecked)}
          />
        </View>
        <Title text="اضف شهادة مزاولة المهنة الخاصة بك …" />
        <TouchableOpacity
          style={{marginTop: -10, marginBottom: 20}}
          onPress={() => pickDocument()}>
          <Image
            source={require('./Images/uploadFile.jpeg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <ButtonReuse
          text="تسجيل خروج"
          onPress={() => {
            handleLoguot();
          }}
        />
        <ButtonReuse
          text="تسجيل"
          onPress={() => {
            submitForm();
          }}
        />
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
    fontSize: 21,
    fontWeight: 'bold',
    color: '#8A6F42',
  },
  containerCheckbox: {
    justifyContent: 'center',
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    marginBottom: 30,
    marginTop: -30,
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
    marginTop: 10,
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
    width: 400,
    height: 200,
  },
});

export default LawyerInfo;
