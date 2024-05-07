import React from 'react';
import UserRegister from './screens/UserRegisterUI';
import LawyerRegister from './screens/LawyerRegisterUI';
import LawyerInfo from './screens/LawyerInfoUI';
import LoginScreen from './screens/LoginScreenUI';
import ResetPassword from './screens/ResetPasswordUI';
import SettingsUI from './screens/SettingsUI';
import ContactUs from './screens/ContactusUI';
import AboutUs from './screens/AboutusUI';
import Wallet from './screens/walletUI';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TestAPI from './screens/testAPI';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TestAPI">
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
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="Settings" component={SettingsUI} />
        <Stack.Screen name="ContactUs" component={ContactUs} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="Wallet" component={Wallet} />
        <Stack.Screen name="TestAPI" component={TestAPI} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
