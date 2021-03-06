import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import styles from './styles/ContactusStyles';
import Header from '../Components/Header';
import Preloader from '../Components/Preloader';
import { Services } from '../Configurations/Api/Connections'
import { connect } from 'react-redux'
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { puMaxCount, putcount, shoeAds, hideAds } from '../ReduxConfig/Actions/AddCount/AddCount';
import { InterstitialAdManager, AdSettings } from 'react-native-fbads';
import { custom_number_format, InterStrialAds } from '../Utils/functions'


var userid = ""
class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false, Message: "", err: false
        };
    }

    UNSAFE_componentWillMount() {
        userid = this.props.Data.CommonData.userId
    }

    render() {
        return (
            <View style={styles.MAINVIW}>
                <Preloader isLoader={this.state.visible} />
                <Header title={"Contact Us"} backPress={() => this.props.navigation.goBack()} />
                <View style={styles.VIW1}>
                    <Text style={styles.TXT1}>if you have any more questions or{"\n"}Concerns, please Contact to us</Text>
                </View>
                <TextInput ref={x => this.tx = x} style={[styles.TXTINPUT, { borderColor: "red", borderWidth: this.state.err ? 2 : 0 }]} multiline={true} placeholder="Your Message" onChangeText={(m) => this.CheckMessage(m)} />
                <View style={{ flexDirection: "row", alignSelf: "center", alignItems: "center", marginTop: heightPercentageToDP(2) }}>
                    <TouchableOpacity style={styles.SubmitBotton} onPress={() => this.sendContact()}>
                        <Text style={styles.TXT2}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.SubmitBotton, { marginLeft: heightPercentageToDP(1) }]} onPress={() => this.commonNavigator('ContactUsList')}>
                        <Text style={styles.TXT2}>My Questions</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    CheckMessage = (m) => {

        let CheckMessage = /^(?!\s*$).+/

        if (CheckMessage.test(m)) {
            this.setState({ Message: m, err: false })
        }
        else {
            this.setState({ err: true })
        }
    }

    sendContact = () => {

        let CheckMessage = /^(?!\s*$).+/

        if (CheckMessage.test(this.state.Message)) {
            this.setState({ visible: true, err: false, })
            let Data = { user_id: userid, message: this.state.Message }
            Services.AddContactUS(Data).then((res) => {
                if (res.success) {
                    this.setState({ visible: false, Message: "" })
                    this.tx.clear()
                    this.props.navigation.navigate('ContactUsList')
                }
            })
        }
        else {
            this.setState({ err: true })
        }

    }

    commonNavigator = async (Type) => {
        this.tx.clear()
        this.setState({Message:""})
        if (this.props.Data.adsCounter == this.props.Data.maxAdsCounter) {

            await this.props.showAds()

            setTimeout(async () => {
                let adsResult = await InterStrialAds(this.props.Data.InterStrialId)
                this.props.hideAds()
                await this.props.putCouter(0)
                this.props.navigation.navigate('ContactUsList')
            }, 3000)

        }
        else {
            let cnt = this.props.Data.adsCounter
            cnt++;
            await this.props.putCouter(cnt)
            this.props.navigation.navigate('ContactUsList')
        }

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
        setGlobalData: (data) => { dispatch(putLogin(JSON.stringify(data))) },
        putCouter: (cnt) => dispatch(putcount(cnt)),
        showAds: () => dispatch(shoeAds()),
        hideAds: () => dispatch(hideAds()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);