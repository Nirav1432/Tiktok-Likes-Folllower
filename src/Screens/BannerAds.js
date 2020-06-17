import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Platform } from 'react-native';
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
                backgroundColor: "transparent",
                flex:1,
                width:"100%",
                height:"6%",
                alignSelf: "center",              
                elevation: 3,
                bottom:Platform.OS==="ios"?heightPercentageToDP(1.2):0

            }}>
                {
                    this.state.adsLoading ?
                        <View style={{
                            flexDirection: "row",
                            borderWidth: heightPercentageToDP(0.2),
                            backgroundColor: "white",
                            borderColor: "#3C64B3",
                            borderRadius: heightPercentageToDP(1),
                            flex: 1,
                            justifyContent: "center"
                        }}>
                            <ActivityIndicator color={"#3C64B3"} />
                            <View style={{ justifyContent: "center" }}>
                                <Text style={{ fontFamily: Fonts.LatoBold, left: 10 }}>Ads Loading</Text>
                            </View>
                        </View>
                        :
                        <></>
                }
                <View style={{ height: this.state.adsLoading ? 0 : "100%"}}>
                    <BannerView
                        placementId="579084412746231_579084742746198"
                        type="standard"
                        style={{height:"100%"}}
                        onPress={() => console.log('click')}
                        onLoad={() => this.setState({ adsLoading: false })}
                        onError={err => this.setState({ adsLoading: false })}
                    />
                </View>
            </View>
        );
    }
}
