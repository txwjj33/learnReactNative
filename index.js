/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Main from './src/navigation/stackNavigator';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Main);
