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
            <View style={{ borderWidth: hp(0.3), borderColor: "#3C64B3", backgroundColor: "white", borderRadius: hp(3), marginHorizontal: hp(2.5), height: this.props.type == "Earn" ? hp(30) : hp(53), padding: hp(2) }}>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <AdIconView style={{ width: hp(8), height: hp(8), alignSelf: "center" }} />
                    </View>
                    <View style={{ justifyContent: "flex-start", flex: 1, paddingLeft: wp(2) }}>
                        <TriggerableView style={{ fontSize: hp(2.5), fontFamily: Fonts.LatoBold }}>
                            {this.props.nativeAd.advertiserName}
                        </TriggerableView>
                        <TriggerableView style={{ fontSize: 10, fontSize: hp(2), marginVertical: 5, fontFamily: Fonts.LatoBold, color: "#C1C1C1" }}>
                            {this.props.nativeAd.sponsoredTranslation}
                        </TriggerableView>
                        <TriggerableView style={{ fontSize: 10, fontSize: hp(2), fontFamily: Fonts.LatoBold, color: "#333333" }}>
                            {this.props.nativeAd.headline}
                        </TriggerableView>
                    </View>
                    <View style={{ justifyContent: "flex-start", alignItems: "center" }}>
                        <AdChoicesView />
                    </View>
                </View>
                <View style={{ flex: 1, overflow: "hidden" }}>
                    <MediaView style={{ flex: 1 }} />
                </View>
                <TriggerableView style={{ fontSize: 10, marginBottom: hp(2), fontSize: hp(2), fontFamily: Fonts.LatoBold, textAlign: "left", color: "#333333" }}>
                    {this.props.nativeAd.linkDescription}
                </TriggerableView>
                <TriggerableView
                    style={{
                        color: '#fff',
                        backgroundColor: "#1E5DEA",
                        textAlign: "center",
                        height: hp(6),
                        textAlignVertical: "center",
                        fontFamily: Fonts.LatoBold,
                        borderRadius: hp(2)
                    }}
                >
                    {this.props.nativeAd.callToActionText}
                </TriggerableView>
            </View>
        );
    }
}

export default withNativeAd(NativeAdView);