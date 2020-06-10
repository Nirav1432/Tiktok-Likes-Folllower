import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';

export default class PrivacyAndPolicy extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor="#363F46"/>
                <WebView
                    source={{ uri: "https://sites.google.com/view/like-follower-privacy-policy/home" }}
                />
            </View>
        );
    }
}
