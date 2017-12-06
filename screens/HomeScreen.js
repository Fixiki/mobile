import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { BoldText } from '../components/StyledText'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <View style={styles.mainContainer}>

            <Text style={styles.mainText}>
              Вилькоммен май либе фройнд
            </Text>

            <Text style={styles.mainText}>
              Доступ к игре можно получить всего за <BoldText>$9.99</BoldText>
            </Text>
          </View>

        </ScrollView>

      </View>
    )
      ;
  }

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',

    alignItems: 'center',
    marginHorizontal: 50,
  },
  mainText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
});
