import React from 'react';
import { StyleSheet} from 'react-native';
import {MainScreen} from './src/navigation/AppNavigation';
import { ApplicationProvider} from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';

export default function App() {
  return (
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <MainScreen/>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
