import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles/watchTimerStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from '../Components/Header';
import { Icons } from '../Utils/IconManager';


export default class watchVideoButton extends Component {
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
                    <TouchableOpacity style={styles.Timer2} onPress={()=>this.props.navigation.navigate('WatchVideoTimer')}>
                        <View style={styles.watchView2}>
                            <Image source={Icons.whiteVideo} style={styles.IMG1} resizeMode="contain" />
                        </View>
                        <View style={{flex:1,justifyContent:"center",alignItems:"center",left:hp(2)}}>
                            <Text style={styles.timerTExt}>Watch Video</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
