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
import AppStateListener from "react-native-appstate-listener";
import Congratulations from '../Components/Popups/Congratulations'
import SorryPop from '../Components/Popups/SorryPop';
import BackgroundTimer from 'react-native-background-timer';
import { puMaxCount, putcount, shoeAds , hideAds} from '../ReduxConfig/Actions/AddCount/AddCount';
import BannerAds from './BannerAds';
import { InterstitialAdManager, AdSettings } from 'react-native-fbads';


const VM_INJECTED_JAVASCRIPT = 'window.ReactNativeWebView.postMessage(JSON.stringify(__INIT_PROPS__))'


var id = ""
var seconds = 0


class DoComments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DatafromServer: [],
            visible: true,
            goForDoLike: false,
            checkNewLikes: false,
            VideoUrl: "",
            Likes: 0,
            NewLikes: 0,
            request_user_id: "",
            congo: false,
            sorry: false
        };
    }

    componentDidMount() {
        id = this.props.Data.CommonData.userId
        this.getData(id)
    }

    getData(id) {
        Services.CommentVideoList(id).then(async (res) => {
            if (res.success == "true") {
                this.setState({ DatafromServer: res.comment_video })
                this.setState({ visible: false })
            }
            else {
                this.setState({ visible: false, })
                await this.setState({ DatafromServer: [] })
                this.setState({})
            }
        }).catch((err) => {
            this.setState({ visible: false })
        })
        // if (this.props.Data.adsCounter == this.props.Data.maxAdsCounter) {
        //     setTimeout(async () => {
        //         await this.props.showAds()
        //         await this.props.putCouter(0)
        //     }, 1500)
        // }
    }

    GotoTikTok = async (item) => {
        await this.setState({ goForDoLike: true, VideoUrl: item.video_link, visible: true, request_user_id: item.user_id })
    }

    handleActive() {
        if (this.state.goForDoLike) {
            this.isVideoViewed()
        }
    }

    isVideoViewed = async () => {
        await BackgroundTimer.stopBackgroundTimer()
        this.setState({ goForDoLike: false })
        if (seconds == 0) {
            let data = { user_id: id, request_user: this.state.request_user_id, video_link: this.state.VideoUrl }
            Services.DoComment(data).then(async (res) => {
                if (res.success == "true") {
                    await this.props.setCoins(res.coin)
                    await this.getData(id)
                    this.setState({ visible: false })
                    setTimeout(() => this.setState({ congo: true }), 500)
                    seconds = -1
                    this.setState({})
                }
                else {
                    this.setState({ visible: false })
                }
            })
        }
        else {
            this.setState({ visible: false, goForDoLike: false })
            setTimeout(() => this.setState({ sorry: true }), 500)
        }
    }

    getDuration = async (event) => {

        let dt = await JSON.parse(event)

        let thumbinfo = dt["/v/:id"]

        seconds = await thumbinfo.videoData.itemInfos.video.videoMeta.duration

        Linking.openURL(this.state.VideoUrl)
    }


    setTimer = async () => {
        if (this.state.goForDoLike) {
            await BackgroundTimer.runBackgroundTimer(() => this.startTimer(), 1000)
        }

    }

    startTimer = () => {
        if (this.state.goForDoLike) {
            if (seconds > 0) {
                seconds--;
            }
            else {
               
            }
        }
    }

    render() {

        return (
            <View style={styles.MAINVIW}>

                <Preloader isLoader={this.state.visible} />

                <Header title={"Do Views"} backPress={() => this.props.navigation.goBack()} />

                <AppStateListener
                    onActive={() => this.handleActive()}
                    onBackground={() => this.setTimer()}
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
                                <Text style={[styles.TXT2, { color: "black", fontSize: heightPercentageToDP(2.2) }]}>{"No More Views for today"}</Text>
                            </View>                           
                        </View>
                        :
                        <View style={{ height:"88%" }}>
                            {
                                this.state.goForDoLike ?
                                    <View style={{ height: hp(0) }}>
                                        <WebView
                                            source={{ uri: this.state.VideoUrl }}
                                            javaScriptEnabled={true}
                                            allowUniversalAccessFromFileURLs={true}
                                            allowFileAccess={true}
                                            injectedJavaScript={VM_INJECTED_JAVASCRIPT}
                                            mixedContentMode={'always'}
                                            onMessage={event => this.getDuration(event.nativeEvent.data)}
                                            onError={() => this.setState({ visible: false })}
                                            onHttpError={() => this.setState({ visible: false })}
                                            style={{ height: 0 }}
                                        />
                                    </View>
                                    :
                                    <></>
                            }

                            <View style={{  }}>
                                <FlatList
                                    data={this.state.DatafromServer}
                                    renderItem={({ item, index }) => (
                                        <TouchableOpacity style={[styles.VIW1, { marginBottom: index == this.state.DatafromServer.length - 1 ? hp(9) : 0 }]} onPress={() => this.GotoTikTok(item)}>
                                            {
                                                item.video_thumb == null ?
                                                    <Image source={Icons.thumbnail} style={styles.IMG} resizeMode="cover" />
                                                    :
                                                    <Image source={{ uri: item.video_thumb }} style={styles.IMG} resizeMode="cover" />
                                            }
                                            <TouchableOpacity style={styles.BTN}>
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
                                                <TouchableOpacity style={styles.VIW3}>
                                                    <Image style={styles.IMG3} source={Icons.right} resizeMode="contain" />
                                                </TouchableOpacity>
                                            </TouchableOpacity>
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
        showAds: () => dispatch(shoeAds()),
        hideAds: () => dispatch(hideAds()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoComments);