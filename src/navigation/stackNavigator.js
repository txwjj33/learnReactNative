import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title='Go to Details'
        onPress={() => {
          navigation.navigate('Details', {
            itemId: 86,
            otherParams: 'anything',
          });
        }}
      />
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  const { itemId } = route.params;
  const { otherParams } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParams: {JSON.stringify(otherParams)}</Text>
      <Button
        title='Push Details'
        onPress={() => {
          navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          });
        }}
      />
      <Button title="Go to Details... again" onPress={() => navigation.navigate('Details')} />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button title="Go Screen3" onPress={() => navigation.navigate('Screen3')} />
    </View>
  )
}

function Screen3({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Screen3</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
      <Button
        title='goBack'
        onPress={() => navigation.goBack()}
      />
    </View>
  )
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Screen3" component={Screen3} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
