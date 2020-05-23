import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, } from 'react-native';
import styles from './styles/FollowerStyles';
import { Icons } from "../Utils/IconManager";
import Header from '../Components/Header';

export default class Likes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: { follower_coin: 0 }
        };
    }
 
    render() {
        return (
            <View style={styles.MAINVIW}>
                <Header title={"Like"} backPress={() => this.props.navigation.goBack()} coin={this.state.data.follower_coin} />
                <View style={styles.VIW2}>
                    <View style={styles.VIW12}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("GetLikes")}>
                            <Image style={styles.IMG4} source={Icons.Like} />
                            <Text style={styles.TXT55}>Get Likes</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.VIW12}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("LikesList")}>
                            <Image style={styles.IMG4} source={Icons.Like_List} />
                            <Text style={styles.TXT55}>Likes List</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
