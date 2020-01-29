import LoginScreen from '../screens/LoginScreen';
import ChannelScreen from '../screens/ChannelScreen';
import ConversationScreen from '../screens/ConversionScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ForgotPasswordScreen from '../screens/ForgotPassword';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import CommentScreen from '../screens/CommentScreen';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {TabBarComponent} from '../Components/Tabbar.component';
import { createBottomTabNavigator } from 'react-navigation-tabs';

const AuthNavigator = createStackNavigator({
  Login: LoginScreen,
  ForgotPassword : ForgotPasswordScreen
}, {
  headerMode: 'none',
});

const ChannelNavigator = createStackNavigator({
  Channel: ChannelScreen,
  Comment : CommentScreen,
}, {
  headerMode: 'none',
});


const TabNavigator = createBottomTabNavigator({
  Channel: ChannelNavigator,
  Conversation:ConversationScreen,
  Profile: ProfileScreen,
}, {
  tabBarComponent: TabBarComponent,
});

export const MainScreen =  createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: TabNavigator,
      Auth: AuthNavigator,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);

