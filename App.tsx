import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/navigation/mainStack';
import { Provider } from 'react-redux';
import { persistor, store } from './src/store/store';
import {PersistGate} from 'redux-persist/integration/react';

export default function App() {
  return (
   <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainStack />
      </PersistGate>
   </Provider>
  );
}