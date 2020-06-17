import React, { Component } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity, BackHandler, Platform } from 'react-native';
import styles from './styles/HomeScreenStyles'
import { Icons } from '../Utils/IconManager';
import SplashScreen from 'react-native-splash-screen'
import { Services } from '../Configurations/Api/Connections';
import { custom_number_format } from '../Utils/functions'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { setDiamonds } from '../ReduxConfig/Actions/Login/LoginActions'
import { puMaxCount, putcount, shoeAds } from '../ReduxConfig/Actions/AddCount/AddCount';
import VersionUpdate from '../Components/Popups/VersionUpdatePop'
import AsyncStorage from '@react-native-community/async-storage';


let AllData = null
let OtherData = null


class Homescreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false
    };
  }

  async UNSAFE_componentWillMount() {
    SplashScreen.hide()
    this.setAllData()
  }



  setAllData = () => {
    AllData = this.props.Data.CommonData
    Services.setting({ user_id: AllData.userId }).then(async (res) => {
      OtherData = res.setting
      this.setState({})


      let x = await AsyncStorage.getItem('app_version')
      if (x != null) {
        if (parseInt(x) < parseInt(OtherData.app_version))
          this.setState({ update: true })
      }
      else
        await AsyncStorage.setItem('app_version', OtherData.app_version)


      await this.props.setCoins()
      await this.props.setMaxAdsCounter()
    })
  }

  commonNavigator = async (Type) => {
    // if (this.props.Data.adsCounter == this.props.Data.maxAdsCounter) {
    //   if (Type == "side") {
    //     await this.props.showAds()
    //     await this.props.putCouter(0)
    //     this.props.navigation.openDrawer()
    //   }
    //   else
    //     this.props.navigation.navigate(Type)
    // }
    // else {
    //   let cnt = this.props.Data.adsCounter
    //   cnt++;
    //   await this.props.putCouter(cnt)
    //   if (Type == "side")
    //     this.props.navigation.openDrawer()
    //   else
    //     this.props.navigation.navigate(Type)
    // }
    if (this.props.Data.adsCounter == this.props.Data.maxAdsCounter) {
      await this.props.showAds()
      await this.props.putCouter(0)
      this.props.navigation.navigate(Type)
    }
    else {
      let cnt = this.props.Data.adsCounter
      cnt++;
      await this.props.putCouter(cnt)
      this.props.navigation.navigate(Type)
    }

  }

  render() {
    console.log(this.props.Data.adsCounter)
    return (
      <>
        <StatusBar hidden={Platform.OS == "ios" ? true : false} />

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
    showAds: () => dispatch(shoeAds())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homescreen);