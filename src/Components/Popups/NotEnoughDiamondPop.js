import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../Styles/NotENstyles'
import Modal from 'react-native-modal';
import { Icons } from '../../Utils/IconManager';

export default class NotEnoughDiamondPop extends Component {
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
                            <Text style={styles.TXT1}>Sorry! You Don't Have Enough Diamonds.</Text>
                        </View>
                    </View>                    
                    <View style={styles.VIW5}>
                        <TouchableOpacity style={styles.BTNS1} onPress={() => this.props.ClosePop()}>
                            <Text style={styles.TXT3}>Ok</Text>
                        </TouchableOpacity>                     
                    </View>
                </View>
            </Modal>
        );
    }
}
