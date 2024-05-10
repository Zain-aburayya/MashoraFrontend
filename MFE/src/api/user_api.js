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
