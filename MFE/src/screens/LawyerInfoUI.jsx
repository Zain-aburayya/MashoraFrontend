import axios from 'axios';
import React, {useState} from 'react';
import {View, Button, TextInput, Alert} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const LawyerInfo = () => {
  const [id, setId] = useState('');
  const [file, setFile] = useState(null);

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
        Alert.alert('Cancelled', 'Document selection was cancelled.');
      } else {
        Alert.alert('Error', 'Unknown error: ' + JSON.stringify(err));
      }
    }
  };

  const submitForm = async () => {
    if (!id.trim()) {
      Alert.alert('Error', 'Please enter a valid lawyer ID.');
      return;
    }

    if (!file) {
      Alert.alert('Error', 'Please upload a PDF file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      name: file.name,
      type: file.type,
    });
    formData.append('id', id);

    try {
      const response = await fetch(
        'http://10.0.2.2:8080/api/auth/lawyerDetails/' + id,
        {
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        },
      );
      console.log(response);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Error sending request: ' + error.message);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="ID"
        value={id}
        onChangeText={setId}
        keyboardType="numeric"
      />
      <Button title="Pick PDF" onPress={pickDocument} />
      <Button title="Submit" onPress={submitForm} />
    </View>
  );
};

export default LawyerInfo;
