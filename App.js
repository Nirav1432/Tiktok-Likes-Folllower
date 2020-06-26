import React, { Component } from 'react';
import { View, Text } from 'react-native';
import AppNavigator from './src/root/index'
import { Provider } from 'react-redux';
import { store } from './src/ReduxConfig/Store/Store'


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {    
    return (
      <Provider store={store}>  
          <AppNavigator />     
      </Provider>
    );
  }
}
