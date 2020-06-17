import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import styles from '../Styles/CongStyles'
import Modal from 'react-native-modal';
import { Icons } from '../../Utils/IconManager';
import { withNavigation } from 'react-navigation';

class Congratulations extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    ClosePop(){
        this.props.ClosePop()
        this.props.navigation.navigate('ShareAndRate')
    }

    render() {
        return (
            <Modal isVisible={this.props.visible} animationIn="slideInRight" animationOut="slideOutRight" >

                <View style={styles.VIW2}>
                    <ImageBackground source={require('../../Icons/Cong.gif')} resizeMode="cover" style={{ height: "100%", width: "100%" }}>
                        <View style={styles.VIWX}>
                            <View style={styles.VIW3}>
                                <View style={styles.VIW6}>
                                    <Image source={Icons.polo} style={styles.IMG} resizeMode="contain" />
                                </View>
                                <View style={styles.VIW7}>
                                    <Text style={styles.TXT1}>{this.props.coins}</Text>
                                </View>
                            </View>
                            <View style={styles.VIW4}>
                                <Text style={styles.TXT2}>Congratulation! You Have Earned{"\n"}New Diamonds</Text>
                            </View>
                            <View style={styles.VIW5}>
                                <TouchableOpacity style={styles.BTNS1} onPress={() => this.ClosePop()}>
                                    <Text style={styles.TXT3}>Thankyou</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ImageBackground>
                </View>

            </Modal>
        );
    }
}

export default withNavigation(Congratulations)