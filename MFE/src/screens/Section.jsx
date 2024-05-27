import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const fields = [
  {
    text: 'القانون المدني',
    fieldName: 'CIVIL_LAW',
    about:
      'القانون المدني يشمل القواعد التي تحكم العلاقات بين الأفراد مثل العقود والملكية والالتزامات المدنية.',
  },
  {
    text: 'القانون التجاري',
    fieldName: 'COMMERCIAL_LAW',
    about:
      'القانون التجاري ينظم العلاقات التجارية والأعمال بين التجار والشركات، بما في ذلك عقود البيع والشركات والأنشطة التجارية الأخرى.',
  },
  {
    text: 'القانون الإجرائي',
    fieldName: 'PROCEDURAL_LAW',
    about:
      'القانون الإجرائي هو مجموعة القواعد التي تنظم الإجراءات القضائية من رفع الدعاوى إلى تنفيذ الأحكام.',
  },
  {
    text: 'القانون الدولي',
    fieldName: 'INTERNATIONAL_LAW',
    about:
      'القانون الدولي هو مجموعة القواعد التي تنظم العلاقات بين الدول والمنظمات الدولية، مثل المعاهدات والقوانين الدولية.',
  },
  {
    text: 'القانون الجنائي',
    fieldName: 'CRIMINAL_LAW',
    about:
      'القانون الجنائي يحدد الجرائم والعقوبات المترتبة عليها، ويهدف إلى حماية المجتمع وردع السلوك الإجرامي.',
  },
  {
    text: 'القانون الدستوري',
    fieldName: 'CONSTITUTIONAL_LAW',
    about:
      'القانون الدستوري يحدد القواعد التي تنظم عمل الدولة والسلطات العامة، ويشمل الحقوق والحريات الأساسية للأفراد.',
  },
  {
    text: 'القانون الدولي الخاص',
    fieldName: 'PRIVATE_INTERNATIONAL_LAW',
    about:
      'القانون الدولي الخاص ينظم العلاقات القانونية التي تتضمن عنصراً أجنبياً، مثل الزواج بين أشخاص من جنسيات مختلفة والنزاعات التجارية الدولية.',
  },
  {
    text: 'القانون الإداري والمالي',
    fieldName: 'ADMINISTRATIVE_AND_FINANCE_LAW',
    about:
      'القانون الإداري والمالي ينظم عمل الإدارة العامة والشؤون المالية للدولة، ويشمل الضرائب والموازنة العامة وإدارة الأموال العامة.',
  },
];

function ButtonReuse({text, fieldName, aboutField}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.button2}
      onPress={() => {
        navigation.navigate('SectionList', {
          fieldName: fieldName,
          fieldNameArabic: text,
          aboutField: aboutField,
        });
      }}>
      <Text style={styles.buttonText2}>{text}</Text>
    </TouchableOpacity>
  );
}

function Section() {
  return (
    <View style={styles.container}>
      {fields.map(field => (
        <ButtonReuse
          key={field.fieldName}
          text={field.text}
          fieldName={field.fieldName}
          aboutField={field.about}
        />
      ))}
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
    textAlign: 'center',
    alignItems: 'center',
    width: 400,
    paddingVertical: 20,
    borderRadius: 12,
    marginTop: 20,
    borderColor: '#f2efeb',
    borderWidth: 2,
  },
  buttonText2: {
    color: '#f2efeb',
    fontSize: 25,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 12,
    flexDirection: 'row-reverse',
  },
});

export default Section;
