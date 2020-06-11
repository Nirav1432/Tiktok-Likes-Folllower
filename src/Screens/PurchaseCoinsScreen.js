import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import styles from './styles/PurchaseCoinStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from '../Components/Header';
import { connect } from 'react-redux';
import { Services } from '../Configurations/Api/Connections';
import Preloader from '../Components/Preloader';
import { Icons } from '../Utils/IconManager'
import { setDiamonds } from '../ReduxConfig/Actions/Login/LoginActions'
import { puMaxCount, putcount, shoeAds } from '../ReduxConfig/Actions/AddCount/AddCount';
import RazorpayCheckout from 'react-native-razorpay';
import Congratulations from '../Components/Popups/Congratulations'

let mid = ""

class PurchaseCoinsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      offers: [],
      visible: true,
      Type: "INR",
      congo: false,
      selectedCoins: 0
    };
  }

  async UNSAFE_componentWillMount() {
    mid = await this.props.Data.CommonData.userId
    this.getPaymentCoins()
  }

  getPaymentCoins = () => {
    Services.PaymentCoins(this.state.Type).then((res) => {
      this.setState({ offers: res.payment_coin })
      this.setState({ visible: false })
    })
    if (this.props.Data.adsCounter == this.props.Data.maxAdsCounter) {
      setTimeout(async () => {
        await this.props.showAds()
        await this.props.putCouter(0)
      }, 300)
    }
  }

  payToDestination = async (amount, coins) => {

    this.setState({ selectedCoins: coins })
    let FinalAmount = (amount * 100)
    let Type = this.state.Type == "INR" ? 'INR' : 'USD'

    var options = {
      description: 'For Test a Rezorpay',
      image: 'https://i.ibb.co/KrWLWqq/App.png',
      currency: Type,
      key: "rzp_test_0gruu49Oyj2Fga",
      amount: FinalAmount.toString(),
      name: 'Nirav Bhesaniya',
      theme: { color: '#FE2C55' }
    }
    RazorpayCheckout.open(options).then((data) => {
      this.setState({ visible: true })
      let params = {
        order_id: data.razorpay_payment_id,
        user_id: mid,
        coins: coins,
        currency_type: this.state.Type,
        currency: amount
      }
      Services.updateWallet(params).then(async (res) => {
        if (res.success) {
          await this.props.setCoins(res.coin)
          this.setState({ visible: false })
          setTimeout(() => this.setState({ congo: true }), 300)
        }
        else {
          this.setState({ visible: false })
          alert("Something went wrong !!")
        }

      })
    }).catch((error) => {
      //alert("payment Canceled !!")
    })

  }

  changeCurrencyList = async () => {
    await this.setState({ Type: this.state.Type == "INR" ? "USD" : "INR", visible: true })
    await this.getPaymentCoins()
  }

  render() {
    var syb = this.state.type == "INR" ? "₹" : "$"
    return (
      <View style={styles.MAINVIW}>
        <Preloader isLoader={this.state.visible} />
        <Congratulations
          visible={this.state.congo}
          coins={this.state.selectedCoins}
          ClosePop={() => this.setState({ congo: false })}
        />
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
                      <Text style={styles.TXT6}>{" Get " + item.coin + " Diamonds in " + (this.state.Type == "INR" ? "₹" : "$") + (this.state.Type == "INR" ? item.inr : item.doller) + " " + (this.state.Type == "INR" ? "INR" : "USD")}</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.buy} onPress={() => this.payToDestination(this.state.Type == "INR" ? item.inr : item.doller, item.coin)}>
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
    setCoins: (coins) => dispatch(setDiamonds(coins)),
    putCouter: (cnt) => dispatch(putcount(cnt)),
    showAds: () => dispatch(shoeAds())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseCoinsScreen);