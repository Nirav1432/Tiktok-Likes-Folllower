import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { connect, useDispatch } from 'react-redux';
import { putLogin } from '../ReduxConfig/Actions/Login/LoginActions'
import Preloader from '../Components/Preloader';
var DT = null
class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:true
        };
    }

    async UNSAFE_componentWillMount() {
        DT = await AsyncStorage.getItem("UserNaData")
        if (DT == null) {
            this.props.navigation.navigate("Login")
        }
        else {
            await this.props.setGlobalData()
            this.props.navigation.navigate("Sidemenu")
        }
    }

    render() {
        return (
            <Preloader isLoader={this.state.visible}/>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        counter: state
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setGlobalData: () => { dispatch(putLogin(DT)) }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);