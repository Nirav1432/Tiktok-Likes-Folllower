import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, } from 'react-native';
import styles from './styles/FollowerStyles';
import { Icons } from "../Utils/IconManager";
import Header from '../Components/Header';
import { puMaxCount, putcount, shoeAds } from '../ReduxConfig/Actions/AddCount/AddCount';
import { InterstitialAdManager, AdSettings, BannerView, NativeAdsManager } from 'react-native-fbads';
import NativeAdsView from '../Screens/NativeAdsScreen'
import {connect} from 'react-redux'

let ads = new NativeAdsManager("979168055864310_981496822298100")

class Comments extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data: { follower_coin: 0 }
        };
    }
  
    render() {
        return (
            <View style={styles.MAINVIW}>
                <Header title={"View"} backPress={() => this.props.navigation.goBack()} coin={this.state.data.follower_coin} />
                <View style={styles.VIW2}>
                    <View style={styles.VIW12}>
                        <TouchableOpacity onPress={() => this.commonNavigator("GetComments")}>
                            <Image style={styles.IMG4} source={Icons.doView} />
                            <Text style={styles.TXT55}>Get Views</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.VIW12}>
                        <TouchableOpacity onPress={() => this.commonNavigator("CommentList")}>
                            <Image style={styles.IMG4} source={Icons.ViewList} />
                            <Text style={styles.TXT55}>Views List</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <NativeAdsView adsManager={ads} />
                </View>
            </View>
        );
    }
    commonNavigator = async (Type) => {
        if (this.props.Data.adsCounter == this.props.Data.maxAdsCounter) {
            this.props.navigation.navigate(Type)
        }
        else {
            let cnt = this.props.Data.adsCounter
            cnt++;
            this.props.putCouter(cnt)
            this.props.navigation.navigate(Type)
        }
        
    }
}
const mapStateToProps = (state) => {
    return {
        Data: state.LoginData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        putCouter: (cnt) => dispatch(putcount(cnt)),
        showAds: () => dispatch(shoeAds())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);