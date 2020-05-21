import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles/ContactUsListStyles';
import Header from '../Components/Header';


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

export default class ContactUsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.MAINVIW}>
        <Header title={"Contact Us"} backPress={() => this.props.navigation.goBack()} coin={0} />
        <View style={styles.VIW1}>
          <FlatList
            data={tempData}
            renderItem={(data, index) =>
              data.item.from == "user" ?
                <View style={styles.userView}>
                  <View style={styles.messageView}>
                    <Text style={styles.TXTUSER}>{data.item.from == "user" ? "You" : ""}</Text>
                    <Text style={styles.messageTXT}>{data.item.message}</Text>
                  </View>
                </View>
                :
                <View style={styles.adminView}>
                  <View style={styles.messageViewAdmin}>
                    <Text style={styles.TXTAdmin}>{data.item.from == "user" ? "You" : "Admin"}</Text>
                    <Text style={styles.messageTXT}>{data.item.message}</Text>
                  </View>
                </View>
            }
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={styles.VIW2}>
          <Text style={styles.TXT2}>if you have any more questions or concerns,{"\n"}please contact to us</Text>
          <TouchableOpacity style={styles.Button} onPress={()=>this.props.navigation.navigate('ContactUs')}>
            <Text style={styles.TXT3}>Contact Us</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
