import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, } from 'react-native';
import styles from './styles/FollowerStyles';
import { Icons } from "../Utils/IconManager";
import Header from '../Components/Header';

export default class Follower extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: { follower_coin: 0 }
        };
    }
    UNSAFE_componentWillMount() {
      //  this.setState({ data: this.props.navigation.getParam('data') })
    }
    render() {
        return (
            <View style={styles.MAINVIW}>
                <Header title={"Follower"} backPress={() => this.props.navigation.goBack()} coin={this.state.data.follower_coin} />
                <View style={styles.VIW2}>
                    <View style={styles.VIW12}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("GetFollower")}>
                            <Image style={styles.IMG4} source={Icons.get_follower} />
                            <Text style={styles.TXT55}>Get Followers</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.VIW12}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("FollowerList")}>
                            <Image style={styles.IMG4} source={Icons.follower_list} />
                            <Text style={styles.TXT55}>Followers List</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
