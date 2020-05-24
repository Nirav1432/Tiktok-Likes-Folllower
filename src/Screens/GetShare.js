import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import styles from './styles/GetCommentsStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Services } from '../Configurations/Api/Connections';
import { Icons } from '../Utils/IconManager'
import Header from '../Components/Header';
import Preloader from '../Components/Preloader';

export default class GetShare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DataFromServer: [],
            visible: true
        };
    }

    componentDidMount() {
        this.getData()
    }

    getData() {

        Services.getListofCoins().then((res) => {
            if (res.selection.length > 0) {
                this.setState({ visible: false })
                for (let obj of res.selection) {
                    if (obj.type == 4) {
                        this.state.DataFromServer.push(obj)
                    }
                }
            }
        }).catch((res) => {
            this.setState({ visible: false })
        })
    }

    render() {
        return (
            <View style={styles.MAINVIW}>

                <Preloader isLoader={this.state.visible} />

                <Header title={"Get Share"} backPress={() => this.props.navigation.goBack()} />

                <FlatList
                    data={this.state.DataFromServer}
                    renderItem={({ item, index, ss }) =>
                        <View style={[styles.VIW12, { marginTop: index == 0 ? hp(2) : 0 }]}>
                            <View style={styles.VIW13}>
                                <View>
                                    <Text style={styles.TXT6}>{index + 1 + ". "}</Text>
                                </View>
                                <View>
                                    <Text style={styles.TXT6}>{"Get " + item.request + " Real Share in " + item.coin}</Text>
                                    <Text style={styles.TXT6}>{"Diamonds."}</Text>
                                </View>
                            </View>
                            <View style={styles.VIW14}>
                                <TouchableOpacity style={[styles.VIW16]} onPress={() => this.props.navigation.navigate('CommonScreen', { type: "Get Shares", data: { Diamonds: item.coin, Request: item.request } })}>
                                    <View style={styles.VIW17}>
                                        <Image source={Icons.Share1} style={styles.IMG44} resizeMode="contain" />
                                    </View>
                                    <View style={styles.VIW18}>
                                        <Text style={styles.TXT4}>{"Get " + item.request + " Share"}</Text>
                                    </View>
                                    <View style={styles.VIW19}>
                                        <Image source={Icons.right} style={styles.IMG4} resizeMode="contain" />
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
