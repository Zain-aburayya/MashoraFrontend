import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiManager from './ApiManager';

export const get_posts = async data => {
  try {
    const token = await AsyncStorage.getItem('token');

    const result = await ApiManager(
      `/questions/pages?page=${data.page}&size=4`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return result;
  } catch (err) {
    return err.response;
  }
};

export const get_post_comments = async data => {
  try {
    const token = await AsyncStorage.getItem('token');

    const result = await ApiManager(`/questions/${data.id}/comments`, {
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

export const set_comment = async data => {
  try {
    const token = await AsyncStorage.getItem('token');

    const result = await ApiManager(`/comments/${data.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data.content,
    });
    return result;
  } catch (err) {
    return err.response.data;
  }
};

export const set_post = async data => {
  try {
    const token = await AsyncStorage.getItem('token');

    const result = await ApiManager('/questions', {
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
