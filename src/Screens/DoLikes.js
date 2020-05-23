import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Linking } from 'react-native';
import styles from './styles/DoLikesStyles';
import { Icons } from "../Utils/IconManager";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from '../Components/Header';
import { setDiamonds } from '../ReduxConfig/Actions/Login/LoginActions';
import { connect } from 'react-redux'
import { Services } from '../Configurations/Api/Connections'
import Preloader from '../Components/Preloader';
import { NavigationEvents } from 'react-navigation';

class DoLikes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DatafromServer: [],
            visible: true,
            isPressed: false
        };
    }

    componentDidMount() {      
        let id = this.props.Data.CommonData.userId
        this.getData(id)
    }   

    getData(id) {
        Services.LikeList(id).then(res => {
            if (res.success == "true") {
                this.setState({ DatafromServer: res.like_image })
                this.setState({ visible: false })
            }
            else {
                alert('No Data Found !!')
                this.setState({ visible: false })
            }
        }).catch((err) => {
            this.setState({ visible: false })
        })

    }

    GotoTikTok = () => {

    }

    render() {
        return (
            <View style={styles.MAINVIW}>
                
                <Preloader isLodaer={this.state.visible} />
                <Header title={"Do Likes"} backPress={() => this.props.navigation.goBack()} />

                <NavigationEvents
                //  onDidFocus={()=>alert('Yes')}
                />
              
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={this.state.DatafromServer}
                        renderItem={({ item, index }) => (
                            <View style={styles.VIW1}>
                                <Image source={{ uri: item.video_thumb }} style={styles.IMG} resizeMode="cover" />
                                <TouchableOpacity style={styles.BTN} onPress={() => Linking.openURL(item.video_link)}>
                                    <View style={styles.VIW2}>
                                        <View style={[styles.VIW4, { bottom: hp(0.2) }]}>
                                            <Text style={styles.TXT}>+</Text>
                                        </View>
                                        <View style={styles.VIW4}>
                                            <Image source={Icons.premium_quality} style={styles.IMG2} resizeMode="contain" />
                                        </View>
                                        <View style={styles.VIW4}>
                                            <Text style={styles.TXT2}>5</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity style={styles.VIW3}>
                                        <Image style={styles.IMG3} source={Icons.right} resizeMode="contain" />
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            </View>
                        )}
                        numColumns={3}
                        style={{
                            flexWrap: "wrap",
                            alignSelf: this.state.DatafromServer.length < 3 ? "auto" : "center"
                        }}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <View style={styles.VIW5}>
                    <TouchableOpacity style={styles.SubmitBotton} >
                        <Text style={styles.TXT22}>NEXT</Text>
                    </TouchableOpacity>
                </View>
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
        setCoins: (coins) => dispatch(setDiamonds(coins))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoLikes);