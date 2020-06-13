import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../Styles/GetFollowerPopStyles'
import Modal from 'react-native-modal';
import { Icons } from '../../Utils/IconManager';

export default class RequestSuccess extends Component {
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
                        <View style={styles.VIW6}>
                            <Image source={Icons.follow} style={styles.IMG} resizeMode="contain" />
                        </View>
                        <View style={styles.VIW7}>
                            <Text style={styles.TXT1}>Follow Request</Text>
                        </View>
                    </View>
                    <View style={styles.VIW4}>
                        <Text style={styles.TXT2}>Your follower requested process{"\n"}Successfully within 48-96 hours.</Text>
                    </View>
                    <View style={styles.VIW5}>
                        <TouchableOpacity style={styles.BTNS1} onPress={() => this.props.ClosePop()}>
                            <Text style={styles.TXT3}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
}
