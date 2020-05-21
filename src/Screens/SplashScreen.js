import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export default class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    async UNSAFE_componentWillMount() {
        let DT = await AsyncStorage.getItem("UserNaData")
        if(DT==null){
            this.props.navigation.navigate("Login")
        }
        else{
            this.props.navigation.navigate("Sidemenu")
        }
    }

    render() {
        return (
            <></>
        );
    }
}
