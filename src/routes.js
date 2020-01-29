import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Main from './pages/Main';
import Menu from './pages/Menu';
import Collections from './pages/Collections';
import Songs from './pages/Songs';
import WebPage from './pages/WebPage';

const Routes = createAppContainer(
  createStackNavigator({
    Main: {
      screen: Main,
      navigationOptions: {
        headerShown: false,
      },
    },
    Menu: {
      screen: Menu,
      navigationOptions: {
        headerShown: false,
      },
    },
    Collections: {
      screen: Collections,
    },
    Songs: {
      screen: Songs,
    },
    WebPage: {
      screen: WebPage,
    },
  }),
);

export default Routes;
