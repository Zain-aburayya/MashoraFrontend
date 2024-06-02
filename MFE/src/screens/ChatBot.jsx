import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {Bubble, GiftedChat} from 'react-native-gifted-chat';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [sendingMessage, setSendingMessage] = useState(false);

  const renderBubble = props => (
    <Bubble
      {...props}
      textStyle={{
        right: {
          color: 'white',
        },
        left: {
          color: 'black',
        },
      }}
      wrapperStyle={{
        right: {
          backgroundColor: '#8A6F42',
        },
      }}
    />
  );

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch('http://10.0.2.2:8080/api/adel/history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.status === 'OK' && data.statusCode === 200) {
          const formattedMessages = data.data
            .map(item => [
              {
                _id: `${item.id}_query`,
                text: item.query,
                createdAt: new Date(item.timestamp),
                user: {_id: 1, name: 'User'},
              },
              {
                _id: `${item.id}_response`,
                text: item.botResponse,
                createdAt: new Date(item.timestamp),
                user: {
                  _id: 2,
                  name: 'ChatBot',
                  avatar: require('./Images/AdelImage.png'),
                },
              },
            ])
            .flat();

          setMessages(formattedMessages.reverse());
        }
      } catch (error) {
        console.error('Error fetching message history:', error);
      }
    };

    fetchHistory();
  }, []);

  const onSend = useCallback(
    async (newMessages = []) => {
      setSendingMessage(true);
      try {
        const token = await AsyncStorage.getItem('token');
        const messageToSend = newMessages[0];
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, newMessages),
        );

        const response = await fetch('http://10.0.2.2:8080/api/adel/query', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({query: messageToSend.text, history: messages}),
        });

        const data = await response.json();
        if (data.status === 'Created' && data.statusCode === 201) {
          const botMessage = {
            _id: Math.random().toString(36).substring(7),
            text: data.data.botResponse,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'ChatBot',
              avatar: require('./Images/AdelImage.png'),
            },
          };
          setMessages(previousMessages =>
            GiftedChat.append(previousMessages, [botMessage]),
          );
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
      setSendingMessage(false);
    },
    [messages],
  );

  return (
    <View style={styles.container}>
      {sendingMessage && <ActivityIndicator size="large" color="#0000ff" />}
      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={{_id: 1}}
        placeholder="اسأل عادل ليساعدك..."
        renderBubble={renderBubble}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.88,
    marginTop: StatusBar.currentHeight + 45 || 0,
  },
  noMessagesText: {
    textAlign: 'center',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default ChatBot;
