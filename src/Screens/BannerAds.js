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
                width: "100%",
                alignSelf: "center",
                elevation: 3,
                bottom: Platform.OS === "ios" ? heightPercentageToDP(0) : 0
            }}>
                {
                    this.state.adsLoading ?
                        <View style={{
                            flexDirection: "row",
                            borderWidth: heightPercentageToDP(0.2),
                            backgroundColor: "white",
                            borderColor: "#3C64B3",
                            borderRadius: heightPercentageToDP(1),
                            height: heightPercentageToDP(6),
                            justifyContent: "center",
                            // position:"absolute",
                            // zIndex:100
                        }}>
                            <ActivityIndicator color={"#3C64B3"} />
                            <View style={{ justifyContent: "center" }}>
                                <Text style={{ fontFamily: Fonts.LatoBold, left: 10 }}>Ads Loading</Text>
                            </View>
                        </View>
                        :
                        <></>
                }
                <View style={{ height: this.state.adsLoading ? 0 : "6%" }}>
                    <BannerView
                        placementId="579084412746231_584184372236235"
                        type="standard"
                        onPress={() => console.log('click')}
                        onLoad={() => this.setState({ adsLoading: false })}
                        onError={err => this.setState({ adsLoading: false })}
                    />
                </View>
            </View>
        );
    }
}
