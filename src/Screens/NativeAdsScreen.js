import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
    withNativeAd,
    AdIconView,
    TriggerableView,
    AdChoicesView,
    MediaView,
} from 'react-native-fbads';
import { Fonts } from '../Utils/fonts'

const { width } = Dimensions.get('window');

class NativeAdView extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={{
                borderWidth: hp(0.3),
                borderColor: "#3C64B3",    
                backgroundColor: "white", borderRadius: hp(3), marginHorizontal: hp(2.5),
                height: "100%",
                padding: hp(1.5)
            }}>
                <View>
                    <View style={{ flexDirection: "row", marginBottom: wp(1.5) }}>
                        <View style={{ flex: 1, justifyContent: "center", bottom: wp(0.3) }}>
                            <AdChoicesView />
                        </View>
                        <TriggerableView style={{ flex: 9, left: wp(-1), fontSize: hp(2), justifyContent: "center", fontFamily: Fonts.LatoBold, color: "#C1C1C1" }}>
                            {this.props.nativeAd.sponsoredTranslation}
                        </TriggerableView>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <AdIconView style={{ width: hp(6), height: hp(6), alignSelf: "center" }} />
                        </View>
                        <View style={{ justifyContent: "flex-start", flex: 1, paddingLeft: wp(2) }}>
                            <TriggerableView style={{ fontSize: hp(2.5), fontFamily: Fonts.LatoBold }}>
                                {this.props.nativeAd.advertiserName}
                            </TriggerableView>
                            <TriggerableView style={{ fontSize: hp(2), marginTop: wp(0.5), fontFamily: Fonts.LatoBold, color: "#C1C1C1" }}>
                                {this.props.nativeAd.socialContext}
                            </TriggerableView>
                        </View>
                    </View>
                </View>
                <View style={{ overflow: "hidden", flex: 1 }}>
                    <MediaView style={{ height: "100%", width: "100%" }} />
                </View>
                <TriggerableView style={{ fontSize: hp(2.2), marginLeft: wp(2), bottom: hp(1), fontFamily: Fonts.LatoBold, textAlign: "left", color: "#333333" }}>
                    {this.props.nativeAd.bodyText}
                </TriggerableView>
                <TriggerableView
                    style={{
                        color: '#fff',
                        backgroundColor: "#1E5DEA",
                       // backgroundColor: "#fe95aa",
                        textAlign: "center",
                        height: hp(5),
                        fontSize: hp(2.5),
                        textAlignVertical: "center",
                        fontFamily: Fonts.LatoBold,
                        borderRadius: hp(1.5)
                    }}
                >
                    {this.props.nativeAd.callToActionText}
                </TriggerableView>
            </View>
        );
    }
}

export default withNativeAd(NativeAdView);