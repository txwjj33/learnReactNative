import React from 'react';
import { Animated, Text, View, StyleSheet } from 'react-native';

export default class SampleApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
      fadeAnim2: new Animated.Value(0)
    };
  }

  componentDidMount() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 1000
    }).start();
    Animated.timing(this.state.fadeAnim2, {
      toValue: 1,
      delay: 1000,
      duration: 1000
    }).start();
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.Text style={styles.welcome, {opacity: this.state.fadeAnim}}>
          Welcome to the React Native!
        </Animated.Text>
        <Animated.Text style={styles.welcome, {opacity: this.state.fadeAnim2}}>
          Im feeling lucky..
        </Animated.Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  welcome: {
    fontSize: 18,
  },
})