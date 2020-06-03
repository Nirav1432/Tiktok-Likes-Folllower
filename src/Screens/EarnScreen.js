import React, { Component } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity, TouchableHighlight, AsyncStorage, BackHandler } from 'react-native';
import styles from './styles/HomeScreenStyles'
import { Icons } from '../Utils/IconManager';
import Header from '../Components/Header'


export default class EarnScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{flex:1,backgroundColor: "#E9ECF2"}}>
                <Header title={"Earn"} backPress={() => this.props.navigation.goBack()} coin={0} />
                <View style={styles.VIW33}>
                    <View style={styles.VIW12}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("watchVideoButton")}>
                            {/* <TouchableOpacity onPress={() => this.props.navigation.navigate("Follower", { data: OtherData.follower_coin })}> */}
                            <Image style={styles.IMG4} source={Icons.Video1} />
                            <Text style={styles.TXT5}>Watch Video</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.VIW12}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("ScratchAndWin")}>
                            <Image style={styles.IMG4} source={Icons.Scatch} />
                            <Text style={styles.TXT5}>Scratch & Win</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.VIW12}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("DoLikes")}>
                            <Image style={styles.IMG4} source={Icons.Like} />
                            <Text style={styles.TXT5}>Do Likes</Text>
                        </TouchableOpacity>

                    </View>
                </View>


                <View style={styles.VIW33}>
                    <View style={styles.VIW12}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("DoFollowing")}>
                            <Image style={styles.IMG4} source={Icons.doFL} />
                            <Text style={styles.TXT5}>Do Following</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.VIW12}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("DoComments")}>
                            <Image style={styles.IMG4} source={Icons.doView} />
                            <Text style={styles.TXT5}>Do Views</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.VIW12}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("DoShare")}>
                            <Image style={styles.IMG4} source={Icons.shareHome} />
                            <Text style={styles.TXT5}>Do Share</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        );
    }
}
