import React, { useState, useEffect } from 'react';
import { Animated, Text, View, Easing, gestureState } from 'react-native';

const FadeInView = (props) => {
  const [fadeAnim] = useState(new Animated.Value(0))

  React.useEffect(() => {
    Animated.timing(fadeAnim, {toValue: 1, duration: 2000}).start();
  }, [])

  return (
    <Animated.View style={{...props.style, opacity: fadeAnim}}>
      {props.children}
    </Animated.View>
  );
}

const MoveToView = (props) => {
  const [xPosition] = useState(new Animated.Value(0))

  React.useEffect(() => {
    Animated.timing(xPosition, {
      toValue: 100,
      easing: Easing.back(),
      duration: 2000
    }).start();
  }, [])

  return (
    <Animated.View style={{...props.style, left: xPosition}}>
      {props.children}
    </Animated.View>
  );
}

const SequenceView = (props) => {
  const [position] = useState(new Animated.Value({x: 0, y: 0}))
  const [twirl] = useState(new Animated.Value(0))

  React.useEffect(() => {
    Animated.sequence([
      // decay, then spring to start and twirl
      // Animated.decay(position, {
      //   // coast to a stop
      //   // velocity: { x: gestureState.vx, y: gestureState.vy }, // velocity from gesture release
      //   velocity: { x: 50, y: 50 }, // velocity from gesture release
      //   deceleration: 0.997
      // }),
      Animated.parallel([
        // after decay, in parallel:
        Animated.spring(position, {
          toValue: { x: 50, y: 50 }, // return to start
          duration: 2000,
        }),
        Animated.timing(twirl, {
          // and twirl
          toValue: 360,
          duration: 2000,
        })
      ])
    ]).start(); // start the sequence group
  }, [])

  return (
    <Animated.View style={{...props.style, left: position.x, top: position.y}}>
      {props.children}
    </Animated.View>
  );
}

export default () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <SequenceView style={{width: 250, height: 60, backgroundColor: 'powderblue', justifyContent: 'center'}}>
        <Text style={{fontSize: 28, textAlign: 'center'}}>Fading in</Text>
      </SequenceView>
    </View>
  )
}