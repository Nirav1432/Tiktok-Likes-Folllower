import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StatusBar, Platform, KeyboardAvoidingView, Keyboard, Clipboard } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import styles from './styles/LoginscreenStyles'
import { Icons } from "../Utils/IconManager";
import Preloader from '../Components/Preloader';
import { WebView } from 'react-native-webview';
import { Services } from '../Configurations/Api/Connections';
import AsyncStorage from '@react-native-community/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { putLogin } from '../ReduxConfig/Actions/Login/LoginActions'

// const WWW_INJECTED_JAVASCRIPT =
//   `setTimeout(() =>{window.ReactNativeWebView.postMessage(
//     document.getElementById("__NEXT_DATA__").innerHTML  
//    )},1000)`;

// const VM_INJECTED_JAVASCRIPT =
//   `setTimeout(() =>{window.ReactNativeWebView.postMessage(
//     JSON.stringify(__INIT_PROPS__)  
//  )},1000)`;

const WWW_INJECTED_JAVASCRIPT = 'window.ReactNativeWebView.postMessage(document.getElementById("__NEXT_DATA__").innerHTML)'

const VM_INJECTED_JAVASCRIPT = 'window.ReactNativeWebView.postMessage(JSON.stringify(__INIT_PROPS__))'

var FinalData = null

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      TiktokUrl: "",
      borderWidth: 0,
      type: "vm",
      fetchInfo: false, top: hp(20)
    };
  }

  async  componentDidMount() {
    SplashScreen.hide()
    Keyboard.addListener("keyboardDidHide", () => this.KeyboardDissmissed())
    Keyboard.addListener("keyboardDidShow", () => this.KeyboardShown())
    let url = await Clipboard.getString()
    await this.setState({ TiktokUrl: url })
  }

  KeyboardDissmissed = () => {
    this.setState({ top: hp(20) })
  }

  KeyboardShown = () => {
    this.setState({ top: hp(8) })
  }

  render() {
    return (

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : null}>
        <View style={styles.MAINVIW}>

          <StatusBar backgroundColor="#FA647F" />

          <Preloader isLoader={this.state.visible} />

          <View style={styles.VIW2} >
            {
              Platform.OS === "android" ?
                <View style={styles.VIW1}>
                  <Image style={styles.IMG2} source={require('../Icons/LoginImage.jpg')} />
                </View>
                :
                <Image style={styles.IMG2} source={require('../Icons/LoginImage.jpg')} />
            }

            <Image source={Icons.AppIcon} style={[styles.IMG1, { top: this.state.top }]} resizeMode="contain" />
          </View>

          <View style={{ position: "absolute" }} >
            {
              this.state.fetchInfo ?
                <WebView
                  source={{ uri: this.state.TiktokUrl }}
                  javaScriptEnabled={true}
                  allowUniversalAccessFromFileURLs={true}
                  allowFileAccess={true}
                  injectedJavaScript={this.state.type == "vm" ? VM_INJECTED_JAVASCRIPT : WWW_INJECTED_JAVASCRIPT}
                  mixedContentMode={'always'}
                  onMessage={event => this.state.type == "vm" ? this.VM_getData(event.nativeEvent.data) : this.WWW_getData(event.nativeEvent.data)}
                  onError={() => this.setState({ visible: false })}
                  onHttpError={() => this.setState({ visible: false })}
                  style={{ height: 0 }}
                />
                : <></>
            }

          </View>

          <View style={styles.VIW3}>
            <View style={styles.VIW4}>
              <Text style={styles.TXT2}>Free </Text>
              <Text style={styles.TXT1}>Like & Followers</Text>
            </View>
            <View style={styles.VIW5}>
              <TextInput defaultValue={this.state.TiktokUrl} ref={tl => this.tiktok = tl} onChangeText={(URL) => this.fillBox(URL)} style={[styles.TXTINPUT, { borderWidth: this.state.borderWidth, borderColor: "red" }]} placeholder="Enter Tiktok Profile User Link" />
            </View>
            <View style={styles.VIW6}>
              <TouchableOpacity style={styles.SRCH} onPress={() => this.GetOfficialDetails()}>
                <Text style={styles.TXT3}>SEARCH</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </KeyboardAvoidingView>

    );
  }


  fillBox(URL) {
    this.setState({ TiktokUrl: URL })
    let checkURl = /^(?!\s*$).+/
    if (checkURl.test(URL)) {
      this.setState({ borderWidth: 0 })
    }
    else {
      this.setState({ borderWidth: 1 })
    }
  }


  GetOfficialDetails() {
    let checkURl = /^(?!\s*$).+/
    let url = this.state.TiktokUrl
    if (checkURl.test(url.trim())) {
      if (url.match(/www.tiktok.com/g)) {
        this.setState({ type: "www", fetchInfo: true, visible: true })
      }
      else if (url.match(/vm.tiktok.com/g) || url.match(/vt.tiktok.com/g)) {
        this.setState({ type: "vm", fetchInfo: true, visible: true })
      }
      else {
        alert("invalid Url !!")
      }
    }
    else {
      this.setState({ borderWidth: 1 })
    }
  }


  WWW_getData = async (data) => {
    let DATA = JSON.parse(data)
    let FinalData = await DATA.props.pageProps.userData
    this.CheckLogin(FinalData)
  }


  VM_getData = async (data) => {

    let obj = JSON.parse(data)
    var result = Object.keys(obj).map(function (key) {
      return [Number(key), obj[key]];
    });

    if (result[0][1].userData != undefined) {
      let FinalData = await result[0][1].userData
      this.CheckLogin(FinalData)
    }
    else {
      this.setState({ visible: false })
      alert('Invalid Url ! Please Enter Tiktok Profile Url')

    }
  }


  CheckLogin(data) {

    FinalData = data

    let param = {
      user_id: FinalData.userId,
      username: FinalData.nickName,
      profile: FinalData.coversMedium[0],
      fullname: FinalData.uniqueId,
      user_link: this.state.TiktokUrl,
      account_type: FinalData.isSecret ? "public" : "private",
      device: Platform.OS === "android" ? "android" : "ios"
    }

    Services.login(param).then(async (res) => {
      if (res.user.success == "true") {
        FinalData["Tiktok"] = this.state.TiktokUrl
        FinalData["Type"] = this.state.type
        await AsyncStorage.setItem("UserNaData", JSON.stringify(FinalData))
        await this.props.setGlobalData()
        this.props.navigation.navigate("Sidemenu")
      }
      else {
        this.setState({ visible: false, fetchInfo: false })
        alert("Error!")
      }
    })
  }


}

const mapStateToProps = (state) => {
  return {
    counter: state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setGlobalData: () => { dispatch(putLogin(JSON.stringify(FinalData))) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);



