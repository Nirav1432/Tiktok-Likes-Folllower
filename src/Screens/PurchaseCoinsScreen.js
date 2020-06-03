import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import styles from './styles/PurchaseCoinStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from '../Components/Header';
import { connect } from 'react-redux';
import { Services } from '../Configurations/Api/Connections';
import Preloader from '../Components/Preloader';
import { Icons } from '../Utils/IconManager'
import RazorpayCheckout from 'react-native-razorpay';


class PurchaseCoinsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      offers: [],
      visible: true,
      Type: "INR"
    };
  }

  UNSAFE_componentWillMount() {
    this.getPaymentCoins()
  }

  getPaymentCoins = () => {
    Services.PaymentCoins(this.state.Type).then((res) => {
      this.setState({ offers: res.payment_coin })
      this.setState({ visible: false })
    })
  }

  payToDestination = (amount) => {
    if (this.state.Type == "USD") {
      alert("Sorry! USD Payment's Facility is Cureently Unavailable")
    }
    else {

      let FinalAmount = (amount * 100)

      var options = {
        description: 'For Test a Rezorpay',
        image: 'https://i.ibb.co/KrWLWqq/App.png',
        currency: 'INR',
        key: "rzp_test_0gruu49Oyj2Fga",
        amount: FinalAmount.toString(),
        name: 'Nirav Bhesaniya',
        theme: { color: '#FE2C55' }
      }
      RazorpayCheckout.open(options).then((data) => {
        console.log(data)
      }).catch((error) => {
        console.log(error)
      })
    }
  }

  changeCurrencyList = async () => {
    await this.setState({ Type: this.state.Type == "INR" ? "USD" : "INR", visible: true })
    await this.getPaymentCoins()
  }

  render() {
    var syb = this.state.type == "INR" ? "₹" : "$"
    return (
      <View style={styles.MAINVIW}

      >
        <Preloader isLoader={this.state.visible} />
        <Header title={"Purchase Coins"} backPress={() => this.props.navigation.goBack()} />
        {
          this.state.offers.length > 0 ?
            <FlatList
              data={this.state.offers}
              renderItem={({ item, index, ss }) =>
                <View style={[styles.VIW12, { marginTop: index == 0 ? hp(2) : 0 }]} key={index}>
                  {
                    index == 0 ?
                      <View style={styles.VIW14}>
                        <TouchableOpacity style={styles.VIW15} onPress={() => this.changeCurrencyList()}>
                          <Image style={styles.IMG4} source={this.state.Type == "INR" ? Icons.inr_selected : Icons.inr_unselected} />
                          <Text style={styles.TXT33}>{this.state.Type == "INR" ? "INR" : null}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.VIW15, { marginLeft: hp(4) }]} onPress={() => this.changeCurrencyList()}>
                          <Image style={styles.IMG4} source={this.state.Type == "USD" ? Icons.usd_selected : Icons.usd_unselected} />
                          <Text style={styles.TXT33}>{this.state.Type == "USD" ? "USD" : null}</Text>
                        </TouchableOpacity>
                      </View>
                      : <></>
                  }
                  <View style={styles.VIW13}>
                    <View>
                      <Text style={styles.TXT6}>{index + 1 + ". "}</Text>
                    </View>
                    <View>
                      <Text style={styles.TXT6}>{" Get " + item.coin + " Diamonds in " + (this.state.Type == "INR" ? "₹" : "$") + item.doller + " " + item.type}</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.buy} onPress={() => this.payToDestination(item.doller)}>
                    <Text style={styles.TXT3}>Buy</Text>
                  </TouchableOpacity>
                </View>
              }
            />
            :
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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