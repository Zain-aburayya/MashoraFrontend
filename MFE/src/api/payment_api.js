import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiManager from './ApiManager';

export const payment_deposit = async data => {
  try {
    const token = await AsyncStorage.getItem('token');

    const result = await ApiManager('/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    });
    return result;
  } catch (err) {
    return err.response;
  }
};

export const get_approved_payments = async () => {
  try {
    const token = await AsyncStorage.getItem('token');

    const result = await ApiManager('/payments/approved', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  } catch (err) {
    return err.response;
  }
};

export const get_balance = async () => {
  try {
    const token = await AsyncStorage.getItem('token');

    const result = await ApiManager('/payments/balance', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  } catch (err) {
    return err.response;
  }
};

export const get_declined_payments = async () => {
  try {
    const token = await AsyncStorage.getItem('token');

    const result = await ApiManager('/payments/declined', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  } catch (err) {
    return err.response;
  }
};

export const get_pending_payments = async () => {
  try {
    const token = await AsyncStorage.getItem('token');

    const result = await ApiManager('/payments/pending', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  } catch (err) {
    return err.response;
  }
};

export const approve_payment = async data => {
  try {
    const token = await AsyncStorage.getItem('token');

    const result = await ApiManager(`/payments/${data.data.id}/approve`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  } catch (err) {
    return err.response;
  }
};

export const decline_payment = async data => {
  try {
    const token = await AsyncStorage.getItem('token');
    const result = await ApiManager(`/payments/${data.data.id}/decline`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  } catch (err) {
    return err.response;
  }
};

export const deposit_lawyer = async data => {
  try {
    const token = await AsyncStorage.getItem('token');
    const result = await ApiManager('/payments/deposit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    });
    return result;
  } catch (err) {
    return err.response;
  }
};
