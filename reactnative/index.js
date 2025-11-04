import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import App from './src/App';
import store from './src/store';

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent('HybridScreen', () => Root);
