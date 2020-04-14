import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { TextInput } from 'react-native-gesture-handler';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen({ navigation, route }) {
  React.useEffect(() => {
    if (route.params?.post) {
      // do something with route.params.route
    }
  }, [route.params?.post]);

  useFocusEffect(
    React.useCallback(() => {
      console.log("home screen is focus.");
      setCount(c => c+1);
    }, [])
  );

  const [count, setCount] = React.useState(0);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button 
          onPress={() => setCount(c => c+1)} 
          title='addCount' 
          color='#fff'
        />
      ),
    });
  }, [navigation, setCount]);

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Text style={{margin: 10}}>Post: {route.params?.post}</Text>
      <Text>Count: {count}</Text>
      <Button
        title='Go to Details'
        onPress={() => {
          navigation.navigate('Details', {
            itemId: 1,
            otherParams: 'from home',
          });
        }}
      />
      <Button
        title='Go to post'
        onPress={() => {navigation.navigate('CreatePost')}}
      />
      <Button
        title='Go to tab'
        onPress={() => {navigation.navigate('Tab')}}
      />
      <Button
        title='Update title'
        onPress={() => navigation.setOptions({title: 'updated'})}
      />
    </View>
  );
}

function DetailsScreen({ navigation, route }) {
  const { itemId, otherParams } = route.params;
  return (
    <View style={styles.container}>
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
      <Button title="Go Screen3" 
        onPress={() => navigation.navigate('Screen3', {name: 's3'})} 
      />
    </View>
  )
}

function Screen3({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Screen3</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      <Button
        title="Go to Details with params"
        onPress={() => navigation.navigate('Details', {
          // itemId: 3,
          otherParams: 'from screen3',
        })}
      />
      <Button
        title='goBack'
        onPress={() => navigation.goBack()}
      />
    </View>
  )
}

function createPostScreen({navigation, route}) {
  const [postText, setPostText] = React.useState('');

  return (
    <>
      <TextInput
        // multiline
        placeholder='put post url'
        style={{ height: 200, padding: 10, backgroundColor: 'white'}}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title='Done'
        onPress={() => {
          navigation.navigate('Home', {post: postText});
        }}
      />
    </>
  );
}

function Feed({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Feed</Text>
    </View>
  );
}

function Messages({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Messages</Text>
    </View>
  );
}

function TabScreen({ navigation }) {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Feed' component={Feed} />
      <Tab.Screen name='Messages' component={Messages} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {backgroundColor: '#f4511e'},
          headerTintColor: '#fff',
          headerTitleStyle: {fontWeight: 'bold'},
        }}
      >
        {/* 在这里的options里面增加按钮的话，没法访问screen的this对象，无法与Screen交互 */}
        <Stack.Screen name="Home" component={HomeScreen} options={{title: 'My home'}} />
        <Stack.Screen name="Details" component={DetailsScreen} initialParams={{itemId: 42}}/>
        <Stack.Screen name="Screen3" component={Screen3} 
          options={({route}) => ({title: route.params.name})} 
        />
        <Stack.Screen name='CreatePost' component={createPostScreen} />
        <Stack.Screen name='Tab' component={TabScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

// function LogoTitle() {
//   return (
//     <Image
//       style={{ width: 50, height: 50 }}
//       source={require('@expo/snack-static/react-native-logo.png')}
//     />
//   );
// }
// function StackScreen() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{ headerTitle: props => <LogoTitle {...props} /> }}
//       />
//     </Stack.Navigator>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
})
