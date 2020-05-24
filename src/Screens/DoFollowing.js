import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import styles from './styles/DoFollowingStyles';
import { Icons } from "../Utils/IconManager";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { custom_number_format } from '../Utils/functions'
import Header from '../Components/Header';
import { Services } from '../Configurations/Api/Connections';
import { connect } from 'react-redux';
import Preloader from '../Components/Preloader';
import { setDiamonds } from '../ReduxConfig/Actions/Login/LoginActions';

var userId = ""

class DoFollowing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      datafromserver: [],
      visible: true,
    };
  }

  UNSAFE_componentWillMount() {
    userId = this.props.Data.CommonData.userId
    this.getNewFollower(userId)
  }

  getNewFollower = (id) => {
    Services.Following(id).then((res) => {
      if (res.success == "true") {
        this.setState({ datafromserver: res.followers })
        this.setState({ visible: false })
      }
      else {
        this.setState({ visible: false })
      }
    })
  }


  followUser = async (item) => {
    this.setState({ visible: true })
    let data = { user_id: userId, request_user: item.user_id }
    Services.DoFollower(data).then(async (res) => {
      if (res.success == "true") {
        await this.props.setCoins(res.coin)
        await this.getNewFollower(userId)
      }
      else {
        this.setState({ visible: false })
      }
    })
  }

  render() {
    return (
      <View style={styles.MAINVIW}>
        <Preloader isLoader={this.state.visible} />
        <Header title={"Do Following"} backPress={() => this.props.navigation.goBack()} />
        <View>
          <FlatList
            data={this.state.datafromserver}
            renderItem={({ item, index }) => (

              <View style={[styles.VIW1, { marginTop: index == 0 ? hp(2) : 0 }]} key={index}>

                <View style={styles.profileView}>

                  <View style={styles.ImageView}>
                    <View style={styles.VIW2}>
                      <Image source={{ uri: item.profile }} style={styles.profileImage} />
                    </View>
                    <View style={[styles.VIW2, { marginLeft: wp(3) }]}>
                      <Text style={styles.TXT1}>{item.username}</Text>
                      <Text style={styles.TXT2}>{item.fullname}</Text>
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
                    <TouchableOpacity style={styles.Button} onPress={() => this.followUser(item)}>
                      <Text style={styles.TXT3}>Follow</Text>
                    </TouchableOpacity>
                  </View>

                </View>
                {/* <View style={styles.DetailView}>
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
                </View> */}
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
        {
          this.state.datafromserver.length == 0 ?
            <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
              <Text style={styles.TXT1}>{"No Follower Found"}</Text>
            </View>
            :
            <></>
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
export default connect(mapStateToProps, mapDispatchToProps)(DoFollowing)