import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, } from 'react-native';
import styles from './styles/ShareAndRateStyles';
import { Icons } from "../Utils/IconManager";
import Header from '../Components/Header';
import Share from 'react-native-share';
import Rate, { AndroidMarket } from 'react-native-rate'

const AndroidRate = {
    GooglePackageName: "com.harekrishna.tikbooster",
    preferredAndroidMarket: AndroidMarket.Google,
    preferInApp: false,
    openAppStoreIfInAppFails: true,
}

export default class ShareAndRate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: { follower_coin: 0 }
        };
    }



    shareMyapp = () => {
        let options = {
            url: "https://play.google.com/store/apps/details?id=com.harekrishna.tikbooster"
        }
        Share.open(options)
            .then((res) => { console.log(res) })
            .catch((err) => { err && console.log(err); });
    }

    rateMyapp = () => {
        Rate.rate(AndroidRate, success => {
          console.log(success)
        })
    }

    render() {
        return (
            <View style={styles.MAINVIW}>
                <Header title={"Share & Rate App"} backPress={() => this.props.navigation.goBack()} coin={this.state.data.follower_coin} />
                <View style={styles.VIW1}>
                    <Image source={Icons.mobile} style={styles.IMG} resizeMode="contain" />
                    <Text style={styles.TXT}>Your Request Proceed Added Successfully. You will get it very soon. please give reviewto support us.</Text>
                    <View style={styles.ButtonView}>
                        <View style={styles.VIW2}>
                            <TouchableOpacity style={styles.Button} onPress={() => this.shareMyapp()}>
                                <Text style={styles.TXT3}>Share App</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.VIW2}>
                            <TouchableOpacity style={styles.Button} onPress={()=>this.rateMyapp()}>
                                <Text style={styles.TXT3}>Rate App</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={styles.Thankyou}>Thank you!</Text>
                    <Text style={styles.LastTXT}>Do not remove this app to get more{"\n"}fans,heart,comments,and share</Text>
                </View>
            </View>
        );
    }
}
