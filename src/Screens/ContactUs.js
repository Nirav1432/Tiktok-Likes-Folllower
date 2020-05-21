import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image,TextInput } from 'react-native';
import styles from './styles/ContactusStyles';
import Header from '../Components/Header';

export default class Follower extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: { follower_coin: 0 }
        };
    }
    render() {
        return (
            <View style={styles.MAINVIW}>
                <Header title={"Contact Us"} backPress={() => this.props.navigation.goBack()} coin={this.state.data.follower_coin} />
                <View style={styles.VIW1}> 
                    <Text style={styles.TXT1}>if you have any more questions or{"\n"}Concerns, please Contact to us</Text>
                </View>
                <TextInput style={styles.TXTINPUT} multiline={true} placeholder="Your Message" />
                <TouchableOpacity style={styles.SubmitBotton} onPress={()=>this.props.navigation.navigate('ContactUsList')}>
                    <Text style={styles.TXT2}>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
