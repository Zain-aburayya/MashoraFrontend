import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import StarRating from 'react-native-star-rating';
import {rate_lawyer} from '../api/lawyer_api';

function RateLawyer({route}) {
  const username = route.params.lawyerUsername;
  const [ratings, setRatings] = useState({
    civilLaw: 0,
    commercialLaw: 0,
    internationalLaw: 0,
    criminalLaw: 0,
    administrativeAndFinancialLaw: 0,
    constitutionalLaw: 0,
    privateInternationalLaw: 0,
    proceduralLaw: 0,
  });
  const navigation = useNavigation();

  const handleRatingChange = (field, newRating) => {
    setRatings(prevRatings => ({
      ...prevRatings,
      [field]: newRating,
    }));
  };

  const submitRatings = async () => {
    try {
      const formData = new FormData();
      Object.entries(ratings)
        .filter(([field, rating]) => rating > 0)
        .forEach(([field, rating]) => {
          formData.append(field, rating);
        });

      console.log('FormData:', formData);
      rate_lawyer({data: formData, username: username})
        .then(result => {
          if (result.status === 200) {
            const handleFeedbackSubmit = async () => {
              await firestore()
                .collection('chats')
                .doc(route.params.lawyerUserId + route.params.customerUserId)
                .update({
                  feedback: 'closed',
                  status: 'closed',
                });

              await firestore()
                .collection('chats')
                .doc(route.params.customerUserId + route.params.lawyerUserId)
                .update({
                  feedback: 'closed',
                  status: 'closed',
                });

              navigation.navigate('Main');
            };
            handleFeedbackSubmit();
          }
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      Alert.alert('Failed to submit ratings. Please try again later.');
    }
  };

  const laws = {
    civilLaw: 'القانون المدني',
    commercialLaw: 'القانون التجاري',
    internationalLaw: 'القانون الدولي',
    criminalLaw: 'القانون الجنائي',
    administrativeAndFinancialLaw: 'القانون الإداري والمالي',
    constitutionalLaw: 'القانون الدستوري',
    privateInternationalLaw: 'القانون الدولي الخاص',
    proceduralLaw: 'قانون الإجراءات',
  };

  return (
    <View style={styles.container}>
      {Object.keys(ratings).map(field => (
        <View key={field} style={styles.fieldContainer}>
          <Text style={styles.fieldText}>{laws[field]}</Text>
          <StarRating
            maxStars={5}
            rating={ratings[field]}
            selectedStar={rating => handleRatingChange(field, rating)}
            fullStarColor={'gold'}
            emptyStarColor={'gray'}
            starSize={20}
            containerStyle={styles.starContainer}
          />
        </View>
      ))}
      <TouchableOpacity
        style={styles.button2}
        onPress={submitRatings}
        disabled={Object.values(ratings).every(rating => rating === 0)}>
        <Text style={styles.buttonText2}>Submit Ratings</Text>
      </TouchableOpacity>
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
  fieldContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  fieldText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 20,
    marginBottom: 20,
  },
  starContainer: {
    marginRight: 15,
    marginBottom: 20,
    flexDirection: 'row',
  },
  button2: {
    backgroundColor: '#8A6F42',
    paddingHorizontal: 130,
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 20,
    borderColor: '#f2efeb',
    borderWidth: 2,
  },
  buttonText2: {
    color: '#f2efeb',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RateLawyer;
