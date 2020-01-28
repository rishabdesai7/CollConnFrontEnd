import LoginScreen from '../screens/LoginScreen';
import ChannelScreen from '../screens/ChannelScreen';
import ForgotPasswordScreen from '../screens/ForgotPassword';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AuthNavigator = createStackNavigator({
  Login: LoginScreen,
  ForgotPassword : ForgotPasswordScreen
}, {
  headerMode: 'none',
});

const AppNavigator = createStackNavigator({
  Channel: ChannelScreen,
}, {
  headerMode: 'none',
});

export const MainScreen =  createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppNavigator,
      Auth: AuthNavigator,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);

