import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import styles from './styles/GetFollowerStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import GetFollowerPop from '../Components/Popups/GetFollowerPop'
import RequestSuccess from '../Components/Popups/RequestSuccess'
import { Icons } from '../Utils/IconManager'
import Header from '../Components/Header';

export default class GetFollower extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offers: [
                {
                    title: " Get 20 real followers in 60\n diamonds.",
                    diamonds: 60
                },
                {
                    title: " Get 40 real followers in 100\n diamonds.",
                    diamonds: 900
                },
                {
                    title: " Get 20 real followers in 60\n diamonds.",
                    diamonds: 60
                },
                {
                    title: " Get 40 real followers in 100\n diamonds.",
                    diamonds: 100
                },
                {
                    title: " Get 20 real followers in 60\n diamonds.",
                    diamonds: 60
                },
                {
                    title: " Get 40 real followers in 100\n diamonds.",
                    diamonds: 100
                },
                {
                    title: " Get 20 real followers in 60\n diamonds.",
                    diamonds: 60
                },
                {
                    title: " Get 40 real followers in 100\n diamonds.",
                    diamonds: 100
                },
            ],
            Visi: false,
            Visi1: false
        };
    }
    componentDidMount() {
   
    }
    render() {
        return (
            <View style={styles.MAINVIW}>
                <GetFollowerPop
                    visible={this.state.Visi}
                    ClosePop={() => this.setState({ Visi: false })}
                    YesPress={() => this.setState({ Visi: false, Visi1: true })}
                />
                <RequestSuccess
                    visible={this.state.Visi1}
                    ClosePop={() => this.setState({ Visi1: false })}
                />

                <Header title={"Get Followers"} backPress={() => this.props.navigation.goBack()} />

                <FlatList
                    data={this.state.offers}
                    renderItem={({ item, index, ss }) =>
                        <View style={[styles.VIW12, { marginTop: index == 0 ? hp(2) : 0 }]}>
                            <View style={styles.VIW13}>
                                <View>
                                    <Text style={styles.TXT6}>{index + 1 + ". "}</Text>
                                </View>
                                <View>
                                    <Text style={styles.TXT6}>{item.title}</Text>
                                </View>
                            </View>
                            <View style={styles.VIW14}>
                                <TouchableOpacity style={[styles.VIW16]} onPress={() => this.setState({ Visi: true })}>
                                    <View style={styles.VIW17}>
                                        <Image source={Icons.Group} style={styles.IMG4} resizeMode="contain" />
                                    </View>
                                    <View style={styles.VIW18}>
                                        <Image source={Icons.premium_quality} style={styles.IMG5} resizeMode="contain" />
                                    </View>
                                    <View style={styles.VIW19}>
                                        <Text style={styles.TXT4}>{item.diamonds}</Text>
                                    </View>

                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                    style={styles.FlatList}
                    showsVerticalScrollIndicator={false}
                />


            </View>
        );
    }
}
