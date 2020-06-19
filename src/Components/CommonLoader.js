import React, { Component } from 'react';
import { View, Text, StatusBar, ActivityIndicator } from 'react-native';
import { InterstitialAdManager, AdSettings } from 'react-native-fbads';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { Fonts } from '../Utils/fonts'
import Modal from 'react-native-modal';

export default class CommonLoader extends Component {
    render() {
        return (
            <Modal style={{ zIndex: 1000 }} isVisible={this.props.visible} animationIn="slideInRight" animationOut="slideOutRight" >
                <View style={{ flexDirection: "row", zIndex: 1500, width: "90%", alignSelf: "center", backgroundColor: "white", height: heightPercentageToDP(10) }}>
                    <View style={{ width: "20%", justifyContent: "center", alignItems: "center", height: "100%" }}>
                        <ActivityIndicator size={"large"} color="black" />
                    </View>
                    <View style={{ width: "80%", height: "100%", justifyContent: "center", alignItems: "flex-start" }}>
                        <Text style={{ fontSize: heightPercentageToDP(2), color: "black", fontFamily: Fonts.LatoBold }}>Showing Ads</Text>
                    </View>
                </View>
            </Modal>
        )
    }
}
