import React, { Component } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity, BackHandler, Platform, Alert } from 'react-native';
import styles from './styles/HomeScreenStyles'
import { Icons } from '../Utils/IconManager';
import SplashScreen from 'react-native-splash-screen'
import { Services } from '../Configurations/Api/Connections';
import { custom_number_format, InterStrialAds } from '../Utils/functions'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { setDiamonds, putNativeAdsObject, setInterStrialId, setBannerId, PutShowVideo } from '../ReduxConfig/Actions/Login/LoginActions'
import { puMaxCount, putcount, shoeAds, hideAds } from '../ReduxConfig/Actions/AddCount/AddCount';
import { setPrivacyUrl } from '../ReduxConfig/Actions/Login/LoginActions'
import VersionUpdate from '../Components/Popups/VersionUpdatePop'
import { InterstitialAdManager, AdSettings, BannerView, NativeAdsManager } from 'react-native-fbads';
import Preloader from '../Components/Preloader';
import DeviceInfo from 'react-native-device-info';


let AllData = null
let OtherData = null



class Homescreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false,
      BackClickCounter: 0, visible: true
    };
  }

  async UNSAFE_componentWillMount() {
    this.setAllData()
  }

  setAllData = async () => {

    AllData = this.props.Data.CommonData

    await Services.setting({ user_id: AllData.userId })
      .then(async (res) => {

        OtherData = res.setting

        this.props.setPrivacy(OtherData.privacy_policy)

        this.setState({})

        let x = await DeviceInfo.getVersion()

        if (parseInt(x) < parseInt(OtherData.app_version))
          this.setState({ update: true })

        await this.props.setCoins()
        await this.props.setMaxAdsCounter()

      })

    if (OtherData.show_reward_video == "1" || OtherData.show_reward_video == 1) {
      this.props.putSD(true)
    }
    else {
      this.props.putSD(false)
    }

    // Test Id
    // let iid = "979168055864310_979168595864256"
    // let Ntid = "979168055864310_981496822298100"
    // let BannerId = "579084412746231_579084742746198"

    // let ads = await new NativeAdsManager(Ntid)
    // await this.props.setNativeAdsObject(ads)
    // await this.props.SbanId(BannerId)
    // await this.props.SInterId(iid)


    // Live Ads
    let iid = OtherData.facebook_interstitial_id.toString()
    let Ntid=OtherData.facebook_native.toString()
    let BannerId = OtherData.facebook_native_banner_id.toString()
    let ads = await new NativeAdsManager(Ntid)
    await this.props.setNativeAdsObject(ads)
    await this.props.SbanId(BannerId)
    await this.props.SInterId(iid)

    this.setState({ visible: false })

  }

  commonNavigator = async (Type) => {

    if (this.props.Data.adsCounter == this.props.Data.maxAdsCounter) {

      await this.props.showAds()

      setTimeout(async () => {
        let adsResult = await InterStrialAds(this.props.Data.InterStrialId)
        this.props.hideAds()
        await this.props.putCouter(0)
        this.props.navigation.navigate(Type)
      }, 3000)

    }
    else {
      let cnt = this.props.Data.adsCounter
      cnt++;
      await this.props.putCouter(cnt)
      this.props.navigation.navigate(Type)
    }



  }

  render() {

    return (
      <>
        <StatusBar hidden={Platform.OS == "ios" ? true : false} />

        <Preloader isLoader={this.state.visible} />

        <VersionUpdate
          visible={this.state.update}
        />

        {AllData != null && OtherData != null ?

          <View style={styles.MAINVIW}>

            <StatusBar backgroundColor="#FE2C55" />

            <View style={styles.VIW1}>

              <View style={[styles.VIW13, { top: Platform.OS === "ios" ? hp(3.5) : 0 }]}>

                <View style={styles.VIW7}>
                  <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={styles.BTN}>
                    <Image source={Icons.menu} style={styles.IMG2} />
                  </TouchableOpacity>
                </View>

                <View style={styles.VIW8}>
                  <View style={styles.VIW9}>
                    <View style={styles.VIW10}>
                      <Image source={Icons.premium_quality} style={styles.IMG3} resizeMode="contain" />
                    </View>
                    <View style={styles.VIW11}>
                      <Text style={styles.TXT4}>{custom_number_format(this.props.Data.coins)}</Text>
                    </View>
                  </View>
                </View>

              </View>

            </View>

            <View style={styles.VIW333}>

              <View style={styles.VIW2}>
                <Image source={{ uri: this.props.Data.CommonData.coversMedium[0] }} style={styles.IMG1} />
                <Text style={styles.TXT1}>{this.props.Data.CommonData.nickName}</Text>
                <View style={styles.VIW6}>
                  <View style={styles.CMNVIW}>
                    <Text style={styles.TXT2}>{custom_number_format(this.props.Data.CommonData.following)}</Text>
                    <Text style={styles.TXT3}>Following</Text>
                  </View>
                  <View style={styles.CMNVIW}>
                    <Text style={styles.TXT2}>{custom_number_format(this.props.Data.CommonData.fans)}</Text>
                    <Text style={styles.TXT3}>Followers</Text>
                  </View>
                  <View style={styles.CMNVIW}>
                    <Text style={styles.TXT2}>{custom_number_format(parseInt(this.props.Data.CommonData.heart))}</Text>
                    <Text style={styles.TXT3}>Likes</Text>
                  </View>
                </View>
              </View>

              <View style={styles.VIW3}>
                <View style={styles.VIW12}>
                  <TouchableOpacity onPress={() => this.commonNavigator("Follower")}>
                    <Image style={styles.IMG4} source={Icons.AddFL} />
                    <Text style={styles.TXT5}>Follower</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.VIW12}>
                  <TouchableOpacity onPress={() => this.commonNavigator("Likes")}>
                    <Image style={styles.IMG4} source={Icons.Like} />
                    <Text style={styles.TXT5}>Like</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.VIW12}>
                  <TouchableOpacity onPress={() => this.commonNavigator("Comments")}>
                    <Image style={styles.IMG4} source={Icons.doView} />
                    <Text style={styles.TXT5}>View</Text>
                  </TouchableOpacity>

                </View>
              </View>


              <View style={styles.VIW3}>
                <View style={styles.VIW12}>
                  <TouchableOpacity onPress={() => this.commonNavigator("Share")}>
                    <Image style={styles.IMG4} source={Icons.shareHome} />
                    <Text style={styles.TXT5}>Share</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.VIW12}>
                  <TouchableOpacity onPress={() => this.commonNavigator("EarnScreen")}>
                    <Image style={styles.IMG4} source={Icons.Earn} />
                    <Text style={styles.TXT5}>Earn</Text>
                  </TouchableOpacity>

                </View>
                <View style={styles.VIW12}>
                  <TouchableOpacity onPress={() => this.commonNavigator("PurchaseCoinsScreen")}>
                    <View style={{ flex: 6.4, justifyContent: "flex-end" }}>
                      <Image style={styles.IMG4} source={Icons.purchase} />
                    </View>
                    <View style={{ flex: 3.6, justifyContent: "flex-start" }}>
                      <Text style={styles.TXT5}>Purchase{'\n'}diamonds</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

          </View > :
          <></>
        }
      </>

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
    setCoins: () => dispatch(setDiamonds(OtherData.coin)),
    setMaxAdsCounter: () => dispatch(puMaxCount(parseInt(OtherData.ads_click))),
    putCouter: (cnt) => dispatch(putcount(cnt)),
    showAds: () => dispatch(shoeAds()),
    hideAds: () => dispatch(hideAds()),
    setPrivacy: (url) => dispatch(setPrivacyUrl(url)),
    setNativeAdsObject: (obj) => dispatch(putNativeAdsObject(obj)),
    SbanId: (obj) => dispatch(setBannerId(obj)),
    SInterId: (obj) => dispatch(setInterStrialId(obj)),
    putSD: (obj) => dispatch(PutShowVideo(obj)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homescreen);