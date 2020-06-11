import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import { puMaxCount, putcount, shoeAds } from '../ReduxConfig/Actions/AddCount/AddCount';
import { connect } from 'react-redux'

class PrivacyAndPolicy extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    showAdd=()=>{
        if (this.props.Data.adsCounter == this.props.Data.maxAdsCounter) {
            setTimeout(async () => {
                await this.props.showAds()
                await this.props.putCouter(0)
            }, 700)
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor="#363F46" />
                <WebView
                    source={{ uri: "https://sites.google.com/view/like-follower-privacy-policy/home" }}
                    onLoad={()=>this.showAdd()}
                />
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
      Data: state.LoginData
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
      setCoins: (coins) => dispatch(setDiamonds(coins)),
      setGlobalData: (data) => { dispatch(putLogin(JSON.stringify(data))) },
      putCouter: (cnt) => dispatch(putcount(cnt)),
      showAds: () => dispatch(shoeAds())
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(PrivacyAndPolicy);
