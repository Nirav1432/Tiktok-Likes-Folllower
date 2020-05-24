import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import styles from '../Styles/CongStyles'
import Modal from 'react-native-modal';
import { Icons } from '../../Utils/IconManager';

export default class SorryPop extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Modal isVisible={this.props.visible} animationIn="slideInRight" animationOut="slideOutRight" >

                <View style={styles.VIW2}>
                    <View style={styles.VIWX}>
                        <View style={styles.VIW3}>
                            <View style={styles.VIW6}>
                                <Image source={Icons.sad} style={styles.IMG} resizeMode="contain" />
                            </View>
                            <View style={styles.VIW7}>
                                <Text style={[styles.TXT1,{color: "#7C7A7A"}]}>Sorry!</Text>
                            </View>
                        </View>
                        <View style={styles.VIW4}>
                            <Text style={[styles.TXT2,{color: "#7C7A7A"}]}>Failed! Without Any Actions You Can't{"\n"}Earn New Diamonds</Text>
                        </View>
                        <View style={styles.VIW5}>
                            <TouchableOpacity style={styles.BTNS1} onPress={() => this.props.ClosePop()}>
                                <Text style={styles.TXT3}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </Modal>
        );
    }
}
