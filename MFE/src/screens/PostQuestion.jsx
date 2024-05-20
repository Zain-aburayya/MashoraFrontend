import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {set_post} from '../api/post_api';
import {useNavigation} from '@react-navigation/native';

function PostQuestion() {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  function handlePostButton() {
    set_post({
      title: title,
      content: content,
    })
      .then(result => {
        if (result.status === 201) {
          navigation.navigate('Main', {tab: 2});
        } else {
          console.log(result.status);
        }
      })
      .catch(err => console.log(err));
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.title}
        placeholderTextColor={'black'}
        value={title}
        placeholder="اكتب العنوان..."
        onChangeText={e => setTitle(e)}
      />
      <TextInput
        style={styles.content}
        placeholderTextColor={'black'}
        value={content}
        multiline={true}
        placeholder="اكتب سؤالك هنا..."
        onChangeText={e => setContent(e)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePostButton()}>
        <Text style={styles.buttonText}>أنشر</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2efeb',
  },
  title: {
    height: 60,
    width: 350,
    borderColor: '#8A6F42',
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#F9F9F9',
  },
  content: {
    height: 350,
    width: 350,
    borderColor: '#8A6F42',
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#F9F9F9',
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#8A6F42',
    paddingHorizontal: 130,
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 20,
    borderColor: '#f2efeb',
    borderWidth: 2,
  },
  buttonText: {
    color: '#f2efeb',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PostQuestion;
