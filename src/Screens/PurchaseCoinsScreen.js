import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import styles from './styles/PurchaseCoinStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from '../Components/Header';

var offers = [
  {
    title: " Get 1200 Diamonds in $0,99 USD",
    diamonds: 60
  },
  {
    title: " Get 1200 Diamonds in $0,99 USD",
    diamonds: 900
  },
  {
    title: " Get 1200 Diamonds in $0,99 USD",
    diamonds: 60
  },
  {
    title: " Get 1200 Diamonds in $0,99 USD",
    diamonds: 100
  },
  {
    title: " Get 1200 Diamonds in $0,99 USD",
    diamonds: 60
  },
  {
    title: " Get 1200 Diamonds in $0,99 USD",
    diamonds: 100
  },
  {
    title: " Get 1200 Diamonds in $0,99 USD",
    diamonds: 60
  },
  {
    title: " Get 1200 Diamonds in $0,99 USD",
    diamonds: 100
  },
]

export default class PurchaseCoinsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { follower_coin: 0 }
    };
  }
  UNSAFE_componentWillMount() {
    //  this.setState({ data: this.props.navigation.getParam('data') })
  }
  render() {
    return (
      <View style={styles.MAINVIW}>
        <Header title={"Purchase Coins"} backPress={() => this.props.navigation.goBack()} coin={this.state.data.follower_coin} />
        <FlatList
          data={offers}
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
              <TouchableOpacity style={styles.buy}>
                <Text style={styles.TXT3}>Buy</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    );
  }
}
