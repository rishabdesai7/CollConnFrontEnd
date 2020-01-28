import React from 'react';
import {
  Image,
  StyleSheet,
} from 'react-native';
import {
  Card,
  Text,
} from '@ui-kitten/components';
  
class CardCustomHeaderShowcase extends React.Component{
    CustomHeader = () => (
        <React.Fragment>
          <Text
            style={styles.headerText}
            category='h6'>
            {this.props.header}
          </Text>
        </React.Fragment>
      );
      render(){
          return(
            <Card header={this.CustomHeader}>
            <Text>
              {this.props.text}
            </Text>
          </Card>
          );
      }   
}
export default class Post extends React.Component{
    render(){
        return(
            <CardCustomHeaderShowcase
                text = {this.props.text}
                header = {this.props.header}
            />
        );
    }
}

/*

export const CustomHeader = () => (
  <React.Fragment>
    <Text
      style={styles.headerText}
      category='h6'>
      Maldives
    </Text>
  </React.Fragment>
);

export const CardCustomHeaderShowcase = () => (
  <Card header={CustomHeader}>
    <Text>
      The Maldives, officially the Republic of Maldives, is a small country in South Asia,
      located in the Arabian Sea of the Indian Ocean.
      It lies southwest of Sri Lanka and India, about 1,000 kilometres (620 mi) from the Asian continent
    </Text>
  </Card>
);
*/
const styles = StyleSheet.create({
  headerText: {
    marginHorizontal: 24,
    marginVertical: 16,
  },
  headerImage: {
    flex: 1,
    height: 192,
  },
});