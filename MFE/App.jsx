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
import Splash from './src/screens/Splash';
import PostMain from './src/screens/PostMain';
import ChatList from './src/screens/ChatList';
import ChatBot from './src/screens/ChatBot';
import Main from './src/screens/Main';
import PostUI from './src/screens/PostUI';
import PostQuestion from './src/screens/PostQuestion';
import Profile from './src/screens/Profile';
import ClickedProfile from './src/screens/ClickedProfile';
import ForgetPassword from './src/screens/ForgetPassword';
import Section from './src/screens/Section';
import SectionList from './src/screens/SectionList';
import SectionLawyer from './src/screens/SectionLawyer';
import AdminMain from './src/screens/AdminMain';
import EditStrength from './src/screens/EditStrength';
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
        <Stack.Screen
          name="LawyerInfo"
          component={LawyerInfo}
          options={{headerBackVisible: false}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerBackVisible: false}}
        />
        <Stack.Screen name="ChatListLawyer" component={ChatListLawyer} />
        <Stack.Screen name="Chat" component={Chat} />
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
        <Stack.Screen
          name="AdminMain"
          component={AdminMain}
          options={{headerBackVisible: false, headerShown: false}}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{headerBackVisible: false, headerShown: false}}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsUI}
          options={{headerBackVisible: false, headerShown: false}}
        />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="EditStrength" component={EditStrength} />
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
        <Stack.Screen name="Section" component={Section} />
        <Stack.Screen name="SectionList" component={SectionList} />
        <Stack.Screen name="ClickedProfile" component={ClickedProfile} />
        <Stack.Screen name="SectionLawyer" component={SectionLawyer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
