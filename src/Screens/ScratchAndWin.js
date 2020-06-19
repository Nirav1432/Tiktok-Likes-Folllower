import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, } from 'react-native';
import styles from './styles/ScratchAndWinStyles';
import { Icons } from "../Utils/IconManager";
import Header from '../Components/Header';
import { puMaxCount, putcount, shoeAds, hideAds } from '../ReduxConfig/Actions/AddCount/AddCount';
import { InterstitialAdManager, AdSettings, BannerView, NativeAdsManager } from 'react-native-fbads';
import NativeAdsView from '../Screens/NativeAdsScreen'
import {connect} from 'react-redux'

class ScratchAndWin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: { follower_coin: 0 }
        };
    }
    componentDidMount(){       
      
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
const mapStateToProps = (state) => {
    return {
        Data: state.LoginData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        putCouter: (cnt) => dispatch(putcount(cnt)),
        showAds: () => dispatch(shoeAds()),
        hideAds: () => dispatch(hideAds()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScratchAndWin);
