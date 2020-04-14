import React from 'react';
import { View, Text } from 'react-native';

class TouchView extends React.Component {
  onStartShouldSetResponder(evt) {
    console.log('onStartShouldSetResponder: ')
    console.log(evt)
    return true;
  }

  onMoveShouldSetResponder(evt) {
    console.log('onMoveShouldSetResponder: ')
    console.log(evt)
  }

  render() {
    return (<View></View>);
  }
}

function app() {
  return (
    <View
      backgroundColor='rgb(125,125,125)'
      onStartShouldSetResponder={() => true}
      onResponderMove={event => {
        console.log(event.nativeEvent.changedTouches);
      }}
    >
      <Text>test</Text>
    </View>
  );
}

export default app;