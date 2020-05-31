import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Clipboard, Linking } from 'react-native';
import Preloader from '../Components/Preloader'
import styles from './styles/GetLikesStyles';
import { Icons } from "../Utils/IconManager";
import { connect } from 'react-redux'
import Header from '../Components/Header';
import { Services } from '../Configurations/Api/Connections'
import { WebView } from 'react-native-webview';
import NotEnoughDiamondPop from '../Components/Popups/NotEnoughDiamondPop';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import CommonPopup from '../Components/Popups/CommonPopup';
import { setDiamonds } from '../ReduxConfig/Actions/Login/LoginActions';

const VM_INJECTED_JAVASCRIPT = 'window.ReactNativeWebView.postMessage(JSON.stringify(__INIT_PROPS__))'

var IncData = { Request: 0, Diamonds: 0 }

class CommonScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            DataFromServer: null,
            TotalDiamond: 0,
            userId: "",
            NotEnough: false,
            getThumbnail: false,
            VideoUrl: "",
            borderWidth: 0,
            success: false
        };
    }

    async  componentDidMount() {
        IncData = await this.props.navigation.getParam('data')
        this.setState({ TotalDiamond: this.props.Data.coins })
        this.setState({ userId: this.props.Data.CommonData.userId })
    }


    PopupMangement = () => {

        if (parseInt(IncData.Diamonds) > parseInt(this.state.TotalDiamond)) {
            this.setState({ NotEnough: true })
        }
        else {
            this.onSubmitClick()
        }
    }

    render() {
        return (
            <View style={styles.MAINVIW}>
                <Preloader isLoader={this.state.visible} />
                <NotEnoughDiamondPop
                    visible={this.state.NotEnough}
                    ClosePop={() => this.setState({ NotEnough: false })}
                />
                <CommonPopup
                    visible={this.state.success}
                    type={this.props.navigation.getParam('type') == "Get Likes" ?
                        "Like"
                        :
                        this.props.navigation.getParam('type') == "Get Views" ?
                            "Views"
                            :
                            "Shares"
                    }
                    ClosePop={() => this.setState({ success: false, VideoUrl: "" })}
                />
                {
                    this.state.getThumbnail ?
                        <View style={{ height: heightPercentageToDP(0) }}>
                            <WebView
                                source={{ uri: this.state.VideoUrl }}
                                javaScriptEnabled={true}
                                allowUniversalAccessFromFileURLs={true}
                                allowFileAccess={true}
                                injectedJavaScript={VM_INJECTED_JAVASCRIPT}
                                mixedContentMode={'always'}
                                onMessage={event => this.getThumbnail(event.nativeEvent.data)}
                                onError={() => this.setState({ visible: false })}
                                onHttpError={() => this.setState({ visible: false })}
                                style={{ height: 0 }}
                            />
                        </View>
                        :
                        <></>
                }
                <Header title={this.props.navigation.getParam('type')} backPress={() => this.props.navigation.goBack()} />
                <View style={styles.VIW1}>
                    <View>
                        <Text>
                            <Text style={styles.TXT1}>Get</Text>
                            <Text style={[styles.TXT1, { color: "#FE2C55" }]}> {
                                this.props.navigation.getParam('type') == "Get Likes" ?
                                    "Likes"
                                    :
                                    this.props.navigation.getParam('type') == "Get Views" ?
                                        "Views"
                                        :
                                        "Share"
                            }</Text>
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.TXT1}>on Your Video</Text>
                    </View>
                </View>
                <View style={styles.VIW2}>
                    <Text style={{ textAlign: "center" }}>
                        <Text style={styles.TXT2}>Get</Text>
                        <Text style={[styles.TXT2, { color: "#FE2C55" }]}> {IncData.Request}</Text>
                        <Text style={styles.TXT2}> Real {
                            this.props.navigation.getParam('type') == "Get Likes" ?
                                "Likes"
                                :
                                this.props.navigation.getParam('type') == "Get Views" ?
                                    "Views"
                                    :
                                    "Shares"
                        } in </Text>
                        <Text style={[styles.TXT2, { color: "#FE2C55" }]}> {IncData.Diamonds}</Text>
                        <Text style={styles.TXT2}> diamonds</Text>
                    </Text>
                </View>
                <View style={[styles.VIW5, { borderWidth: this.state.borderWidth, borderColor: "red" }]}>
                    <View style={styles.VIW6}>
                        <TextInput value={this.state.VideoUrl} onChangeText={(val) => this.onChangeTextIN(val)} style={styles.TXTINPUT} placeholder="Enter Tiktok Video URL" />
                    </View>
                    <TouchableOpacity style={styles.VIW7} onPress={() => this.onWatchIconClick()}>
                        <Image source={Icons.Video} style={styles.IMG} />
                    </TouchableOpacity>
                </View>
                <View style={styles.VIW8}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={styles.BTNSTYLE} onPress={() => this.pasteUrl()}>
                            <Text style={styles.TXT3}>Paste URL</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                        <TouchableOpacity style={styles.BTNSTYLE1} onPress={() => this.PopupMangement()}>
                            <Text style={styles.TXT3}>Submit</Text>
                            <Image source={Icons.premium_quality} style={styles.IMG1} resizeMode="contain" />
                            <Text style={styles.TXT3}>{IncData.Diamonds}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.VIW9}>
                    <Text style={styles.TXT4}>Note: When you get {
                           this.props.navigation.getParam('type') == "Get Likes" ?
                           "likes"
                           :
                           this.props.navigation.getParam('type') == "Get Views" ?
                               "views"
                               :
                               "shares"
                    } on your old video then
              submit new video URL after 48 hours.</Text>
                </View>
            </View>
        );
    }

    getThumbnail = (event) => {
        let dt = JSON.parse(event)
        if (dt["/v/:id"] != undefined) {
            let thumbinfo = dt["/v/:id"]
            let thumbNail = thumbinfo.videoData.shareMeta.image.url
            let finalthumb = thumbNail == null ? "" : thumbNail == undefined ? "" : thumbNail

            if (this.props.navigation.getParam('type') == "Get Likes") {

                let data = { user_id: this.state.userId, video_link: this.state.VideoUrl, request_like: IncData.Request, like_coin: IncData.Diamonds, video_thumb: finalthumb }

                Services.RequestLikes(data).then(async (res) => {
                    if (res.tiktok_like.success == "true") {
                        await this.props.setCoins(res.tiktok_like.coin)
                        await this.setState({ visible: false, getThumbnail: false, VideoUrl: "" })
                        setTimeout(() => this.setState({ success: true }), 500)
                    }
                    else {
                        await this.setState({ visible: false })
                        alert("Something Went Wrong, Try Again Later")
                    }
                }).catch(() => {
                    this.setState({ visible: false })
                    alert("Something Went Wrong, Try Again Later")
                })
            }
            else if (this.props.navigation.getParam('type') == "Get Views") {

                  let data = { user_id: this.state.userId, video_link: this.state.VideoUrl, request_comment: IncData.Request, comment_coin: IncData.Diamonds, video_thumb: finalthumb }
                // let data = { user_id: this.state.userId, video_link: this.state.VideoUrl, request_comment: 1, comment_coin: 1, video_thumb: finalthumb }

                Services.RequestComment(data).then(async (res) => {
                    console.log(res.tiktok_comment.success)
                    if (res.tiktok_comment.success == "true") {
                        await this.props.setCoins(res.tiktok_comment.coin)
                        await this.setState({ visible: false, getThumbnail: false, VideoUrl: "" })
                        setTimeout(() => this.setState({ success: true }), 500)
                    }
                    else {
                        await this.setState({ visible: false })
                        alert("Something Went Wrong, Try Again Later")
                    }
                }).catch(() => {
                    this.setState({ visible: false })
                    alert("Something Went Wrong, Try Again Later")
                })

            }
            else {

                let data = { user_id: this.state.userId, video_link: this.state.VideoUrl, request_share: IncData.Request, share_coin: IncData.Diamonds, video_thumb: finalthumb }
                // let data = { user_id: this.state.userId, video_link: this.state.VideoUrl, request_share: 1, share_coin: 1, video_thumb: finalthumb }

                Services.RequestShare(data).then(async (res) => {
                    console.log(res)
                    if (res.tiktok_share.success == "true") {
                        await this.props.setCoins(res.tiktok_share.coin)
                        await this.setState({ visible: false, getThumbnail: false, VideoUrl: "" })
                        setTimeout(() => this.setState({ success: true }), 500)
                    }
                    else {
                        await this.setState({ visible: false })
                        alert("Something Went Wrong, Try Again Later")
                    }
                }).catch(() => {
                    this.setState({ visible: false })
                    alert("Something Went Wrong, Try Again Later")
                })
            }
        }
        else {
            this.setState({ visible: false, VideoUrl: "" })
            alert("Invalid Url, Please Enter Video URL!!")
        }
    }

    onSubmitClick = () => {
        let checkURl = /^(?!\s*$).+/
        let url = this.state.VideoUrl
        if (checkURl.test(url.trim())) {
            if (url.match(/vm.tiktok.com/g) || url.match(/vt.tiktok.com/g)) {
                this.setState({ getThumbnail: true, visible: true })
            }
            else {
                alert("Url Must be Of Tiktok videos!!")
            }
        }
        else {
            this.setState({ borderWidth: 1 })
        }
    }


    onWatchIconClick = () => {
        let checkURl = /^(?!\s*$).+/
        let url = this.state.VideoUrl
        if (checkURl.test(url.trim())) {
            if (url.match(/vm.tiktok.com/g) || url.match(/vt.tiktok.com/g)) {
                Linking.openURL(url)
            }
            else {
                alert("Url Must be Of Tiktok videos!!")
            }
        }
        else {
            this.setState({ borderWidth: 1 })
        }
    }

    pasteUrl = async () => {

        let url = await Clipboard.getString()
        this.setState({ VideoUrl: url })

    }

    onChangeTextIN = (val) => {
        let checkURl = /^(?!\s*$).+/
        if (checkURl.test(val.trim())) {
            this.setState({ VideoUrl: val, borderWidth: 0 })
        }
        else {
            this.setState({ borderWidth: 1, VideoUrl: "" })
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
        setCoins: (coins) => dispatch(setDiamonds(coins))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommonScreen);