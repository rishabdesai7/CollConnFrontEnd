import LoginScreen from '../screens/LoginScreen';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AppNavigator = createStackNavigator({
  Login: LoginScreen,
}, {
  headerMode: 'none',
});

export const AppContainer = createAppContainer(AppNavigator);
