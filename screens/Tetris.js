import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import Grid from '../components/tetris/grid';

export default class Main extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Grid w={10} h={24} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 200
  },

});