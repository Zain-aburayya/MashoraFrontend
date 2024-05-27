/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {get_lawyers_field} from '../api/lawyer_api';
import StarRating from 'react-native-star-rating';

const Item = ({data}) => {
  const navigation = useNavigation();
  const fields = data.topLawFields;
  const translationDict = {
    CIVIL_LAW: 'القانون المدني',
    COMMERCIAL_LAW: 'القانون التجاري',
    INTERNATIONAL_LAW: 'القانون الدولي',
    CRIMINAL_LAW: 'القانون الجنائي',
    ADMINISTRATIVE_AND_FINANCE_LAW: 'القانون الإداري والمالي',
    CONSTITUTIONAL_LAW: 'القانون الدستوري',
    PRIVATE_INTERNATIONAL_LAW: 'القانون الدولي الخاص',
    PROCEDURAL_LAW: 'قانون الإجراءات',
  };
  const translatedFields = fields.map(field => translationDict[field]);
  const fieldsString = translatedFields.join(' - ');
  const avg = data.lawFieldRate.rate;
  console.log(data.lawFieldRate);
  console.log(data.userName);
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        navigation.navigate('SectionLawyer', {
          lawyerId: data.id,
          lawyerUsername: data.userName,
        });
      }}>
      <View style={styles.profileContainer}>
        <Image source={require('./Images/profile.png')} style={styles.image} />
        <Text style={styles.title1}>
          {data.firstName + ' ' + data.lastName}
        </Text>
      </View>
      <Text style={{}}>{fieldsString}</Text>
      <View style={styles.starContainer}>
        <StarRating
          disabled={true}
          maxStars={5}
          rating={avg}
          fullStarColor={'gold'}
          emptyStarColor={'gray'}
          starSize={20}
        />
      </View>
    </TouchableOpacity>
  );
};

function SectionList({route}) {
  const [lawyers, setLawyers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  console.log(route.params.fieldName);
  const onRefresh = () => {
    setRefreshing(true);
    get_lawyers_field({field: route.params.fieldName})
      .then(result => {
        if (result.status === 200) {
          setLawyers(result.data);
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setRefreshing(false);
      });
  };

  useEffect(() => {
    onRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{route.params.fieldNameArabic}</Text>
        <Text style={{fontSize: 18}}>{route.params.aboutField}</Text>
      </View>
      <FlatList
        data={lawyers}
        renderItem={({item}) => <Item data={item} />}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2EFEB',
    paddingTop: StatusBar.currentHeight,
  },
  item: {
    backgroundColor: '#FFFFFF',
    width: 390,
    paddingHorizontal: 10,
    paddingBottom: 20,
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
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  title1: {
    fontSize: 23,
    textAlign: 'right',
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
    width: 70,
    height: 70,
  },
  imagePost: {
    width: 100,
    height: 100,
  },
  profileContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#f2efeb',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 12,
    borderColor: '#8A6F42',
    borderWidth: 2,
  },
  starContainer: {
    flexDirection: 'row', // Ensure stars are displayed in a row
    justifyContent: 'flex-start', // Align stars to the start of the row
    marginTop: 5, // Adjust as needed
  },
});
export default SectionList;
