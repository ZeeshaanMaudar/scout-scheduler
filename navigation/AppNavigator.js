import { createStackNavigator, createAppContainer } from 'react-navigation';

import MainScreen from '../screens/MainScreen';
import ViewAllScreen from '../screens/ViewAllSchedulesScreen';

const AppNavigator = createStackNavigator({
  Main: MainScreen,
  ViewAll: ViewAllScreen
});

export default createAppContainer(AppNavigator);
