import React from 'react';
import { ScrollView, StyleSheet, Button } from 'react-native';
import InAppBilling from 'react-native-billing';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };


  async button() {
    try {
      console.log('Opening');
      await InAppBilling.open();
      console.log('Purchasing');
      await InAppBilling.purchase('android.test.purchased1')
    } catch(e) {
      console.log(e.message);
    } finally {
      console.log('Closing');
      await InAppBilling.close()
    }
  }

  startTetris() {

  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Button
          onPress={this.button}
          title="Buy"
          color="#841584"
        />
        <Button
          onPress={this.startTetris}
          title="Start tetris"
          color="#841584"
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
