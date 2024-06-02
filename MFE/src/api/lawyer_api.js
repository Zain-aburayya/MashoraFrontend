import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiManager from './ApiManager';
import RNFetchBlob from 'rn-fetch-blob';

export const check_lawyer_certificate = async data => {
  try {
    const token = await AsyncStorage.getItem('token');
    const result = await ApiManager('/auth/checkLawyerDetails', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  } catch (err) {
    return err.response.data;
  }
};

export const get_lawyers_field = async data => {
  try {
    const token = await AsyncStorage.getItem('token');
    const result = await ApiManager(`/lawyers/list/${data.field}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  } catch (err) {
    return err.response.data;
  }
};

export const get_lawyer_rates = async data => {
  try {
    const token = await AsyncStorage.getItem('token');
    const result = await ApiManager(`/lawyers/LawyerInfo/${data.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  } catch (err) {
    return err.response.data;
  }
};

export const lawyer_certificate = async data => {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log(data);
    const response = await fetch(
      'http://10.0.2.2:8080/api/lawyers/lawyerDetails',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        body: data.formData,
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const lawyer_update_strength = async data => {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log(data);
    const response = await fetch(
      'http://10.0.2.2:8080/api/lawyers/updateLawyerStrength',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        body: data.formData,
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const get_lawyer_fields = async data => {
  try {
    const token = await AsyncStorage.getItem('token');
    const result = await ApiManager('/lawyers/myStrengths', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  } catch (err) {
    return err.response.data;
  }
};

export const rate_lawyer = async data => {
  try {
    const token = await AsyncStorage.getItem('token');
    const result = await ApiManager(
      `/lawyers/rateLawyer?laywer_username=${data.username}`,
      {
        method: 'POST', // Assuming you are sending the ratings as a POST request
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: data.formData, // Assuming ratings is an object containing the ratings for each law field
      },
    );
    return result;
  } catch (err) {
    return err.response.data;
  }
};

export const lawyer_verification = async data => {
  try {
    console.log(data);
    const token = await AsyncStorage.getItem('token');
    const result = await ApiManager(`/lawyers/downloadPdf/${data.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/pdf',
        Authorization: `Bearer ${token}`,
      },
    });

    // Convert Blob to base64 string
    const base64Data = await RNFetchBlob.fs.readFile(result.data, 'base64');
    console.log(base64Data);

    const filePath = `${RNFetchBlob.fs.dirs.DownloadDir}/file.pdf`;
    await RNFetchBlob.fs.writeFile(filePath, base64Data, 'base64');
    return filePath;
  } catch (err) {
    console.log('Error in lawyer_verification:', err);
    throw err; // Rethrow the error to handle it in the component
  }
};
