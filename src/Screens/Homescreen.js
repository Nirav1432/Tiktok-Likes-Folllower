import React, { Component } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity, BackHandler, Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles/HomeScreenStyles'
import { Icons } from '../Utils/IconManager';
import SplashScreen from 'react-native-splash-screen'
import { Services } from '../Configurations/Api/Connections';
import { custom_number_format } from '../Utils/functions'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { setDiamonds } from '../ReduxConfig/Actions/Login/LoginActions'
import { puMaxCount, putcount } from '../ReduxConfig/Actions/AddCount/AddCount';
import AdsScreen from './AdsScreen';


let AllData = null
let OtherData = null
let counter = 0

class Homescreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAdd: false
    };
  }

  async UNSAFE_componentWillMount() {
    SplashScreen.hide()
    this.setAllData()
  }



  setAllData = () => {
    AllData = this.props.Data.CommonData
    Services.setting({ user_id: AllData.userId }).then((res) => {
      OtherData = res.setting
      this.setState({})
      this.props.setCoins()
      this.props.setMaxAdsCounter()
    })
  }

  commonNavigator = () => {
    if (this.props.Data.adsCounter == this.props.Data.maxAdsCounter) {
      this.setState({ showAdd: true })
      this.props.putCouter(0)
    }
    else {    
      let cnt=this.props.Data.adsCounter
      cnt++;
      console.log(cnt)
      this.props.putCouter(cnt)
      // this.props.navigation.navigate("Follower")
    }
  }

  render() {

    console.log(this.props.Data.adsCounter)
    return (
      <>
        <StatusBar hidden={Platform.OS == "ios" ? true : false} />

        {AllData != null && OtherData != null ?

          <View style={styles.MAINVIW}>

            {
              this.state.showAdd ?
                <AdsScreen
                  closeAdd={() => this.setState({ showAdd: false })}
                />
                :
                <></>
            }

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
                  <TouchableOpacity onPress={() =>this.commonNavigator()}>
                    <Image style={styles.IMG4} source={Icons.AddFL} />
                    <Text style={styles.TXT5}>Follower</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.VIW12}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate("Likes")}>
                    <Image style={styles.IMG4} source={Icons.Like} />
                    <Text style={styles.TXT5}>Like</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.VIW12}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate("Comments")}>
                    <Image style={styles.IMG4} source={Icons.doView} />
                    <Text style={styles.TXT5}>View</Text>
                  </TouchableOpacity>

                </View>
              </View>


              <View style={styles.VIW3}>
                <View style={styles.VIW12}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate("Share")}>
                    <Image style={styles.IMG4} source={Icons.shareHome} />
                    <Text style={styles.TXT5}>Share</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.VIW12}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate("EarnScreen")}>
                    <Image style={styles.IMG4} source={Icons.Earn} />
                    <Text style={styles.TXT5}>Earn</Text>
                  </TouchableOpacity>

                </View>
                <View style={styles.VIW12}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate("PurchaseCoinsScreen")}>
                    <Image style={styles.IMG4} source={Icons.purchase} />
                    <Text style={styles.TXT5}>Purchase Coins</Text>
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
    putCouter: (cnt) => dispatch(putcount(cnt))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homescreen);