import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './Styles/SidemenuStyle'
import { Icons } from '../Utils/IconManager'
import { withNavigation } from 'react-navigation'
import Preloader from './Preloader';
import { connect } from 'react-redux'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { WebView } from 'react-native-webview';

const WWW_INJECTED_JAVASCRIPT = 'window.ReactNativeWebView.postMessage(document.getElementById("__NEXT_DATA__").innerHTML)'

class Sidemenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Refresh: false,
            ProfileUrl: "",
            visible: false
        };
    }

    async componentDidMount() {
        await this.setState({ ProfileUrl: this.props.Data.CommonData.Tiktok })
    }

    render() {
        return (
            <View style={styles.MAINVIW}>
                <StatusBar backgroundColor="#FE2C55" />
                <Preloader isLoader={this.state.visible} />
                {
                    this.state.Refresh ?
                        <View style={{ height: hp(0) }}>
                            <WebView
                                source={{ uri: this.state.ProfileUrl }}
                                javaScriptEnabled={true}
                                allowUniversalAccessFromFileURLs={true}
                                allowFileAccess={true}
                                injectedJavaScript={WWW_INJECTED_JAVASCRIPT}
                                mixedContentMode={'always'}
                                onMessage={event => this.GetNewData(event.nativeEvent.data)}
                                onError={() => this.setState({ visible: false })}
                                onHttpError={() => this.setState({ visible: false })}
                                style={{ height: 0 }}
                            />
                        </View>
                        :
                        <></>
                }
                <View style={styles.InnerView1}>
                    <Image source={Icons.AppIcon} style={styles.IMG1} resizeMode="contain" />
                </View>
                <View style={styles.InnerView2}>
                    <TouchableOpacity style={styles.CMNVIW} onPress={() => this.props.navigation.navigate('ContactUs')}>
                        <View style={styles.VIW1}>
                            <Image source={Icons.contact} style={styles.CMNIMG} resizeMode="contain" />
                        </View>
                        <View style={styles.VIW2}>
                            <Text style={styles.CMNTXT}>Contact us</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.CMNVIW}>
                        <View style={styles.VIW1}>
                            <Image source={Icons.lock} style={styles.CMNIMG} resizeMode="contain" />
                        </View>
                        <View style={styles.VIW2}>
                            <Text style={styles.CMNTXT}>Privacy</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.CMNVIW} onPress={() => this.props.navigation.navigate('ShareAndRate')}>
                        <View style={styles.VIW1}>
                            <Image source={Icons.star} style={styles.CMNIMG} resizeMode="contain" />
                        </View>
                        <View style={styles.VIW2}>
                            <Text style={styles.CMNTXT}>Rate App</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.CMNVIW}>
                        <View style={styles.VIW1}>
                            <Image source={Icons.ShareIcon} style={styles.CMNIMG} resizeMode="contain" />
                        </View>
                        <View style={styles.VIW2}>
                            <Text style={styles.CMNTXT}>Share App</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.CMNVIW} onPress={() => this.onRefreshPressed()}>
                        <View style={styles.VIW1}>
                            <Image source={Icons.refresh} style={styles.CMNIMG} resizeMode="contain" />
                        </View>
                        <View style={styles.VIW2}>
                            <Text style={styles.CMNTXT}>Refresh</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.CMNVIW} onPress={() => this.onLogoutPress()}>
                        <View style={styles.VIW1}>
                            <Image source={Icons.logout} style={styles.CMNIMG} resizeMode="contain" />
                        </View>
                        <View style={styles.VIW2}>
                            <Text style={styles.CMNTXT}>Logout</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    async onLogoutPress() {
        await AsyncStorage.removeItem("UserNaData")
        this.props.navigation.navigate("Login")
    }

    async GetNewData(DA) {
      //  let DATA = JSON.parse(DA)
        // console.log(DATA)
        await this.setState({ visible: false, Refresh: false })
    }

    async onRefreshPressed() {
        await this.setState({ Refresh: true, visible: true })
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Sidemenu));