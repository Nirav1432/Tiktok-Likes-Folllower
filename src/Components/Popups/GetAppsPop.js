import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Fonts } from '../../Utils/fonts';
import { connect } from 'react-redux'


class GetAppsPop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            getttingApps: true
        }
    }
    render() {
        return (
            <Modal isVisible={this.props.visible} animationIn="slideInRight" animationOut="slideOutRight" >
                <View style={[styles.View1, { height: hp(10), backgroundColor: "white", elevation: 5, borderRadius: hp(1.5), justifyContent: "center", alignItems: "center" }]}>
                    <View style={{ flexDirection: "row" }}>
                        <ActivityIndicator size="large" />
                        <View style={{ justifyContent: "center" }}>
                            <Text style={{ fontSize: hp(2), marginLeft: wp(3), color: "#333333", fontFamily: Fonts.LatoBlack }}>Please wait until app get installed ...</Text>
                        </View>
                    </View>
                </View>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(GetAppsPop);

const styles = StyleSheet.create({
    View1: {
        height: hp(50), width: "86%", backgroundColor: "white", alignSelf: "center"
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