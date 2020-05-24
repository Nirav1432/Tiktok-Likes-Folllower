import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Linking } from 'react-native';
import styles from './styles/DoLikesStyles';
import { Icons } from "../Utils/IconManager";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from '../Components/Header';
import { setDiamonds } from '../ReduxConfig/Actions/Login/LoginActions';
import { connect } from 'react-redux'
import { Services } from '../Configurations/Api/Connections'
import Preloader from '../Components/Preloader';
import { WebView } from 'react-native-webview';
import { NavigationEvents } from 'react-navigation';
import AppStateListener from "react-native-appstate-listener";
import Congratulations from '../Components/Popups/Congratulations'
const VM_INJECTED_JAVASCRIPT = 'window.ReactNativeWebView.postMessage(JSON.stringify(__INIT_PROPS__))'

var oldlikes = 0
var newlikes = 0
class DoLikes extends Component {
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
            congo: false
        };
    }

    componentDidMount() {
        let id = this.props.Data.CommonData.userId
        this.getData(id)
    }

    getData(id) {
        Services.LikeList(id).then(res => {
            if (res.success == "true") {
                this.setState({ DatafromServer: res.like_image })
                this.setState({ visible: false })
            }
            else {
                alert('No Data Found !!')
                this.setState({ visible: false })
            }
        }).catch((err) => {
            this.setState({ visible: false })
        })
    }

    GotoTikTok = async (item) => {
        await this.setState({ goForDoLike: true, VideoUrl: item.video_link, visible: true })
    }

    handleActive() {
        if (this.state.goForDoLike) {
            this.setState({ visible: true, goForDoLike: false, checkNewLikes: true })
        }
    }

    getThumbnail = async (event) => {
        let dt = await JSON.parse(event)
        let thumbinfo = dt["/v/:id"]
        oldlikes = await thumbinfo.videoData.itemInfos.diggCount
        await this.setState({})
        Linking.openURL(this.state.VideoUrl)
    }

    getNewLikes = async (event) => {
        let dt = await JSON.parse(event)
        let thumbinfo = dt["/v/:id"]
        newlikes = await thumbinfo.videoData.itemInfos.diggCount
        await this.setState({ visible: false, })
        await this.setState({ checkNewLikes: false })
        console.log('Old Likes -->', oldlikes)
        console.log('New Likes -->', newlikes)
        if (newlikes > oldlikes) {
            setTimeout(() => this.setState({ congo: true }), 1000)
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
                    ClosePop={() => this.setState({ congo: false })}
                />
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
                                onMessage={event => this.getThumbnail(event.nativeEvent.data)}
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
                                source={{ uri: this.state.VideoUrl }}
                                javaScriptEnabled={true}
                                allowUniversalAccessFromFileURLs={true}
                                allowFileAccess={true}
                                injectedJavaScript={VM_INJECTED_JAVASCRIPT}
                                mixedContentMode={'always'}
                                onMessage={event => this.getNewLikes(event.nativeEvent.data)}
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
                            <View style={styles.VIW1}>
                                <Image source={{ uri: item.video_thumb }} style={styles.IMG} resizeMode="cover" />
                                <TouchableOpacity style={styles.BTN} onPress={() => this.GotoTikTok(item)}>
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
                            </View>
                        )}
                        numColumns={3}
                        style={{
                            flexWrap: "wrap",
                            alignSelf: this.state.DatafromServer.length < 3 ? "auto" : "center"
                        }}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <View style={styles.VIW5}>
                    <TouchableOpacity style={styles.SubmitBotton} >
                        <Text style={styles.TXT22}>NEXT</Text>
                    </TouchableOpacity>
                </View>
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
        setCoins: (coins) => dispatch(setDiamonds(coins))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoLikes);