import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import styles from './styles/watchTimerStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP } from 'react-native-responsive-screen';
import Header from '../Components/Header';
import { Icons } from '../Utils/IconManager';
import { puMaxCount, putcount, shoeAds } from '../ReduxConfig/Actions/AddCount/AddCount';
import { InterstitialAdManager, AdSettings, BannerView, NativeAdsManager } from 'react-native-fbads';
import NativeAdsView from '../Screens/NativeAdsScreen'
import { connect } from 'react-redux'
import { Services } from '../Configurations/Api/Connections';
import Congratulations from '../Components/Popups/Congratulations';
import Preloader from '../Components/Preloader';
import { setDiamonds } from '../ReduxConfig/Actions/Login/LoginActions';
import Modal from 'react-native-modal';
import { Fonts } from '../Utils/fonts'


let months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

let Interval = null;

class watchVideoButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: { follower_coin: 0 },
            congo: false,
            Coins: 0,
            time: 'Loading...',
            Preloader: false,
            displayButton: false
        };
    }

    componentDidMount() {

        this.getTime()

        // if (this.props.Data.adsCounter == this.props.Data.maxAdsCounter) {
        //     setTimeout(async () => {
        //         await this.props.showAds()
        //         await this.props.putCouter(0)
        //     }, 300)
        // }
    }

    componentWillUnmount() {
        clearInterval(Interval)
    }

    getTime = () => {
        Services.setting({ user_id: this.props.Data.CommonData.userId }).then((res) => {
            if (res.setting.success == "true") {
                if (res.setting.user_video == "true") { 
                    let Time=res.setting.current_time                   
                    let Min=parseInt(Time.substr(0, Time.indexOf(':')))
                    let sec=parseInt(Time.substr(Time.indexOf(':') + 1, 2))
                    let finaltime=Min+(sec/60)
                    let timer=finaltime*60
                    this.startTime(timer)
                    this.setState({ displayButton: true })
                }
                else {
                    this.setState({ displayButton: false })
                }
            }
        })
    }

    showAdd() {
        this.setState({ showloader: true })
        InterstitialAdManager.showAd("979168055864310_979168595864256")
            .then((didClick) => {

                this.setState({ Preloader: true, showloader: false })

                var date = new Date()

                let Month = date.getMonth()
                let day = date.getDate().toString().length == 1 ? '0' + date.getDate() : date.getDate()
                let Hour = date.getHours.toString().length == 1 ? '0' + date.getHours() : date.getHours()
                var Minutes = date.getMinutes().toString().length == 1 ? '0' + date.getMinutes() : date.getMinutes()
                let sec = date.getSeconds().toString().length == 1 ? '0' + date.getSeconds() : date.getSeconds()

                let Fulldate = date.getFullYear() + "-" + months[Month] + "-" + day + " " + Hour + ":" + Minutes + ":" + sec

                let data = {
                    user_id: this.props.Data.CommonData.userId,
                    full_name: this.props.Data.CommonData.nickName,
                    time: Fulldate
                }

                Services.userVideo(data).then(res => {
                    if (res.success == "true") {
                        this.setState({ Preloader: false, Coins: res.coin, displayButton: true })
                        this.props.setCoins(res.coin)                     
                        let Time = res.time                  
                        let Min=parseInt(Time.substr(0, Time.indexOf(':')))
                        let sec=parseInt(Time.substr(Time.indexOf(':') + 1, 2))
                        let finaltime=Min+(sec/60)
                        let timer=finaltime*60
                        this.startTime(timer)
                        setTimeout(() => this.setState({ congo: true }), 500)
                    }
                    else
                        alert('Something went wrong !!')
                })

            })
            .catch(error => {

            });
    }


    render() {
        return (
            <View style={styles.MAINVIW}>
                <Header title={"Watch Video"} backPress={() => this.props.navigation.goBack()} coin={this.state.data.follower_coin} />
                <Preloader isLoader={this.state.Preloader} />
                {this.state.showloader ?
                    <Modal style={{ zIndex: 1000 }} isVisible={this.state.showloader} animationIn="slideInRight" animationOut="slideOutRight" >
                        <View style={{ flexDirection: "row", zIndex: 1500, width: "90%", alignSelf: "center", backgroundColor: "white", height: heightPercentageToDP(10) }}>
                            <View style={{ width: "20%", justifyContent: "center", alignItems: "center", height: "100%" }}>
                                <ActivityIndicator size={"large"} color="black" />
                            </View>
                            <View style={{ width: "80%", height: "100%", justifyContent: "center", alignItems: "flex-start" }}>
                                <Text style={{ fontSize: heightPercentageToDP(2), color: "black", fontFamily: Fonts.LatoBold }}>Showing Ads</Text>
                            </View>
                        </View>
                    </Modal>
                    :
                    <></>
                }
                <Congratulations
                    visible={this.state.congo}
                    coins={10}
                    ClosePop={() => this.setState({ congo: false })}
                />
                <View>
                    <Text style={styles.TXT1}>Get More Diamonds</Text>
                    <Text style={styles.TXT2}>Get an extra diamonds every time{"\n"}when you click on below butoon.</Text>
                    {
                        this.state.displayButton ?
                            <TouchableOpacity style={styles.Timer} >
                                <View style={styles.watchView}>
                                    <Image source={Icons.watch} style={styles.watch} resizeMode="contain" />
                                </View>
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={styles.timerTExt}>{this.state.time}</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.Timer2}
                                onPress={() => this.showAdd()}
                                // onPress={() => this.startTime(1 * 60)}
                            >
                                <View style={styles.watchView2}>
                                    <Image source={Icons.whiteVideo} style={styles.IMG1} resizeMode="contain" />
                                </View>
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", left: hp(2) }}>
                                    <Text style={styles.timerTExt}>Watch Video</Text>
                                </View>
                            </TouchableOpacity>
                    }

                </View>
            </View>
        );
    }
    startTime = (timer) => {     

        this.setState({displayButton:true})
        Interval = setInterval(() => {
            let minutes = parseInt(timer / 60, 10);
            let seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            this.setState({ time: minutes + " : " + seconds })   

            if (--timer < 0) {
                clearInterval(Interval)
                this.setState({ displayButton: false })
            }

        }, 1000)


    }
}
const mapStateToProps = (state) => {
    return {
        Data: state.LoginData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        putCouter: (cnt) => dispatch(putcount(cnt)),
        showAds: () => dispatch(shoeAds()),
        setCoins: (coins) => dispatch(setDiamonds(coins)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(watchVideoButton);