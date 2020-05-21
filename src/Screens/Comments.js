import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, } from 'react-native';
import styles from './styles/FollowerStyles';
import { Icons } from "../Utils/IconManager";
import Header from '../Components/Header';

export default class Comments extends Component {
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
                <Header title={"Comments"} backPress={() => this.props.navigation.goBack()} coin={this.state.data.follower_coin} />
                <View style={styles.VIW2}>
                    <View style={styles.VIW12}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("GetComments")}>
                            <Image style={styles.IMG4} source={Icons.comment} />
                            <Text style={styles.TXT55}>Get Comments</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.VIW12}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("CommentList")}>
                            <Image style={styles.IMG4} source={Icons.CommentList} />
                            <Text style={styles.TXT55}>Comments List</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
