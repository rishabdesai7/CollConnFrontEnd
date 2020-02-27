import React from 'react';
import {SafeAreaView } from 'react-navigation';
import {BottomNavigation,BottomNavigationTab} from '@ui-kitten/components';
import {PaperPlaneIconFill,LayoutIconOutline,MenuIconOutline} from '../assets/icons/index';

export const TabBarComponent = ({ navigation }) => {

    const onSelect = (index) => {
      const selectedTabRoute = navigation.state.routes[index];
      navigation.navigate(selectedTabRoute.routeName);
    };
  
    return (
      <SafeAreaView>
        <BottomNavigation selectedIndex={navigation.state.index} onSelect={onSelect} style={{marginVertical: 8,}} >
          <BottomNavigationTab title='Channel' icon ={LayoutIconOutline}/>
          <BottomNavigationTab title='Menu' icon= {MenuIconOutline}/>
        </BottomNavigation>
      </SafeAreaView>
    );
  };