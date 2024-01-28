import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './AppNavigator';
import { GetToken } from './src/utils/StorageToken';
import { Provider } from 'react-redux';
import store from './src/redux';
import { GetUserProfile } from './src/redux/slices/authSlice';
const App = () => {
  useEffect(() => {

    (async () => {
      let token = await GetToken('token')
      console.log("token", token)
      if (token) {
        store.dispatch(GetUserProfile())
      }

    })()

  }, [])

  return (
 
    <NavigationContainer>
      <Provider store={store}>
          <AppNavigator />
        </Provider>
    </NavigationContainer>
   
  );
};

export default App;
