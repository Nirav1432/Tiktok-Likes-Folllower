import React, { Component } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Linking } from 'react-native';
import Header from '../Components/Header';
import { heightPercentageToDP as hp, heightPercentageToDP } from 'react-native-responsive-screen';
import styles from "./styles/FollowersListStyles";
import { connect } from 'react-redux'
import { Services } from '../Configurations/Api/Connections';
import Preloader from '../Components/Preloader';

class FollowerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            daFromS: [],
            visible: true
        };
    }
    componentDidMount() {
        let id = this.props.Data.CommonData.userId
        this.getFollowerList(id)
    }

    getFollowerList = (id) => {
        Services.FollowerList(id).then((res) => {
            if (res.success == "true") {
                this.setState({ daFromS: res.following, visible: false })
            }
            else {
                this.setState({ visible: false, daFromS: [] })
            }
        })
    }

    visitProfile = (url) => {
        Linking.openURL(url)
    }

    render() {
        return (
            <View styles={styles.MAINVIW}>
                <Header title={"Followers List"} backPress={() => this.props.navigation.goBack()} />
                <Preloader isLoader={this.state.visible} />
                {
                    this.state.daFromS.length == 0 ?
                        <View style={{ justifyContent: "center", alignItems: "center", height: "88%",  backgroundColor: "#E9ECF2"  }}>
                            <Text style={[styles.TXT1, { color: "black", fontSize: heightPercentageToDP(2.3) }]}>{"No Follower Found"}</Text>
                        </View>
                        :
                        <View style={styles.VIW1}>
                            <FlatList
                                data={this.state.daFromS}
                                renderItem={({ item, index }) => (
                                    <View>
                                        <View style={[styles.VIW2, { marginTop: index == 0 ? hp(2) : 0 }]}>
                                            <View style={styles.VIW4}>
                                                <Image source={{ uri: item.profile }} style={styles.IMG} />
                                            </View>
                                            <View style={styles.VIW3}>
                                                <Text style={styles.TXT}>
                                                    {
                                                        item.fullname.length > 15 ? item.fullname.substr(0, 15) + "..." : item.fullname
                                                    }
                                                </Text>
                                            </View>
                                            <View style={styles.CMNVIW}>
                                                <TouchableOpacity style={styles.BTN} onPress={() => this.visitProfile(item.user_link)}>
                                                    <Text style={styles.TXT1}>View Profile</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>                                        
                                    </View>
                                )}
                                showsVerticalScrollIndicator={false}
                                style={styles.flat}
                            />
                        </View>
                }

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

export default connect(mapStateToProps, mapDispatchToProps)(FollowerList);