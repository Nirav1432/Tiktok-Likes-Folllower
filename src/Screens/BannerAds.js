import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { BannerView } from 'react-native-fbads';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { Fonts } from "../Utils/fonts";


export default class BannerAds extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adsLoading: true
        };
    }

    render() {
        return (
            <View style={{
               position: "absolute",             
                height: heightPercentageToDP(6),
                backgroundColor: "white",
                width: "97%",
                alignSelf: "center",
                bottom: heightPercentageToDP(1),
                elevation: 3, borderWidth: heightPercentageToDP(0.2),
                borderColor: "#3C64B3",
                borderRadius: heightPercentageToDP(1)
            }}>
                {
                    this.state.adsLoading ?
                        <View style={{ flexDirection: "row",flex:1,backgroundColor:"gray", justifyContent: "center" }}>
                            <ActivityIndicator color={"#3C64B3"} />
                            <View style={{ justifyContent: "center" }}>
                                <Text style={{ fontFamily: Fonts.LatoBold, left: 10 }}>Ads Loading</Text>
                            </View>
                        </View>
                        :
                        <></>
                }
                {/* <View style={{ height: this.state.adsLoading ? 0 : heightPercentageToDP(6) }}>
                    <BannerView
                        placementId="579084412746231_579084742746198"
                        type="standard"
                        onPress={() => console.log('click')}
                        onLoad={() => this.setState({ adsLoading: false })}
                        onError={err => console.log('error', err)}
                    />
                </View> */}
            </View>
        );
    }
}
