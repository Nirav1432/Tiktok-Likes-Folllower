import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Linking } from 'react-native';
import styles from './styles/DoLikesStyles';
import { Icons } from "../Utils/IconManager";
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP } from 'react-native-responsive-screen';
import Header from '../Components/Header';
import { setDiamonds } from '../ReduxConfig/Actions/Login/LoginActions';
import { connect } from 'react-redux'
import { Services } from '../Configurations/Api/Connections'
import Preloader from '../Components/Preloader';
import { WebView } from 'react-native-webview';
import { NavigationEvents } from 'react-navigation';
import AppStateListener from "react-native-appstate-listener";
import Congratulations from '../Components/Popups/Congratulations'
import SorryPop from '../Components/Popups/SorryPop';
import { puMaxCount, putcount, shoeAds } from '../ReduxConfig/Actions/AddCount/AddCount';
import BannerAds from './BannerAds';


const VM_INJECTED_JAVASCRIPT = 'window.ReactNativeWebView.postMessage(JSON.stringify(__INIT_PROPS__))'
const WWW_INJECTED_JAVASCRIPT = 'window.ReactNativeWebView.postMessage(document.getElementById("__NEXT_DATA__").innerHTML)'

var oldlikes = 0
var newlikes = 0
var id = ""

class DoLikes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DatafromServer: [],
            visible: true,
            goForDoLike: false,
            checkNewLikes: false,
            VideoUrl: "",
            ProfileUrl: "",
            request_user_id: "",
            congo: false,
            sorry: false,
            getUserLike: false,
            Type: "",
            uniqueId: "",
            currentIndex: 0
        };
    }

    async componentDidMount() {
        id = this.props.Data.CommonData.userId
        await this.setState({ ProfileUrl: this.props.Data.CommonData.Tiktok, Type: this.props.Data.CommonData.Type, uniqueId: '@' + this.props.Data.CommonData.uniqueId })
        this.getData(id)
    }



    getData(id) {
        Services.LikeList(id).then(async (res) => {
            if (res.success == "true") {
                this.setState({ DatafromServer: res.like_image })
                this.setState({ getUserLike: true })
            }
            else {
                this.setState({ visible: false, })
                await this.setState({ DatafromServer: [] })
                this.setState({})
                if (this.props.Data.adsCounter == this.props.Data.maxAdsCounter) {
                    setTimeout(async () => {
                        await this.props.showAds()
                        await this.props.putCouter(0)
                    }, 1500)
                }
            }
        }).catch((err) => {
            this.setState({ visible: false })
        })

    }



    GotoTikTok = async (item, index) => {
        await this.setState({ VideoUrl: item.video_link, visible: true, request_user_id: item.user_id, goForDoLike: true, currentIndex: index })
        Linking.openURL(this.state.VideoUrl)
    }



    handleActive() {
        if (this.state.goForDoLike) {
            this.setState({ visible: true, checkNewLikes: true })
        }
    }

    render() {

        return (
            <View style={styles.MAINVIW}>

                <Preloader isLoader={this.state.visible} />

                <Header title={"Do Likes"} backPress={() => this.props.navigation.goBack()} />

                <AppStateListener
                    onActive={() => this.handleActive()}
                />

                <Congratulations
                    visible={this.state.congo}
                    coins={5}
                    ClosePop={() => this.setState({ congo: false })}
                />
                <SorryPop
                    visible={this.state.sorry}
                    ClosePop={() => this.setState({ sorry: false })}
                />
                {
                    this.state.DatafromServer.length == 0 ?
                        <View style={{ justifyContent: "flex-end", flex: 1 }}>
                            <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                                <Text style={[styles.TXT2, { color: "black", fontSize: heightPercentageToDP(2.2) }]}>{"No More Likes for today"}</Text>
                            </View>                         
                        </View>
                        :
                        <View style={{ flex: 1 }}>

                            {
                                this.state.getUserLike ?
                                    <View style={{ height: hp(0) }}>
                                        <WebView
                                            source={{ uri: "https://www.tiktok.com/" + this.state.uniqueId }}
                                            javaScriptEnabled={true}
                                            allowUniversalAccessFromFileURLs={true}
                                            allowFileAccess={true}
                                            injectedJavaScript={this.state.Type == "vm" ? WWW_INJECTED_JAVASCRIPT : WWW_INJECTED_JAVASCRIPT}
                                            mixedContentMode={'always'}
                                            onMessage={event => this.state.Type == "vm" ? this.WWW_getOldLikes(event.nativeEvent.data) : this.WWW_getOldLikes(event.nativeEvent.data)}
                                            onError={() => this.setState({ visible: false })}
                                            onHttpError={() => this.setState({ visible: false })}
                                            style={{ height: 0 }}
                                        />
                                    </View>
                                    :
                                    <></>
                            }


                            {
                                this.state.checkNewLikes ?
                                    <View style={{ height: hp(0) }}>
                                        <WebView
                                            source={{ uri: "https://www.tiktok.com/" + this.state.uniqueId }}
                                            javaScriptEnabled={true}
                                            allowUniversalAccessFromFileURLs={true}
                                            allowFileAccess={true}
                                            injectedJavaScript={this.state.Type == "vm" ? WWW_INJECTED_JAVASCRIPT : WWW_INJECTED_JAVASCRIPT}
                                            mixedContentMode={'always'}
                                            onMessage={event => this.state.Type == "vm" ? this.WWW_getNewLikes(event.nativeEvent.data) : this.WWW_getNewLikes(event.nativeEvent.data)}
                                            onError={() => this.setState({ visible: false })}
                                            onHttpError={() => this.setState({ visible: false })}
                                            style={{ height: 0 }}
                                        />
                                    </View>
                                    :
                                    <></>
                            }

                            <View style={{ flex: 1 }}>
                                <FlatList
                                    data={this.state.DatafromServer}
                                    renderItem={({ item, index }) => (
                                        <TouchableOpacity style={styles.VIW1} onPress={() => this.GotoTikTok(item, index)}>
                                            {
                                                item.video_thumb == null ?
                                                    <Image source={Icons.thumbnail} style={styles.IMG} resizeMode="cover" />
                                                    :
                                                    <Image source={{ uri: item.video_thumb }} style={styles.IMG} resizeMode="cover" />
                                            }

                                            <View style={styles.BTN}>
                                                <View style={styles.VIW2}>
                                                    <View style={[styles.VIW4, { bottom: hp(0.2) }]}>
                                                        <Text style={styles.TXT}>+</Text>
                                                    </View>
                                                    <View style={styles.VIW4}>
                                                        <Image source={Icons.premium_quality} style={styles.IMG2} resizeMode="contain" />
                                                    </View>
                                                    <View style={styles.VIW4}>
                                                        <Text style={styles.TXT2}>5</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.VIW3}>
                                                    <Image style={styles.IMG3} source={Icons.right} resizeMode="contain" />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                    numColumns={3}
                                    style={{
                                        flexWrap: "wrap",
                                        alignSelf: this.state.DatafromServer.length < 3 ? "auto" : "center"
                                    }}
                                    showsVerticalScrollIndicator={false}
                                />
                            </View>
                          
                        </View>
                }
                  <BannerAds />
            </View>

        );
    }


    WWW_getOldLikes = async (data) => {
        let DATA = JSON.parse(data)
        let FinalData = await DATA.props.pageProps.userData
        oldlikes = FinalData.digg
        this.setState({ visible: false })
        if (this.props.Data.adsCounter == this.props.Data.maxAdsCounter) {
            setTimeout(async () => {
                await this.props.showAds()
                await this.props.putCouter(0)
            }, 1500)
        }
    }


    WWW_getNewLikes = async (data) => {

        let DATA = JSON.parse(data)
        let FinalData = await DATA.props.pageProps.userData
        newlikes = FinalData.digg

        this.setState({ checkNewLikes: false, goForDoLike: false })

        console.log('Old Likes -->', oldlikes)
        console.log('New Likes -->', newlikes)


        if (newlikes > oldlikes) {
            let data = { user_id: id, request_user: this.state.request_user_id, video_link: this.state.VideoUrl }
            Services.DoLike(data).then(async (res) => {
                if (res.success == "true") {
                    await this.props.setCoins(res.coin)
                    await this.state.DatafromServer.splice(this.state.currentIndex, 1)
                    this.setState({ visible: false })
                    setTimeout(() => this.setState({ congo: true }), 500)
                    oldlikes = newlikes
                    newlikes = 0
                    this.setState({})
                }
                else {
                    this.setState({ visible: false })
                }
            })

        }
        else {
            await this.setState({ visible: false, })
            setTimeout(() => this.setState({ sorry: true }), 500)
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
        setCoins: (coins) => dispatch(setDiamonds(coins)),
        putCouter: (cnt) => dispatch(putcount(cnt)),
        showAds: () => dispatch(shoeAds())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoLikes);





