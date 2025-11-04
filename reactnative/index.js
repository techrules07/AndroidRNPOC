import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import App from './src/App';
import store from './src/store';

const Root = props => {
  const initialUsername = props?.prefillUsername ?? '';

  return (
    <Provider store={store}>
      <App initialUsername={initialUsername} />
    </Provider>
  );
};

AppRegistry.registerComponent('HybridScreen', () => Root);
