import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { Fonts } from "../Utils/fonts";
import { Services } from '../Configurations/Api/Connections';
import AsyncStorage from '@react-native-community/async-storage';


export default class OnetimeLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tik: ""
        };
    }

    async  UNSAFE_componentWillMount() {

        let Alldata = this.props.navigation.getParam('Alldata', null)
        await this.setState({ tik: Alldata.Tik })
        this.CheckLogin(Alldata.data)
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#FE2C55" }}>
                <StatusBar backgroundColor="#FE2C55" />
                {/* <Image source={require('../Icons/Load.gif')} style={{height:50,width:50}} resizeMode="contain"/> */}
                <Text style={{ color: "white", fontSize: 20, fontFamily: Fonts.LatoBold }}>Please wait......</Text>
            </View>
        );
    }

    CheckLogin(data) {

        let FinalData = data

        let param = {
            user_id: FinalData.userId,
            username: FinalData.nickName,
            profile: FinalData.coversMedium[0],
            fullname: FinalData.uniqueId,
            user_link: this.state.tik,
            account_type: FinalData.isSecret ? "public" : "private",
            device: Platform.OS === "android" ? "android" : "ios"
        }


        Services.login(param).then(async (res) => {
            if (res.user.success == "true") {
                FinalData["Coins"] = res.user
                await AsyncStorage.setItem("UserNaData", JSON.stringify(FinalData))
                this.props.navigation.navigate("Sidemenu")
            }
            else {
                this.setState({ visible: false, fetchInfo: false })
                alert("Error!")
            }
        })
    }

}
