import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import styles from './styles/DoFollowingStyles';
import { Icons } from "../Utils/IconManager";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { custom_number_format } from '../Utils/functions'
import Header from '../Components/Header';
import { Services } from '../Configurations/Api/Connections';
import { connect } from 'react-redux';

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
  },
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
  }
]

class DoFollowing extends Component {

  constructor(props) {
    super(props);
    this.state = {      
    };
  }

  UNSAFE_componentWillMount() {
    let id = this.props.Data.CommonData.userId
    this.getNewFollower(id)
  }

  getNewFollower = (id) => {
    Services.Following(id).then((res) => {
      console.log(res)
    })
  }

  render() {
    return (
      <View style={styles.MAINVIW}>
        <Header title={"Do Following"} backPress={() => this.props.navigation.goBack()} />
        <View style={{ flex: 1 }}>
          <FlatList
            data={data}
            renderItem={({ item, index }) => (

              <View style={[styles.VIW1, { marginTop: index == 0 ? hp(2) : 0 }]} key={index}>

                <View style={styles.profileView}>

                  <View style={styles.ImageView}>
                    <View style={styles.VIW2}>
                      <Image source={{ uri: item.avatar }} style={styles.profileImage} />
                    </View>
                    <View style={[styles.VIW2, { left: wp(3) }]}>
                      <Text style={styles.TXT1}>{item.first_name}</Text>
                      <Text style={styles.TXT2}>{item.first_name}</Text>
                    </View>
                  </View>

                  <View style={styles.VIW3}>
                    <View style={styles.VIW22}>
                      <View style={[styles.VIW4, { bottom: hp(0.2) }]}>
                        <Text style={styles.TXT}>+</Text>
                      </View>
                      <View style={styles.VIW4}>
                        <Image source={Icons.PinkDM} style={styles.IMG2} resizeMode="contain" />
                      </View>
                      <View style={styles.VIW4}>
                        <Text style={styles.TXT22}>5</Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.Button}>
                      <Text style={styles.TXT3}>Follow</Text>
                    </TouchableOpacity>
                  </View>

                </View>
                <View style={styles.DetailView}>
                  <View style={styles.Commonview}>
                    <Text style={styles.TXT4}>10</Text>
                    <Text style={styles.TXT5}>Following</Text>
                  </View>
                  <View style={[styles.Commonview, { left: wp(2) }]}>
                    <Text style={styles.TXT4}>10</Text>
                    <Text style={styles.TXT5}>Followers</Text>
                  </View>
                  <View style={styles.Commonview}>
                    <Text style={styles.TXT4}>10</Text>
                    <Text style={styles.TXT5}>Likes</Text>
                  </View>
                  <View style={styles.Commonview}>
                    <Text style={styles.TXT4}>10</Text>
                    <Text style={styles.TXT5}>Videos</Text>
                  </View>
                </View>
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
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
export default connect(mapStateToProps)(DoFollowing)