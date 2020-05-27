import React, { Component } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import Header from '../Components/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from "./styles/FollowersListStyles";
import { Services } from '../Configurations/Api/Connections';
import { connect } from 'react-redux'
import Preloader from '../Components/Preloader';

class LikesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            visible: true
        };
    }
    componentDidMount() {
        this.getLikes(this.props.Data.CommonData.userId)
    }

    getLikes(id) {
        Services.LikeVideosList(id).then((res) => {
            if (res.success == "true") {
                this.setState({ data: res.liker, visible: false })
            }
            else {
                this.setState({ data: [], visible: false })
            }
        })
    }


    render() {
        return (
            <View styles={styles.MAINVIW}>
                <Header title={"Likes List"} backPress={() => this.props.navigation.goBack()} />
                <Preloader isLoader={this.state.visible} />
                {
                    this.state.data.length == 0 ?
                        <View style={{ justifyContent: "center", alignItems: "center", height: "88%" }}>
                            <Text style={[styles.TXT1, { color: "black", fontSize: hp(2.5) }]}>{"No Likes Found"}</Text>
                        </View>
                        :
                        <FlatList
                            data={this.state.data}
                            renderItem={({ item, index }) => (
                                <View style={[styles.VIW2, { marginTop: index == 0 ? hp(2) : 0 }]}>
                                    <View style={[styles.VIW4, { flex: null }]}>
                                        <Image source={{ uri: item.profile }} style={styles.IMG} />
                                    </View>
                                    <View style={[styles.VIW3, { flex: null, paddingLeft: wp(4) }]}>
                                        <Text style={styles.TXT}>
                                            {
                                                item.fullname
                                                // item.fullname.length > 15 ? item.fullname.substr(0, 15) + "..." : item.fullname
                                            }
                                        </Text>
                                    </View>
                                    {/* <View style={styles.CMNVIW}>
                                        <TouchableOpacity style={styles.BTN}>
                                            <Text style={styles.TXT1}>Follow Back</Text>
                                        </TouchableOpacity>
                                    </View> */}
                                </View>
                            )}
                            showsVerticalScrollIndicator={false}
                            style={styles.flat}
                        />
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

export default connect(mapStateToProps, mapDispatchToProps)(LikesList);