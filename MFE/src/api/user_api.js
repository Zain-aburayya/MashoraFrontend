import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiManager from './ApiManager';

export const user_login = async data => {
  try {
    const result = await ApiManager('/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    });
    return result;
  } catch (err) {
    return err.response.data;
  }
};

export const user_signup = async data => {
  try {
    const result = await ApiManager('/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    });
    return result;
  } catch (err) {
    return err.response.data;
  }
};

export const user_password_reset = async data => {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    const result = await ApiManager(
      `/auth/forgetPasswordEmail?email=${data.email}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return result;
  } catch (err) {
    return err.response.data;
  }
};

export const user_change_password = async data => {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    const result = await ApiManager('/auth/changePassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    });
    return result;
  } catch (err) {
    return err.response.data;
  }
};
