import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, } from 'react-native';
import styles from './styles/ScratchAndWinStyles';
import { Icons } from "../Utils/IconManager";
import Header from '../Components/Header';


export default class ScratchAndWin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: { follower_coin: 0 }
        };
    }
    UNSAFE_componentWillMount() {
        //  this.setState({ data: this.props.navigation.getParam('data') })
    }
    render() {
        return (
            <View style={styles.MAINVIW}>
                <Header title={"Scratch & Win"} backPress={() => this.props.navigation.goBack()} coin={this.state.data.follower_coin} />
                <Text style={styles.TXT1}>Try Your Luck by scratching coupons{"\n"}and win 10000 Diamonds</Text>
                <View style={styles.ScratchView}>
                
                </View>
            </View>
        );
    }
}
