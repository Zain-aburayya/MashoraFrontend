import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiManager from './ApiManager';

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
