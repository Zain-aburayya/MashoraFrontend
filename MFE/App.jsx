import React from 'react';
import UserRegister from './src/screens/UserRegisterUI';
import LawyerRegister from './src/screens/LawyerRegisterUI';
import LawyerInfo from './src/screens/LawyerInfoUI';
import LoginScreen from './src/screens/LoginScreenUI';
import ResetPassword from './src/screens/ResetPasswordUI';
import SettingsUI from './src/screens/SettingsUI';
import ContactUs from './src/screens/ContactusUI';
import AboutUs from './src/screens/AboutusUI';
import Wallet from './src/screens/walletUI';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TestAPI from './src/screens/testAPI';
import ChatListLawyer from './src/screens/ChatListLawyer';
import Chat from './src/screens/Chat';
import ChatListUser from './src/screens/ChatListUser';
import Splash from './src/screens/Splash';
import LawyerPostPage from './src/screens/PostMain';
import LawyerChatList from './src/screens/ChatList';
import ChatBot from './src/screens/ChatBot';
import Main from './src/screens/Main';
import PostUI from './src/screens/PostUI';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="UserRegister"
          component={UserRegister}
          options={{headerBackVisible: false}}
        />
        <Stack.Screen
          name="LawyerRegister"
          component={LawyerRegister}
          options={{headerBackVisible: false}}
        />
        <Stack.Screen name="LawyerInfo" component={LawyerInfo} />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerBackVisible: false}}
        />
        <Stack.Screen
          name="ChatListLawyer"
          component={ChatListLawyer}
          options={{headerBackVisible: false}}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{headerBackVisible: false}}
        />
        <Stack.Screen
          name="ChatListUser"
          component={ChatListUser}
          options={{headerBackVisible: false}}
        />
        <Stack.Screen
          name="LawyerPostPage"
          component={LawyerPostPage}
          options={{headerBackVisible: false}}
        />
        <Stack.Screen
          name="LawyerChatList"
          component={LawyerChatList}
          options={{LawyerChatList: false}}
        />
        <Stack.Screen
          name="ChatBot"
          component={ChatBot}
          options={{LawyerChatList: false}}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{LawyerChatList: false}}
        />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="Settings" component={SettingsUI} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="ContactUs" component={ContactUs} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="Wallet" component={Wallet} />
        <Stack.Screen name="TestAPI" component={TestAPI} />
        <Stack.Screen name="PostUI" component={PostUI} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
