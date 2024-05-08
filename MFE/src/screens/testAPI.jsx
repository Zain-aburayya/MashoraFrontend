import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import BASE_URL from '../constants/constant';

const TestAPi = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = 'http://10.0.2.2:8080/api/test/user';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.text(); // Use response.text() for plain string
        setData(responseData);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={{fontSize: 18, color: 'red'}}>Error: {error.message}</Text>
      ) : (
        <Text style={{fontSize: 18}}>Data: {data}</Text>
      )}
    </View>
  );
};

export default TestAPi;
