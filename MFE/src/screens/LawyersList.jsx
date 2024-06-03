import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {approve_lawyer, not_approved_lawyers} from '../api/lawyer_api';

const LawyersList = () => {
  const [token, setToken] = useState();
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('token').then(res => {
      setToken(res);
    });
  }, []);

  const fetchNotApprovedLawyers = () => {
    setRefreshing(true);
    not_approved_lawyers()
      .then(result => {
        if (result.status === 200) {
          //console.log(result.data);
          setUsers(result.data);
        }
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetchNotApprovedLawyers();
  }, []);

  const handleApproval = id => {
    approve_lawyer({id: id})
      .then(result => {
        if (result.status === 200) {
          //console.log('Approving lawyer with id:', id);
          //console.log(result.data);
          fetchNotApprovedLawyers(); // Refresh the list after approval
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.userItem}>
            <TouchableOpacity
              style={styles.userDetails}
              onPress={() => {
                navigation.navigate('PdfView', {token: token, id: item.id});
              }}>
              <Image
                source={require('./Images/profile.png')}
                style={styles.userIcon}
              />
              <Text style={styles.name}>{item.username}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.approvalButton}
              onPress={() => handleApproval(item.id)}>
              <Text style={styles.approvalButtonText}>توثيق</Text>
            </TouchableOpacity>
          </View>
        )}
        refreshing={refreshing}
        onRefresh={fetchNotApprovedLawyers}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.85,
    marginTop: StatusBar.currentHeight + 45 || 0,
  },
  userItem: {
    width: Dimensions.get('window').width - 50,
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    height: 70,
    borderWidth: 0.5,
    borderRadius: 10,
    paddingLeft: 20,
    alignItems: 'center',
    backgroundColor: '#DAD2C9',
    justifyContent: 'space-between',
  },
  userDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIcon: {
    width: 60,
    height: 60,
  },
  name: {
    color: 'black',
    marginLeft: 20,
    fontSize: 20,
  },
  approvalButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  approvalButtonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default LawyersList;
