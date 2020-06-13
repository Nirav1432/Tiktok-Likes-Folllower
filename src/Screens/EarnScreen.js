import React, { Component } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity, TouchableHighlight, AsyncStorage, BackHandler } from 'react-native';
import styles from './styles/HomeScreenStyles'
import { Icons } from '../Utils/IconManager';
import Header from '../Components/Header'
import { connect } from 'react-redux'
import { setDiamonds } from '../ReduxConfig/Actions/Login/LoginActions'
import { puMaxCount, putcount, shoeAds } from '../ReduxConfig/Actions/AddCount/AddCount';
import { InterstitialAdManager, AdSettings, BannerView, NativeAdsManager } from 'react-native-fbads';
import NativeAdsView from '../Screens/NativeAdsScreen'
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';

let ads = new NativeAdsManager("979168055864310_981496822298100")

class EarnScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        if (this.props.Data.adsCounter == this.props.Data.maxAdsCounter) {
            setTimeout(async () => {
                await this.props.showAds()
                await this.props.putCouter(0)
            }, 1500)
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#E9ECF2" }}>
                <Header title={"Earn"} backPress={() => this.props.navigation.goBack()} coin={0} />
                <ScrollView>
                    <View style={styles.VIW33}>
                        <View style={styles.VIW12}>
                            <TouchableOpacity onPress={() => this.commonNavigator("watchVideoButton")}>
                                {/* <TouchableOpacity onPress={() => this.commonNavigator("Follower", { data: OtherData.follower_coin })}> */}
                                <Image style={styles.IMG4} source={Icons.Video1} />
                                <Text style={styles.TXT5}>Watch Video</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.VIW12}>
                            <TouchableOpacity onPress={() => this.commonNavigator("ScratchAndWin")}>
                                <Image style={styles.IMG4} source={Icons.Scatch} />
                                <Text style={styles.TXT5}>Scratch & Win</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.VIW12}>
                            <TouchableOpacity onPress={() => this.commonNavigator("DoLikes")}>
                                <Image style={styles.IMG4} source={Icons.Like} />
                                <Text style={styles.TXT5}>Do Likes</Text>
                            </TouchableOpacity>

                        </View>
                    </View>


                    <View style={[styles.VIW33, { marginBottom: heightPercentageToDP(2) }]}>
                        <View style={styles.VIW12}>
                            <TouchableOpacity onPress={() => this.commonNavigator("DoFollowing")}>
                                <Image style={styles.IMG4} source={Icons.doFL} />
                                <Text style={styles.TXT5}>Do Following</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.VIW12}>
                            <TouchableOpacity onPress={() => this.commonNavigator("DoComments")}>
                                <Image style={styles.IMG4} source={Icons.doView} />
                                <Text style={styles.TXT5}>Do Views</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={styles.VIW12}>
                            <TouchableOpacity onPress={() => this.commonNavigator("DoShare")}>
                                <Image style={styles.IMG4} source={Icons.shareHome} />
                                <Text style={styles.TXT5}>Do Share</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View style={{ height: heightPercentageToDP(60), marginBottom: heightPercentageToDP(2) }}>
                        <NativeAdsView adsManager={ads} />
                    </View>
                </ScrollView>
            </View>
        );
    }

    commonNavigator = async (Type) => {
        if (this.props.Data.adsCounter == this.props.Data.maxAdsCounter) {
            this.props.navigation.navigate(Type)
        }
        else {
            let cnt = this.props.Data.adsCounter
            cnt++;
            await this.props.putCouter(cnt)
            this.props.navigation.navigate(Type)
        }

    }
}


const mapStateToProps = (state) => {
    return {
        Data: state.LoginData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCoins: () => dispatch(setDiamonds(OtherData.coin)),
        setMaxAdsCounter: () => dispatch(puMaxCount(parseInt(OtherData.ads_click))),
        putCouter: (cnt) => dispatch(putcount(cnt)),
        showAds: () => dispatch(shoeAds())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EarnScreen);