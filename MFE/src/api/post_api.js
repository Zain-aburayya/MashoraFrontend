import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiManager from './ApiManager';

export const get_posts = async () => {
  try {
    const token = await AsyncStorage.getItem('token');

    const result = await ApiManager('/questions/pages?page=1&size=2', {
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

export const send_comment = async data => {
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
