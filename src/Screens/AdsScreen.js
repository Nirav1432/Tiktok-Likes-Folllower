import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { InterstitialAdManager, AdSettings } from 'react-native-fbads';

export default class AdsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        AdSettings.addTestDevice(AdSettings.currentDeviceHash)
        this.showAdd()
    }

    showAdd = () => {
        InterstitialAdManager.showAd("979168055864310_979168595864256")
            .then(didClick => this.props.closeAdd())
            .catch(error => console.log(error));
    }

    render() {
        return (
            <View>
                <Text>{null}</Text>
            </View>
        );
    }
}
