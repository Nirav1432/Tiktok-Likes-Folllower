import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles/ContactUsListStyles';
import Header from '../Components/Header';
import { connect } from 'react-redux'
import { Services } from '../Configurations/Api/Connections';
import Preloader from '../Components/Preloader';

var tempData = [
  {
    from: 'admin',
    message: "Hello i m fine"
  },
  {
    from: 'user',
    message: "Hello i m fine"
  },
  {
    from: 'admin',
    message: "Hello i m fine"
  },
  {
    from: 'user',
    message: "Hello i m fine"
  },
  {
    from: 'admin',
    message: "Hello i m fine"
  },
  {
    from: 'user',
    message: "Hello i m fine"
  },
  {
    from: 'admin',
    message: "Hello i m fine"
  },
  {
    from: 'user',
    message: "Hello i m fine"
  },
  {
    from: 'admin',
    message: "Hello i m fine"
  },
  {
    from: 'user',
    message: "Hello i m fine"
  },
  {
    from: 'admin',
    message: "Hello i m fine"
  },
  {
    from: 'user',
    message: "Hello i m fine"
  }
]

class ContactUsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      list: []
    };
  }

  UNSAFE_componentWillMount() {
    userid = this.props.Data.CommonData.userId
    this.getMessageList(userid)
  }

  getMessageList(id) {
    let data = { user_id: id }
    Services.Coversations(data).then((res) => {
      this.setState({list:res.data.reverse()})
    })
  }

  render() {
    return (
      <View style={styles.MAINVIW}>
        <Preloader isLoader={this.state.visible} />
        <Header title={"Contact Us"} backPress={() => this.props.navigation.goBack()} coin={0} />
        <View style={styles.VIW1}>
          {
            this.state.list.length > 0 ?
              <FlatList
                data={this.state.list}
                renderItem={(data, index) =>
                  data.item.is_replied == 0 ?
                    <View style={styles.userView}>
                      <View style={styles.messageView}>
                        <Text style={styles.TXTUSER}>{data.item.is_replied == 0 ? "You" : "Admin"}</Text>
                        <Text style={styles.messageTXT}>{data.item.message}</Text>
                      </View>
                    </View>
                    :
                    <View style={styles.adminView}>
                      <View style={styles.messageViewAdmin}>
                        <Text style={styles.TXTAdmin}>{data.item.is_replied == 0 ? "You" : "Admin"}</Text>
                        <Text style={styles.messageTXT}>{data.item.message}</Text>
                      </View>
                    </View>
                }
                showsVerticalScrollIndicator={false}
              />
              :
              <></>
          }

        </View>
        <View style={styles.VIW2}>
          <Text style={styles.TXT2}>if you have any more questions or concerns,{"\n"}please contact to us</Text>
          <TouchableOpacity style={styles.Button} onPress={() => this.props.navigation.navigate('ContactUs')}>
            <Text style={styles.TXT3}>Contact Us</Text>
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
export default connect(mapStateToProps)(ContactUsList);