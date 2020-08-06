import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import { Icons } from '../../Utils/IconManager';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Fonts } from '../../Utils/fonts';
import { InterstitialAdManager, AdSettings } from 'react-native-fbads';
import { connect } from 'react-redux'
import RNAndroidInstalledApps from 'react-native-android-installed-apps';
import BackgroundTimer from 'react-native-background-timer';
import AppStateListener from "react-native-appstate-listener";

let before = 5000

class WaitingAppInstallTwo extends Component {
    constructor(props) {
        super(props)
        this.state = {       
        }
    }

    async componentDidMount() {
        this.onBackground()
    }

    getAppsCount = async () => {
        await RNAndroidInstalledApps.getNonSystemApps()
            .then(apps => {            
                let after = apps.length
                console.log('before--->', before)
                console.log('after--->', after)
                if (after > before) {
                    before=after
                    this.props.appisInstalled()
                }
            })
            .catch(error => {
                alert(error);
            });
    }

    onActive = async () => {
        this.getAppsCount()
    }

    onBackground = async () => {
        await RNAndroidInstalledApps.getNonSystemApps()
            .then(apps => {        
                before = apps.length
            })
            .catch(error => {
                alert(error);
            });
    }


    render() {
        return (
            <AppStateListener
                onActive={() => this.onActive()}
            />
        )
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WaitingAppInstallTwo);

const styles = StyleSheet.create({
    View1: {
        height: hp(50), width: "80%", backgroundColor: "white", alignSelf: "center"
    },
    View2: {
        flex: 1
    },
    Text1: {
        fontSize: hp(2.5),
        color: "white",
        fontFamily: Fonts.LatoBlack
    },
    Text2: {
        fontSize: hp(2.5),
        color: '#333333',
        width: "90%",
        alignSelf: "center",
        fontFamily: Fonts.LatoBlack,
        lineHeight: hp(3.6)
    },
    img: {
        height: hp(3.3), width: hp(3.3)
    },
    btn: {
        alignSelf: "center",
        position: "absolute",
        height: hp(6.5),
        width: hp(6.5),
        top: hp(-3.25),
        borderRadius: hp(100),
        backgroundColor: "#FE2C55",
        justifyContent: "center",
        alignItems: "center"
    },
    btn2: {
        height: hp(6.5),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FE2C55",
        marginHorizontal: hp(2),
        elevation: 5,
        marginBottom: hp(2),
        borderRadius: hp(1),
    }
})