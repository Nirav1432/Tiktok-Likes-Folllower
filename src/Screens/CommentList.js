import React, { Component } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Platform } from 'react-native';
import Header from '../Components/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from "./styles/FollowersListStyles";
import { Services } from '../Configurations/Api/Connections';
import { connect } from 'react-redux'
import { InterstitialAdManager, AdSettings, BannerView, NativeAdsManager } from 'react-native-fbads';
import Preloader from '../Components/Preloader';
import BannerAds from './BannerAds';
import { puMaxCount, putcount, shoeAds } from '../ReduxConfig/Actions/AddCount/AddCount';


class CommentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            visible: true
        };
    }
    componentDidMount() {
        this.getLikes(this.props.Data.CommonData.userId)
    }

    getLikes(id) {
        Services.CommentList(id).then((res) => {
            if (res.success == "true") {
                this.setState({ data: res.comment, visible: false })
            }
            else {
                this.setState({ data: [], visible: false })
            }
        })
        if (this.props.Data.adsCounter == this.props.Data.maxAdsCounter) {
            setTimeout(async () => {
                await this.props.showAds()
                await this.props.putCouter(0)
            }, 1500)
        }
    }


    render() {
        return (
            <View styles={styles.MAINVIW}>
                <Header title={"Views List"} backPress={() => this.props.navigation.goBack()} />
                <Preloader isLoader={this.state.visible} />
                {
                    this.state.data.length == 0 ?
                        <View style={{ justifyContent: "flex-end", alignItems: "center", height: "88%", backgroundColor: "#E9ECF2" }}>
                            <View style={{ flex: 1, justifyContent: "center" }}>
                                <Text style={[styles.TXT1, { color: "black", fontSize: hp(2.5) }]}>{"No Comment Found"}</Text>
                            </View>
                            <BannerAds />
                        </View>
                        :
                        <View style={styles.VIW1}>
                            <FlatList
                                data={this.state.data}
                                renderItem={({ item, index }) => (
                                    <View style={{ paddingBottom: index == this.state.data.length - 1 ? Platform.OS==="ios"?hp(9): hp(7) : 0 }}>

                                        <View style={[styles.VIW2, { marginTop: index == 0 ? hp(2) : 0 }]}>
                                            <View style={[styles.VIW4, { flex: null }]}>
                                                <Image source={{ uri: item.profile }} style={styles.IMG} />
                                            </View>
                                            <View style={[styles.VIW3, { flex: null, paddingLeft: wp(4) }]}>
                                                <Text style={styles.TXT}>
                                                    {
                                                        item.fullname
                                                        // item.fullname.length > 15 ? item.fullname.substr(0, 15) + "..." : item.fullname
                                                    }
                                                </Text>
                                            </View>
                                            {/* <View style={styles.CMNVIW}>
                                        <TouchableOpacity style={styles.BTN}>
                                            <Text style={styles.TXT1}>Follow Back</Text>
                                        </TouchableOpacity>
                                    </View> */}
                                        </View>
                                    </View>
                                )}
                                showsVerticalScrollIndicator={false}
                                style={styles.flat}
                            />
                            <BannerAds />
                        </View>
                }
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
        setCoins: (coins) => dispatch(setDiamonds(coins)),
        putCouter: (cnt) => dispatch(putcount(cnt)),
        showAds: () => dispatch(shoeAds())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);