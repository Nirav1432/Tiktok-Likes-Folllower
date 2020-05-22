import React, { Component } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import Header from '../Components/Header';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from "./styles/FollowersListStyles";
const data = [
    {
        "id": 7,
        "email": "michael.lawson@reqres.in",
        "first_name": "Michael",
        "last_name": "Lawson",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/follettkyle/128.jpg"
    },
    {
        "id": 8,
        "email": "lindsay.ferguson@reqres.in",
        "first_name": "Lindsay",
        "last_name": "Ferguson",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/araa3185/128.jpg"
    },
    {
        "id": 9,
        "email": "tobias.funke@reqres.in",
        "first_name": "Tobias",
        "last_name": "Funke",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/vivekprvr/128.jpg"
    },
    {
        "id": 10,
        "email": "byron.fields@reqres.in",
        "first_name": "Byron",
        "last_name": "Fields",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/russoedu/128.jpg"
    },
    {
        "id": 11,
        "email": "george.edwards@reqres.in",
        "first_name": "George",
        "last_name": "Edwards",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/mrmoiree/128.jpg"
    },
    {
        "id": 12,
        "email": "rachel.howell@reqres.in",
        "first_name": "Rachel",
        "last_name": "Howell",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/hebertialmeida/128.jpg"
    }
]
export default class FollowerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        // fetch('http://134.209.103.120/TiktokFollower/api/following/'+id,{
        //     method:"get"
        // })
        // .then(res=>{
        //     console.log(res.json())
        // })     
    }
    render() {
        return (
            <View styles={styles.MAINVIW}>
                <Header title={"Followers List"} backPress={() => this.props.navigation.goBack()} />
                <View style={styles.VIW1}>
                    <FlatList
                        data={data}
                        renderItem={({ item, index }) => (
                            <View style={[styles.VIW2, { marginTop: index == 0 ? hp(2) : 0 }]}>
                                <View style={styles.VIW4}>
                                    <Image source={{ uri: item.avatar }} style={styles.IMG} />
                                </View>
                                <View style={styles.VIW3}>
                                    <Text style={styles.TXT}>
                                        {
                                            item.email.length > 15 ? item.email.substr(0, 15) + "..." : item.email
                                        }
                                    </Text>
                                </View>
                                <View style={styles.CMNVIW}>
                                    <TouchableOpacity style={styles.BTN}>
                                        <Text style={styles.TXT1}>Follow Back</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        showsVerticalScrollIndicator={false}
                        style={styles.flat}
                    />
                </View>
            </View>
        );
    }
}
