import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

function ButtonReuse({text, fieldName}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.button2}
      onPress={() => {
        navigation.navigate('SectionList', {fieldName: fieldName});
      }}>
      <Text style={styles.buttonText2}>{text}</Text>
    </TouchableOpacity>
  );
}

function Section() {
  return (
    <View style={styles.container}>
      <ButtonReuse text={'القانون المدني'} fieldName={'CIVIL_LAW'} />
      <ButtonReuse text={'القانون التجاري'} fieldName={'COMMERCIAL_LAW'} />
      <ButtonReuse text={'القانون الإجرائي'} fieldName={'PROCEDURAL_LAW'} />
      <ButtonReuse text={'القانون الدولي'} fieldName={'INTERNATIONAL_LAW'} />
      <ButtonReuse text={'القانون الجنائي'} fieldName={'CRIMINAL_LAW'} />
      <ButtonReuse text={'القانون الدستوري'} fieldName={'CONSTITUTIONAL_LAW'} />
      <ButtonReuse
        text={'القانون الدولي الخاص'}
        fieldName={'PRIVATE_INTERNATIONAL_LAW'}
      />
      <ButtonReuse
        text={'القانون الإداري والمالي'}
        fieldName={'ADMINISTRATIVE_AND_FINANCE_LAW'}
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
