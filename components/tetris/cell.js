import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: props.color,
      size: props.size,
      borderWidth: props.borderWidth
    }
  }

  changeColor(color) {
    this.setState({ color });
  }

  render() {
    let { color, size, borderWidth } = this.state;

    if (color !== 'white') {
      borderWidth = 1;
    }

    return (
      <View style={[styles.cell, {
        backgroundColor: color,
        width: size, height: size, borderWidth: 0
      }]} />
    )
  }

}


let styles = StyleSheet.create({
  cell: {
    borderColor: 'black',
  }
});