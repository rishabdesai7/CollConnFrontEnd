import LoginScreen from '../screens/LoginScreen';
import ChannelScreen from '../screens/ChannelScreen';
import ConversationScreen from '../screens/ConversationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ForgotPasswordScreen from '../screens/ForgotPassword';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import CommentScreen from '../screens/CommentScreen';
import AddPostScreen from '../screens/AddPostScreen';
import MenuScreen from '../screens/MenuScreen';
import ComplaintScreen from '../screens/ComplaintScreen';
import NotificationScreen from '../screens/NotificationScreen';
import CreateChannelScreen from '../screens/CreateChannelScreen';
import MessageScreen from '../screens/MessageScreen';
import ConversationSearchScreen from '../screens/ConversationSearchScreen';
import AddPeopleScreen from '../screens/AddPeopleScreen';
import AddPeopleListScreen from '../screens/AddPeopleListScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {TabBarComponent} from '../Components/Tabbar.component';
import { createBottomTabNavigator } from 'react-navigation-tabs';

console.disableYellowBox = true;
const AuthNavigator = createStackNavigator({
  Login: LoginScreen,
  ForgotPassword : ForgotPasswordScreen
}, {
  headerMode: 'none',
});

const ChannelNavigator = createStackNavigator({
  Channel: ChannelScreen,
  Comment : CommentScreen,
  AddPost : AddPostScreen,
  AddPeople:AddPeopleScreen,
  AddPeopleList:AddPeopleListScreen,
}, {
  headerMode: 'none',
});

const ProfileNavigator = createStackNavigator({
  Menu:MenuScreen,
  Profile: ProfileScreen,
  Create : CreateChannelScreen,
  Notification:NotificationScreen,
  Report:ComplaintScreen,
  ChangePassword:ChangePasswordScreen,
}, {
  headerMode: 'none',
});

const ConversationNavigator = createStackNavigator({
  Conversation:ConversationScreen,
  Message:MessageScreen,
  Search:ConversationSearchScreen,
}, {
  headerMode: 'none',
});

const TabNavigator = createBottomTabNavigator({
  Channel: ChannelNavigator,
  Profile: ProfileNavigator,
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

