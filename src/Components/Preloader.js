import React, { Component } from 'react'
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native'
import Modal from "react-native-modal";


export default class Preloader extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Modal isVisible={this.props.isLoader} animationIn={"pulse"} animationOut={"pulse"}>
                <View style={styles.VIW2}>
                    <ActivityIndicator size="large" color="white" />
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    VIW2: { justifyContent: 'center', alignItems: 'center' }
})