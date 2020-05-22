import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import styles from './styles/PurchaseCoinStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from '../Components/Header';
import { connect } from 'react-redux';
import { Services } from '../Configurations/Api/Connections';
import Preloader from '../Components/Preloader';

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

class PurchaseCoinsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      offers: [],
      visible: true
    };
  }

  UNSAFE_componentWillMount() {
    let id = this.props.Data.CommonData.userId
    this.getPaymentCoins(id)
  }

  getPaymentCoins = (id) => {
    Services.PaymentCoins(id).then((res) => {
      this.setState({ offers: res.payment_coin })
      this.setState({ visible: false })
    })
  }


  render() {
    return (
      <View style={styles.MAINVIW}>
        <Preloader isLoader={this.state.visible} />
        <Header title={"Purchase Coins"} backPress={() => this.props.navigation.goBack()} />
        {
          this.state.offers.length > 0 ?
            <FlatList
              data={this.state.offers}
              renderItem={({ item, index, ss }) =>
                <View style={[styles.VIW12, { marginTop: index == 0 ? hp(2) : 0 }]} key={index}>
                  <View style={styles.VIW13}>
                    <View>
                      <Text style={styles.TXT6}>{index + 1 + ". "}</Text>
                    </View>
                    <View>
                      <Text style={styles.TXT6}>{" Get "+ item.coin +" Diamonds in "+item.doller}</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.buy}>
                    <Text style={styles.TXT3}>Buy</Text>
                  </TouchableOpacity>
                </View>
              }
            />
            :
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
              <Text style={styles.TXT6}>{"No Offers Available Currently"}</Text>
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
    // setGlobalData: () => { dispatch(putLogin(JSON.stringify(FinalData))) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseCoinsScreen);