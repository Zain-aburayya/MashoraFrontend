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
import ChatListLawyer from './src/screens/ChatListLawyer';
import Chat from './src/screens/Chat';
import ChatListUser from './src/screens/ChatListUser';
import Splash from './src/screens/Splash';
import PostMain from './src/screens/PostMain';
import ChatList from './src/screens/ChatList';
import ChatBot from './src/screens/ChatBot';
import Main from './src/screens/Main';
import PostUI from './src/screens/PostUI';
import PostQuestion from './src/screens/PostQuestion';
import Profile from './src/screens/Profile';
import ClickedProfile from './src/screens/ClickedProfile';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
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
          name="PostMain"
          component={PostMain}
          options={{headerBackVisible: false}}
        />
        <Stack.Screen
          name="ChatList"
          component={ChatList}
          options={{headerBackVisible: false}}
        />
        <Stack.Screen
          name="ChatBot"
          component={ChatBot}
          options={{headerBackVisible: false}}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{headerBackVisible: false, headerShown: false}}
        />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen
          name="Settings"
          component={SettingsUI}
          options={{headerTitle: 'الاعدادات'}}
        />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen
          name="ContactUs"
          component={ContactUs}
          options={{headerTitle: 'إتصل بنا'}}
        />
        <Stack.Screen
          name="AboutUs"
          component={AboutUs}
          options={{headerTitle: 'عن مشورة'}}
        />
        <Stack.Screen
          name="Wallet"
          component={Wallet}
          options={{headerTitle: 'محفظتي'}}
        />
        <Stack.Screen name="PostUI" component={PostUI} />
        <Stack.Screen name="PostQuestion" component={PostQuestion} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ClickedProfile" component={ClickedProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
