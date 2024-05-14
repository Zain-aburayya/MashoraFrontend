import ApiManager from './ApiManager';

export const get_history = async () => {
  try {
    const result = await ApiManager('/adel/history', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ6YWluX2FidXJheXlhIiwiaWF0IjoxNzE1NjM0OTE0LCJleHAiOjE3MTU2NDM1NTR9.AVGdxuSZ9bxmO2K4QJe8LxkQtRSDYdEJqLkaSz8hYlg',
      },
    });
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const new_query = async data => {
  try {
    const result = await ApiManager('/adel/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ6YWluX2FidXJheXlhIiwiaWF0IjoxNzE1NjM0OTE0LCJleHAiOjE3MTU2NDM1NTR9.AVGdxuSZ9bxmO2K4QJe8LxkQtRSDYdEJqLkaSz8hYlg',
      },
      data: data,
    });
    return result;
  } catch (err) {
    console.error(err);
  }
};
