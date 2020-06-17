import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity,Linking } from 'react-native';
import styles from '../Styles/NotENstyles'
import Modal from 'react-native-modal';
import { Icons } from '../../Utils/IconManager';
import { heightPercentageToDP } from 'react-native-responsive-screen';

export default class VersionUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Modal isVisible={this.props.visible} animationIn="slideInRight" animationOut="slideOutRight" >
                <View style={styles.VIW2}>
                    <View style={styles.VIW3}>                       
                        <View style={styles.VIW7}>
                            <Text style={[styles.TXT1,{fontSize:heightPercentageToDP(2)}]}>Now New Version Updated on Playstore, Please Update App !</Text>
                        </View>
                    </View>                    
                    <View style={styles.VIW5}>
                        <TouchableOpacity style={styles.BTNS1} onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.harekrishna.tikbooster')}>
                            <Text style={styles.TXT3}>Update</Text>
                        </TouchableOpacity>                     
                    </View>
                </View>
            </Modal>
        );
    }
}
