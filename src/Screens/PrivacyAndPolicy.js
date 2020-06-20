import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import { puMaxCount, putcount, shoeAds } from '../ReduxConfig/Actions/AddCount/AddCount';
import { connect } from 'react-redux'
import { Icons } from '../Utils/IconManager';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


class PrivacyAndPolicy extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    showAdd = () => {
        if (this.props.Data.adsCounter == this.props.Data.maxAdsCounter) {
            setTimeout(async () => {
                await this.props.showAds()
                await this.props.putCouter(0)
            }, 700)
        }
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: "flex-start" }}>
                <StatusBar backgroundColor="#363F46" />
                <View style={{ height: "10%",justifyContent:"center",paddingLeft:wp(6), position: "absolute",  width: "100%", zIndex: 10 }}>
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                        <Image source={Icons.Back} style={{ height: hp(3.5), width: hp(3.5) }} resizeMode="contain"/>
                    </TouchableOpacity>
                </View>
                <WebView
                    source={{ uri: this.props.Data.privacy }}
                    onLoad={() => this.showAdd()}
                />
            </View >
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
        setCoins: (coins) => dispatch(setDiamonds(coins)),
        setGlobalData: (data) => { dispatch(putLogin(JSON.stringify(data))) },
        putCouter: (cnt) => dispatch(putcount(cnt)),
        showAds: () => dispatch(shoeAds())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(PrivacyAndPolicy);
