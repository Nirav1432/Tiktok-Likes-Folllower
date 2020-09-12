import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import Modal from 'react-native-modal';
import { Icons } from '../../Utils/IconManager';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Fonts } from '../../Utils/fonts';
import { InterstitialAdManager, AdSettings } from 'react-native-fbads';
import { connect } from 'react-redux'
import { puMaxCount, putcount, shoeAds, hideAds } from '../../ReduxConfig/Actions/AddCount/AddCount';


let seconds = 0;


class AdsPopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            note: "",
            cardId: 0
        }
    }

    componentWillReceiveProps() {
        if (this.props.data != null)
            this.setState({ cardId: this.props.data.scratche_id, note: this.props.data.note })
    }

    render() {
        return (
            <Modal isVisible={this.props.visible} animationIn="slideInRight" animationOut="slideOutRight" >
                <View style={styles.View1}>
                    <TouchableOpacity activeOpacity={0.7} style={styles.btn} onPress={() => this.props.simpleClose()}>
                        <Image source={Icons.close} style={styles.img} />
                    </TouchableOpacity>
                    <View style={styles.View2}>
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <Text style={styles.Text2}>
                                {
                                    this.state.note
                                }
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => this.InterStrialAds(this.props.Data.InterStrialId)} activeOpacity={0.7} style={styles.btn2} >
                            <Text style={styles.Text1}>Install</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }

    InterStrialAds = async (id) => {

        // Linking.openURL('https://play.google.com/store/apps/details?id=com.harekrishna.tikbooster')

        await this.props.showAds()

        setTimeout(async () => {
            await InterstitialAdManager.showAd(id)
                .then(async (didClick) => {
                    await this.props.hideAds()
                    if (didClick == true) {
                        // this.props.ClosePop()
                    }
                    else {
                        alert('Please click on install button and and install the app, for getting the diamonds')
                    }
                })
                .catch(error => {
                    this.props.hideAds()
                    console.log(error)
                });
        }, 3000)




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
        showAds: () => dispatch(shoeAds()),
        hideAds: () => dispatch(hideAds()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdsPopup);

const styles = StyleSheet.create({
    View1: {
        minHeight: hp(60), width: "95%", backgroundColor: "white", alignSelf: "center"
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
        fontSize: hp(2.4),
        color: '#333333',
        textAlign: "center",
        width: "92%",
        alignSelf: "center",
        marginTop: hp(1),
        fontFamily: Fonts.LatoBold,
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