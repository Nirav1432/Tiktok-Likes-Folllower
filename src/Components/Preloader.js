import React, { Component } from 'react'
import { Text, View, ActivityIndicator, StyleSheet, Image } from 'react-native'
import Modal from "react-native-modal";
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';


export default class Preloader extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Modal isVisible={this.props.isLoader} animationIn={"pulse"} animationOut={"pulse"}>
                <View style={styles.VIW2}>
                    <WaveIndicator color='#FE2C55' size={100}/>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    VIW2: { justifyContent: 'center', alignItems: 'center' }
})