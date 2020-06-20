import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar, Platform } from 'react-native';
import styles from './Styles/HeaderStyles';
import { Icons } from '../Utils/IconManager';
import { SafeAreaView, SafeAreaConsumer } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { custom_number_format } from '../Utils/functions';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {

        return (

            <>
                {
                    Platform.OS === "ios" ?
                        <SafeAreaConsumer>
                            {insets => <View style={{ paddingTop: 10, backgroundColor: '#FE2C55' }} />}
                        </SafeAreaConsumer>
                        :
                        <></>
                }
                <View style={styles.VIW1} >
                    <View style={styles.VIW7}>
                        <TouchableOpacity onPress={() => this.props.backPress()} style={styles.INGBTN}>
                            <Image source={Icons.Back} style={styles.IMG2} resizeMode="contain" />
                        </TouchableOpacity>
                        <View style={styles.Title}>
                            <Text style={styles.TXT5}>{this.props.title}</Text>
                        </View>
                    </View>

                    <View style={styles.VIW9}>
                        <View style={styles.VIW10}>
                            <Image source={Icons.premium_quality} style={styles.IMG3} resizeMode="contain" />
                        </View>
                        <View style={styles.VIW11}>
                            <Text style={styles.TXT4}>{custom_number_format(this.props.Data.coins)}</Text>
                        </View>
                    </View>
                </View>
            </>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        Data: state.LoginData
    };
}
export default connect(mapStateToProps)(Header);