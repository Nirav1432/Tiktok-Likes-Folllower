import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles/watchTimerStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from '../Components/Header';
import { Icons } from '../Utils/IconManager';


export default class PurchaseCoinsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: { follower_coin: 0 }
        };
    }

    render() {
        return (
            <View style={styles.MAINVIW}>
                <Header title={"Watch Video"} backPress={() => this.props.navigation.goBack()} coin={this.state.data.follower_coin} />
                <View>
                    <Text style={styles.TXT1}>Get More Diamonds</Text>
                    <Text style={styles.TXT2}>Get an extra diamonds every time{"\n"}when you click on below butoon.</Text>
                    <TouchableOpacity style={styles.Timer} >
                        <View style={styles.watchView}>
                            <Image source={Icons.watch} style={styles.watch} resizeMode="contain" />
                        </View>
                        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                            <Text style={styles.timerTExt}>01:59</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
