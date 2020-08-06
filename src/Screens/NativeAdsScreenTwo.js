import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP } from 'react-native-responsive-screen';
import {
    withNativeAd,
    AdIconView,
    TriggerableView,
    AdChoicesView,
    MediaView,
} from 'react-native-fbads';
import { Fonts } from '../Utils/fonts'

const { width } = Dimensions.get('window');

class NativeAdViewTwo extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{
                borderWidth: hp(0.3),
                borderColor: "#3C64B3",
                backgroundColor: "white",
                borderRadius: hp(3),
                marginHorizontal: hp(2.5),
                height: "100%",
                padding: hp(1.5)
            }}>
                <View>
                    <View style={{ justifyContent: "center", height: hp(4) }}>
                        <View style={{ flexDirection: "row" }}>
                            <TriggerableView onPress={() => this.props.onAddpress()} style={{ textAlignVertical: "center" }}>
                                <AdChoicesView style={{ height: hp(3), width: hp(3) }} />
                            </TriggerableView>
                            <TriggerableView onPress={() => this.props.onAddpress()} style={{ left: Platform.OS === "android" ? wp(1) : wp(15), paddingBottom: hp(0.5), fontSize: hp(1.9), justifyContent: "center", textAlignVertical: "center", fontFamily: Fonts.LatoBold, color: "#C1C1C1" }}>
                                {this.props.nativeAd.sponsoredTranslation}
                            </TriggerableView>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: hp(1) }}>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <AdIconView style={{ width: hp(6), height: hp(6) }} />
                        </View>
                        <View style={{ justifyContent: "center", flex: 1, paddingLeft: wp(2) }}>
                            <TriggerableView onPress={() => this.props.onAddpress()} style={{ fontSize: hp(2.2), fontFamily: Fonts.LatoBold }}>
                                {this.props.nativeAd.advertiserName}
                            </TriggerableView>
                            <TriggerableView onPress={() => this.props.onAddpress()} style={{ fontSize: hp(2), marginTop: wp(1.5), fontFamily: Fonts.LatoBold, color: "#C1C1C1" }}>
                                {this.props.nativeAd.socialContext}
                            </TriggerableView>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                //  onPress={() => this.props.onAddpress()} 
                 style={{ overflow: "hidden", marginVertical: hp(2), height: hp(35) }}>
                    <MediaView                      
                        style={{ width: "100%", height: "100%" }}
                    />
                </TouchableOpacity>
                <TriggerableView onPress={() => this.props.onAddpress()} style={{ fontSize: hp(2), marginLeft: wp(2), marginVertical: hp(2), fontFamily: Fonts.LatoBold, textAlign: "left", color: "#333333" }}>
                    {this.props.nativeAd.bodyText}
                </TriggerableView>
                {
                    Platform.OS === "android" ?
                        <TriggerableView
                            onPress={() => this.props.onAddpress()}
                            style={{
                                color: '#fff',
                                backgroundColor: "#1E5DEA",
                                // backgroundColor: "#fe95aa",
                                textAlign: "center",
                                height: hp(5),
                                fontSize: hp(2.5),
                                textAlignVertical: "center",
                                justifyContent: "center",
                                fontFamily: Fonts.LatoBold,
                                borderRadius: hp(1.5)
                            }}
                        >
                            {this.props.nativeAd.callToActionText}
                        </TriggerableView>
                        :
                        <TriggerableView
                            style={{
                                width: "100%",
                                backgroundColor: "#1E5DEA",
                                borderRadius: 100,
                                color: "#fff",
                                fontFamily: Fonts.LatoBold,
                                fontSize: hp(2),
                                textAlign: "center",
                                paddingVertical: hp(1)
                            }}
                        >
                            {this.props.nativeAd.callToActionText}

                        </TriggerableView>
                }
            </View>
        );
    }
}

export default withNativeAd(NativeAdViewTwo);