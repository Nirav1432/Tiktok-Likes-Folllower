import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './Styles/SidemenuStyle'
import { Icons } from '../Utils/IconManager'
import { withNavigation } from 'react-navigation'

class Sidemenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.MAINVIW}>
                <StatusBar backgroundColor="#FE2C55" />
                <View style={styles.InnerView1}>
                    <Image source={Icons.AppIcon} style={styles.IMG1} resizeMode="contain" />
                </View>
                <View style={styles.InnerView2}>
                    <TouchableOpacity style={styles.CMNVIW} onPress={()=>this.props.navigation.navigate('ContactUs')}>
                        <View style={styles.VIW1}>
                            <Image source={Icons.contact} style={styles.CMNIMG} resizeMode="contain" />
                        </View>
                        <View style={styles.VIW2}>
                            <Text style={styles.CMNTXT}>Contact us</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.CMNVIW}>
                        <View style={styles.VIW1}>
                            <Image source={Icons.lock} style={styles.CMNIMG} resizeMode="contain" />
                        </View>
                        <View style={styles.VIW2}>
                            <Text style={styles.CMNTXT}>Privacy</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.CMNVIW} onPress={()=>this.props.navigation.navigate('ShareAndRate')}>
                        <View style={styles.VIW1}>
                            <Image source={Icons.star} style={styles.CMNIMG} resizeMode="contain" />
                        </View>
                        <View style={styles.VIW2}>
                            <Text style={styles.CMNTXT}>Rate App</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.CMNVIW}>
                        <View style={styles.VIW1}>
                            <Image source={Icons.ShareIcon} style={styles.CMNIMG} resizeMode="contain" />
                        </View>
                        <View style={styles.VIW2}>
                            <Text style={styles.CMNTXT}>Share App</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.CMNVIW}>
                        <View style={styles.VIW1}>
                            <Image source={Icons.refresh} style={styles.CMNIMG} resizeMode="contain" />
                        </View>
                        <View style={styles.VIW2}>
                            <Text style={styles.CMNTXT}>Refresh</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.CMNVIW} onPress={() => this.onLogoutPress()}>
                        <View style={styles.VIW1}>
                            <Image source={Icons.logout} style={styles.CMNIMG} resizeMode="contain" />
                        </View>
                        <View style={styles.VIW2}>
                            <Text style={styles.CMNTXT}>Logout</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    async onLogoutPress() {
        await AsyncStorage.removeItem("UserNaData")
        this.props.navigation.navigate("Login")    
    }
}

export default withNavigation(Sidemenu)