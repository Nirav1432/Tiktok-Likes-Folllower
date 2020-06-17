import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Linking } from 'react-native';
import styles from './styles/DoFollowingStyles';
import { Icons } from "../Utils/IconManager";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { custom_number_format } from '../Utils/functions'
import Header from '../Components/Header';
import { Services } from '../Configurations/Api/Connections';
import { connect } from 'react-redux';
import Preloader from '../Components/Preloader';
import { setDiamonds } from '../ReduxConfig/Actions/Login/LoginActions';
import AppStateListener from "react-native-appstate-listener";
import Congratulations from '../Components/Popups/Congratulations'
import SorryPop from '../Components/Popups/SorryPop';
import { WebView } from 'react-native-webview';
import { puMaxCount, putcount, shoeAds } from '../ReduxConfig/Actions/AddCount/AddCount';


var userId = ""
const VM_INJECTED_JAVASCRIPT = 'window.ReactNativeWebView.postMessage(JSON.stringify(__INIT_PROPS__))'
const WWW_INJECTED_JAVASCRIPT = 'window.ReactNativeWebView.postMessage(document.getElementById("__NEXT_DATA__").innerHTML)'

var oldlikes = 0
var newlikes = 0

class DoFollowing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      datafromserver: [],
      visible: true,
      goForDoLike: false,
      checkNewLikes: false,
      VideoUrl: "",
      ProfileUrl: "",
      request_user_id: "",
      congo: false,
      sorry: false,
      getUserLike: false,
      Type: ""
    };
  }

  async UNSAFE_componentWillMount() {
    userId = this.props.Data.CommonData.userId
    await this.setState({ ProfileUrl: this.props.Data.CommonData.Tiktok, Type: this.props.Data.CommonData.Type, uniqueId: '@' + this.props.Data.CommonData.uniqueId })
    this.getNewFollower(userId)
  }

  getNewFollower = (id) => {
    Services.Following(id).then(async (res) => {
      if (res.success == "true") {
        await this.setState({ datafromserver: res.followers })
        this.setState({ getUserLike: true })
      }
      else {
        this.setState({ visible: false })
        await this.setState({ datafromserver: [] })
        this.setState({})
        if (this.props.Data.adsCounter == this.props.Data.maxAdsCounter) {
          setTimeout(async () => {
            await this.props.showAds()
            await this.props.putCouter(0)
          }, 1500)
        }
      }
    })
  }


  followUser = async (item) => {
    this.setState({ visible: true })
    let data = { user_id: userId, request_user: item.user_id }
    Services.DoFollower(data).then(async (res) => {
      if (res.success == "true") {
        await this.props.setCoins(res.coin)
        await this.getNewFollower(userId)
      }
      else {
        this.setState({ visible: false, datafromserver: [] })
      }
    })
  }

  GotoTikTok = async (item) => {
    await this.setState({ VideoUrl: item.user_link, visible: true, request_user_id: item.user_id, goForDoLike: true })
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

        <Header title={"Do Following"} backPress={() => this.props.navigation.goBack()} />

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

        {
          this.state.datafromserver.length == 0 ?
            <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
              <Text style={[styles.TXT1, { color: "black" }]}>{"No Follower Found"}</Text>
            </View>
            :
            <FlatList
              data={this.state.datafromserver}
              renderItem={({ item, index }) => (

                <View style={[styles.VIW1, { marginTop: index == 0 ? hp(2) : 0 }]} key={index}>

                  <View style={styles.profileView}>

                    <View style={styles.ImageView}>
                      <View style={styles.VIW2}>
                        <Image source={{ uri: item.profile }} style={styles.profileImage} />
                      </View>
                      <View style={[styles.VIW2, { marginLeft: wp(3) }]}>
                        <Text style={styles.TXT1}>{item.username.length > 15 ? item.username.substr(0, 15) + "..." : item.username}</Text>
                        <Text style={styles.TXT2}>{item.fullname.length > 15 ? item.fullname.substr(0, 15) + "..." : item.fullname}</Text>
                      </View>
                    </View>

                    <View style={styles.VIW3}>
                      <View style={styles.VIW22}>
                        <View style={[styles.VIW4, { bottom: hp(0.2) }]}>
                          <Text style={styles.TXT}>+</Text>
                        </View>
                        <View style={styles.VIW4}>
                          <Image source={Icons.PinkDM} style={styles.IMG2} resizeMode="contain" />
                        </View>
                        <View style={styles.VIW4}>
                          <Text style={styles.TXT22}>5</Text>
                        </View>
                      </View>
                      <TouchableOpacity style={styles.Button} onPress={() => this.GotoTikTok(item)}>
                        <Text style={styles.TXT3}>Follow</Text>
                      </TouchableOpacity>
                    </View>
                  </View>                      
                </View>
              )}
              showsVerticalScrollIndicator={false}
            />
        }
      </View>

    );
  }



  WWW_getOldLikes = async (data) => {
    let DATA = JSON.parse(data)
    let FinalData = await DATA.props.pageProps.userData
    oldlikes = FinalData.following
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
    newlikes = FinalData.following

    this.setState({ checkNewLikes: false, goForDoLike: false })

    console.log('Old Followers -->', oldlikes)
    console.log('New Followers -->', newlikes)


    if (newlikes > oldlikes) {
      let data = { user_id: userId, request_user: this.state.request_user_id }
      Services.DoFollower(data).then(async (res) => {
        if (res.success == "true") {
          await this.props.setCoins(res.coin)
          await this.getNewFollower(userId)
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



  VM_getOldLikes = async (event) => {

    let obj = await JSON.parse(event)

    var result = Object.keys(obj).map(function (key) {
      return [Number(key), obj[key]];
    });

    oldlikes = await result[0][1].userData.following

    this.setState({ visible: false })
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
export default connect(mapStateToProps, mapDispatchToProps)(DoFollowing)