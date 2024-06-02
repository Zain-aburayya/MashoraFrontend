/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {
  approve_payment,
  decline_payment,
  get_approved_payments,
  get_declined_payments,
  get_pending_payments,
} from '../api/payment_api';

const PaymentApproval = () => {
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [declined, setDeclined] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('pending');

  useEffect(() => {
    fetchPending();
    fetchApproved();
    fetchDeclined();
  }, []);

  const fetchPending = async () => {
    get_pending_payments()
      .then(result => {
        if (result.status === 200) {
          setPending(result.data.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const fetchApproved = async () => {
    get_approved_payments()
      .then(result => {
        if (result.status === 200) {
          setApproved(result.data.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const fetchDeclined = async () => {
    get_declined_payments()
      .then(result => {
        if (result.status === 200) {
          setDeclined(result.data.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleApprove = async item => {
    try {
      await approve_payment({data: item});
      console.log("Done that's approved");
      refreshData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecline = async item => {
    try {
      await decline_payment({data: item});
      console.log("Done that's declined");
      refreshData();
    } catch (error) {
      console.log(error);
    }
  };

  const refreshData = () => {
    fetchPending();
    fetchDeclined();
    fetchApproved();
  };

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Text style={styles.title}>
        {'الدفع من قبل العميل : ' + item.customerUsername}
      </Text>
      <Text style={styles.title}>{'- عن الدفع : ' + item.body}</Text>
      <Text style={styles.title}>
        {'بقيمة ' + item.amount + ' دينار أردني'}
      </Text>
      <View style={{marginBottom: 30}}></View>
      {selectedFilter === 'pending' && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.approveButton]}
            onPress={() => handleApprove(item)}>
            <Text style={styles.buttonText}>قبول</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.declineButton]}
            onPress={() => handleDecline(item)}>
            <Text style={styles.buttonText}>رفض</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterButtonContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === 'declined' && styles.selectedFilterButton,
          ]}
          onPress={() => setSelectedFilter('declined')}>
          <Text style={styles.filterButtonText}>مرفوضة</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === 'pending' && styles.selectedFilterButton,
          ]}
          onPress={() => setSelectedFilter('pending')}>
          <Text style={styles.filterButtonText}>معلقة</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === 'approved' && styles.selectedFilterButton,
          ]}
          onPress={() => setSelectedFilter('approved')}>
          <Text style={styles.filterButtonText}>مقبولة</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={
          selectedFilter === 'pending'
            ? pending
            : selectedFilter === 'approved'
            ? approved
            : declined
        }
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>لا يوجد أي طلبات حالية...</Text>
        )}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2EFEB',
    paddingTop: StatusBar.currentHeight,
  },
  filterButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  filterButton: {
    marginHorizontal: 10, // Adjust the space between buttons
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20, // Adjust button radius
    backgroundColor: '#8A6F42',
  },
  selectedFilterButton: {
    backgroundColor: '#6F4E37',
  },
  filterButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  item: {
    backgroundColor: '#FFFFFF',
    width: 390,
    paddingHorizontal: 10,
    paddingBottom: 20,
    paddingTop: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(110, 101, 85, 0.3)',
    marginBottom: 10,
  },
  card: {
    width: 390,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 30,
    marginBottom: 10,
    backgroundColor: '#CEC3B0',
    shadowColor: 'black',
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 10, // for Android shadow
    alignItems: 'flex-end', // Align text to the right
  },
  button2: {
    backgroundColor: '#8A6F42',
    width: 80,
    borderRadius: 12,
    borderColor: '#f2efeb',
    borderWidth: 2,
  },
  title: {
    marginTop: 5,
    fontSize: 22, // Increased font size
    textAlign: 'right',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20, // Adjust button radius
    alignItems: 'center',
  },
  approveButton: {
    backgroundColor: '#4CAF50',
  },
  declineButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  input: {
    height: 60,
    width: 300,
    borderColor: '#8A6F42',
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#F9F9F9',
  },
  bottomContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: -10,
  },
  bottomTab: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 75,
    backgroundColor: '#F2F2F2',
    borderColor: 'rgba(110, 101, 85, 0.3)',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
  },
  imagePost: {
    width: 100,
    height: 100,
  },
  profileContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#6F4E37',
  },
});

export default PaymentApproval;
