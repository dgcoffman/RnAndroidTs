import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Asset from './screens/Asset/Asset';
import Prices from './screens/Prices/Prices';

const MainNavigator = createStackNavigator({
  Prices: {screen: Prices},
  Asset: {screen: Asset},
});

export default createAppContainer(MainNavigator);
