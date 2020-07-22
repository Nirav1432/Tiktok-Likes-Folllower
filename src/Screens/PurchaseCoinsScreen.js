// import React, { Component } from 'react';
// import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
// import styles from './styles/PurchaseCoinStyles';
// import { widthPercentageToDP as wp, hp as hp } from 'react-native-responsive-screen';
// import Header from '../Components/Header';
// import { connect } from 'react-redux';
// import { Services } from '../Configurations/Api/Connections';
// import Preloader from '../Components/Preloader';
// import { Icons } from '../Utils/IconManager'
// import { setDiamonds } from '../ReduxConfig/Actions/Login/LoginActions'
// import { puMaxCount, putcount, shoeAds, hideAds } from '../ReduxConfig/Actions/AddCount/AddCount';
// import RazorpayCheckout from 'react-native-razorpay';
// import Congratulations from '../Components/Popups/Congratulations'
// import { InterstitialAdManager, AdSettings } from 'react-native-fbads';


// let mid = ""

// class PurchaseCoinsScreen extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
// offers: [],
// visible: true,
// Type: "USD",
// congo: false,
// selectedCoins: 0
//     };
//   }

//   async UNSAFE_componentWillMount() {
//     mid = await this.props.Data.CommonData.userId
//     this.getPaymentCoins()
//   }

// getPaymentCoins = () => {
//   Services.PaymentCoins(this.state.Type).then((res) => {
//     this.setState({ offers: res.payment_coin })
//     this.setState({ visible: false })
//   })
//   // if (this.props.Data.adsCounter == this.props.Data.maxAdsCounter) {
//   //   setTimeout(async () => {
//   //     await this.props.showAds()
//   //     await this.props.putCouter(0)
//   //   }, 1500)
//   // }
// }

// payToDestination = async (amount, coins) => {

//   this.setState({ selectedCoins: coins })
//   let FinalAmount = (amount * 100)
//   let Type = this.state.Type == "INR" ? 'INR' : 'USD'
//   let RazoPayAmount = FinalAmount.toString()
//   var options = {
//     image: 'https://i.ibb.co/KrWLWqq/App.png',
//     currency: Type,
//     key: "rzp_live_ylfeSem843VdYS",
//     amount: RazoPayAmount,
//     name: 'Sahajanand Infotech',
//     theme: { color: '#FE2C55' }
//   }

//   RazorpayCheckout.open(options).then((data) => {
//     this.setState({ visible: true })
//     let params = {
//       order_id: data.razorpay_payment_id,
//       user_id: mid,
//       coins: coins,
//       currency_type: this.state.Type,
//       currency: amount
//     }
//     Services.updateWallet(params).then(async (res) => {
//       if (res.success) {
//         await this.props.setCoins(res.coin)
//         this.setState({ visible: false })
//         setTimeout(() => this.setState({ congo: true }), 300)
//       }
//       else {
//         this.setState({ visible: false })
//         alert("Something went wrong !!")
//       }

//     })
//   }).catch((error) => {
//     console.log(error)
//   })

// }

// changeCurrencyList = async () => {
//   // await this.setState({ Type: this.state.Type == "INR" ? "USD" : "INR", visible: true })
//   // await this.getPaymentCoins()
// }

//   render() {
// var syb = this.state.type == "INR" ? "₹" : "$"
// return (
//   <View style={styles.MAINVIW}>
//     <Preloader isLoader={this.state.visible} />
//     <Congratulations
//       visible={this.state.congo}
//       coins={this.state.selectedCoins}
//       ClosePop={() => this.setState({ congo: false })}
//     />
//     <Header title={"Purchase Coins"} backPress={() => this.props.navigation.goBack()} />
//     {
//       this.state.offers.length > 0 ?
//         <FlatList
//           data={this.state.offers}
//           renderItem={({ item, index, ss }) =>
//             <View style={[styles.VIW12, { marginTop: index == 0 ? hp(2) : 0 }]} key={index}>
//               {
//                 index == 0 ?
//                   <View style={styles.VIW14}>
//                     {/* <TouchableOpacity style={styles.VIW15} onPress={() => this.changeCurrencyList()}>
//                       <Image style={styles.IMG4} source={this.state.Type == "INR" ? Icons.inr_selected : Icons.inr_unselected} />
//                       <Text style={styles.TXT33}>{this.state.Type == "INR" ? "INR" : null}</Text>
//                     </TouchableOpacity> */}
//                     <TouchableOpacity style={[styles.VIW15, { marginLeft: hp(4) }]} onPress={() => this.changeCurrencyList()}>
//                       <Image style={styles.IMG4} source={this.state.Type == "USD" ? Icons.usd_selected : Icons.usd_unselected} />
//                       <Text style={styles.TXT33}>{this.state.Type == "USD" ? "USD" : null}</Text>
//                     </TouchableOpacity>
//                     {/* <TouchableOpacity style={[styles.VIW15, { marginLeft: hp(4) }]} onPress={() => this.changeCurrencyList()}>
//                       <Image style={styles.IMG4} source={this.state.Type == "USD" ? Icons.usd_selected : Icons.usd_unselected} />
//                       <Text style={styles.TXT33}>{this.state.Type == "USD" ? "USD" : null}</Text>
//                     </TouchableOpacity> */}
//                   </View>
//                   : <></>
//               }
//               <View style={styles.VIW13}>
//                 <View>
//                   <Text style={styles.TXT6}>{index + 1 + ". "}</Text>
//                 </View>
//                 <View>
//                   <Text style={styles.TXT6}>{" Get " + item.coin + " Diamonds in " + (this.state.Type == "INR" ? "₹" : "$") + (this.state.Type == "INR" ? item.inr : item.doller) + " " + (this.state.Type == "INR" ? "INR" : "USD")}</Text>
//                 </View>
//               </View>
//               <TouchableOpacity style={styles.buy} onPress={() => this.payToDestination(this.state.Type == "INR" ? item.inr : item.doller, item.coin)}>
//                 <Text style={styles.TXT3}>Buy</Text>
//               </TouchableOpacity>
//             </View>
//           }
//         />
//         :
//         <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//           <Text style={styles.TXT6}>{"No Offers Available Currently"}</Text>
//         </View>

//     }

//   </View>
//     );
//   }
// }
// const mapStateToProps = (state) => {
//   return {
//     Data: state.LoginData
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setCoins: (coins) => dispatch(setDiamonds(coins)),
//     putCouter: (cnt) => dispatch(putcount(cnt)),
//     showAds: () => dispatch(shoeAds()),
//     hideAds: () => dispatch(hideAds()),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(PurchaseCoinsScreen);

import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import styles from './styles/PurchaseCoinStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from '../Components/Header';
import { connect } from 'react-redux';
import { Services } from '../Configurations/Api/Connections';
import Preloader from '../Components/Preloader';
import { Icons } from '../Utils/IconManager'
import { setDiamonds } from '../ReduxConfig/Actions/Login/LoginActions'
import { puMaxCount, putcount, shoeAds, hideAds } from '../ReduxConfig/Actions/AddCount/AddCount';
import RazorpayCheckout from 'react-native-razorpay';
import Congratulations from '../Components/Popups/Congratulations'

import RNIap, {
  InAppPurchase,
  PurchaseError,
  SubscriptionPurchase,
  acknowledgePurchaseAndroid,
  consumePurchaseAndroid,
  finishTransaction,
  finishTransactionIOS,
  purchaseErrorListener,
  purchaseUpdatedListener,
} from 'react-native-iap';
import { cos } from 'react-native-reanimated';


// App Bundle > com.dooboolab.test

// const itemSkus = Platform.select({
//   ios: [
//     'com.cooni.point1000',
//     'com.cooni.point5000',
//   ],
//   android: [
//     'android.test.purchased',
//     // 'android.test.canceled',
//     // 'android.test.refunded',
//     // 'android.test.item_unavailable',
//     'point_1000',
//     '5000_point',
//   ],
// });


var itemSkus = null

let purchaseUpdateSubscription;
let purchaseErrorSubscription;
let mid = ""

class PurchaseCoinsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productList: [],
      receipt: '',
      visible: true,
      Type: "USD",
      PaymentMethod: "Goog",
      RazorpayList: [],
      GooglePayList: [],
      congo: false,
      selectedCoins: 0,
      selectedAmount: null,
      availableItemsMessage: '',
    };
  }

  async componentDidMount(): void {
    mid = await this.props.Data.CommonData.userId
    this.getPaymentCoins()
  }

  changeCurrencyList = async () => {
    await this.setState({ PaymentMethod: this.state.PaymentMethod == "Goog" ? "Raz" : "Goog" })
  }

  componentWillUnmount(): void {
    if (purchaseUpdateSubscription) {
      purchaseUpdateSubscription.remove();
      purchaseUpdateSubscription = null;
    }
    if (purchaseErrorSubscription) {
      purchaseErrorSubscription.remove();
      purchaseErrorSubscription = null;
    }
    RNIap.endConnection();
  }


  getItems = async (): void => {
    try {
      const products = await RNIap.getProducts(itemSkus);
      this.setState({ productList: products, visible: false });
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };


  requestSubscription = async (sku): void => {
    try {
      RNIap.requestSubscription(sku);
    } catch (err) {
      Alert.alert(err.message);
    }
  };


  getPaymentCoins = async () => {

    Services.PaymentCoins(this.state.Type).then(async (res) => {

      let R = []
      let G = []

      for (let obj of res.payment_coin) {
        if (parseInt(obj.pay_type) == 1) {
          R.push(obj)
        }
        else {
          G.push(obj)
        }
      }

      let x = []
      // x.push('android.test.purchased')
      // x.push('android.test.canceled')
      for (let obj1 of G) {
        x.push(obj1.product_id)
      }

      itemSkus = x

      this.setState({ RazorpayList: R, GooglePayList: G })

      try {
        const result = await RNIap.initConnection();
        await RNIap.consumeAllItemsAndroid();
      } catch (err) {
        console.warn(err.code, err.message);
      }

      purchaseUpdateSubscription = purchaseUpdatedListener(
        async (purchase: InAppPurchase | SubscriptionPurchase) => {
          const receipt = purchase.transactionReceipt;
          if (receipt) {
            this.setState({ visible: true })
            try {
              const ackResult = await finishTransaction(purchase);
              console.log(ackResult)
            } catch (ackErr) {
              console.warn('ackErr', ackErr);
            }

            let data = JSON.parse(receipt)

            console.log(data)

            let params = {
              order_id: data.orderId,
              user_id: mid,
              coins: this.state.selectedCoins,
              currency_type: this.state.Type,
              currency: this.state.selectedAmount
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
          }
        },
      )

      purchaseErrorSubscription = purchaseErrorListener(
        (error: PurchaseError) => {
          console.log('purchaseErrorListener', error);
          if (error.code === "E_USER_CANCELLED") {
          }
          else {
            alert("You already have owned this item !!")
          }
          // Alert.alert('purchase error', JSON.stringify(error));
        },
      );

      this.getItems()
    })
  }


  PaytoRazorPay = async (amount, coins) => {
    this.setState({ selectedCoins: coins })
    let FinalAmount = (amount * 100)
    let Type = this.state.Type == "INR" ? 'INR' : 'USD'
    let RazoPayAmount = FinalAmount.toString()
    var options = {
      image: 'https://i.ibb.co/KrWLWqq/App.png',
      currency: Type,
      key: "rzp_live_ylfeSem843VdYS",
      amount: RazoPayAmount,
      name: 'Sahajanand Infotech',
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
      console.log(error)
    })

  }


  PayToGooglePlay = (amount, coins, pIndex) => {
    this.setState({ selectedCoins: coins, selectedAmount: amount })
    if (this.state.productList.length > 0) {
      for (let i = 0; i < this.state.productList.length; i++) {
        if (this.state.productList[i].productId == pIndex) {
          this.requestSubscription(this.state.productList[i].productId)
        }
      }
    }
  }

  render(): React.ReactElement {
    const { productList, receipt, availableItemsMessage } = this.state;
    const receipt100 = receipt.substring(0, 100);

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
          this.state.PaymentMethod == "Goog" ?
            this.state.GooglePayList.length > 0 ?
              <FlatList
                data={this.state.GooglePayList}
                renderItem={({ item, index, ss }) =>
                  <View style={[styles.VIW12, { marginTop: index == 0 ? hp(2) : 0 }]} key={index}>
                    {
                      index == 0 ?
                        <View style={{ alignItems: "center", width: "100%" }}>
                          <Text style={[styles.TXT33, { fontSize: hp(3), alignSelf: "center", top: hp(2) }]}>{"Select payment method"}</Text>
                          <View style={[styles.VIW14, {}]}>
                            <TouchableOpacity style={[styles.VIW15, {}]} onPress={() => this.changeCurrencyList()}>
                              <Image style={styles.IMG4} source={this.state.PaymentMethod == "Raz" ? Icons.inr_selected : Icons.inr_unselected} />
                              <Text style={styles.TXT33}>{"Razorpay"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.VIW15, { marginLeft: hp(4) }]} onPress={() => this.changeCurrencyList()}>
                              <Image style={styles.IMG4} source={this.state.PaymentMethod == "Goog" ? Icons.googlepayselected : Icons.googlepayunselected} />
                              <Text style={styles.TXT33}>{"Google Play"}</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                        : <></>
                    }
                    <View style={styles.VIW13}>
                      <View>
                        <Text style={styles.TXT6}>{index + 1 + ". "}</Text>
                      </View>
                      <View>
                        {/* <Text style={styles.TXT6}>{" Get " + item.coin + " Diamonds in " + (this.state.Type == "INR" ? "₹" : "$") + (this.state.Type == "INR" ? item.inr : item.doller) + " " + (this.state.Type == "INR" ? "INR" : "USD")}</Text> */}
                        <Text style={styles.TXT6}>{" Get " + item.coin + " Diamonds in " + "$" + item.doller + " " + "USD"}</Text>
                      </View>
                    </View>
                    <TouchableHighlight style={styles.buy} underlayColor="#FE2C55" onPress={() => this.PayToGooglePlay(item.doller, item.coin, item.product_id)}>
                      <Text style={styles.TXT3}>Buy</Text>
                    </TouchableHighlight>
                  </View>
                }
              />
              :
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={styles.TXT6}>{"No Offers Available Currently"}</Text>
              </View>

            :
            this.state.RazorpayList.length > 0 ?
              <FlatList
                data={this.state.RazorpayList}
                renderItem={({ item, index, ss }) =>
                  <View style={[styles.VIW12, { marginTop: index == 0 ? hp(2) : 0 }]} key={index}>
                    {
                      index == 0 ?
                        <View style={{ alignItems: "center", width: "100%" }}>
                          <Text style={[styles.TXT33, { fontSize: hp(3), alignSelf: "center", top: hp(2) }]}>{"Select payment method"}</Text>
                          <View style={[styles.VIW14, {}]}>
                            <TouchableOpacity style={[styles.VIW15, {}]} onPress={() => this.changeCurrencyList()}>
                              <Image style={styles.IMG4} source={this.state.PaymentMethod == "Raz" ? Icons.inr_selected : Icons.inr_unselected} />
                              <Text style={styles.TXT33}>{"Razorpay"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.VIW15, { marginLeft: hp(4) }]} onPress={() => this.changeCurrencyList()}>
                              <Image style={styles.IMG4} source={this.state.PaymentMethod == "Goog" ? Icons.googlepayselected : Icons.googlepayunselected} />
                              <Text style={styles.TXT33}>{"Google Play"}</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                        : <></>
                    }
                    <View style={styles.VIW13}>
                      <View>
                        <Text style={styles.TXT6}>{index + 1 + ". "}</Text>
                      </View>
                      <View>
                        {/* <Text style={styles.TXT6}>{" Get " + item.coin + " Diamonds in " + (this.state.Type == "INR" ? "₹" : "$") + (this.state.Type == "INR" ? item.inr : item.doller) + " " + (this.state.Type == "INR" ? "INR" : "USD")}</Text> */}
                        <Text style={styles.TXT6}>{" Get " + item.coin + " Diamonds in " + "$" + item.doller + " " + "USD"}</Text>
                      </View>
                    </View>
                    <TouchableHighlight style={styles.buy} underlayColor="#FE2C55" onPress={() => this.PaytoRazorPay(item.doller, item.coin)}>
                      <Text style={styles.TXT3}>Buy</Text>
                    </TouchableHighlight>
                  </View>
                }
              />
              :
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={styles.TXT6}>{"No Offers Available Currently"}</Text>
              </View>

        }

      </View>
      // <View style={styles.container}>
      //   <View style={styles.header}>
      //     <Text style={styles.headerTxt}>react-native-iap V3</Text>
      //   </View>
      //   <View style={styles.content}>
      //     <ScrollView style={{ alignSelf: 'stretch' }}>
      //       <View style={{ height: 50 }} />
      //       {/* <NativeButton
      //         onPress={this.getAvailablePurchases}
      //         activeOpacity={0.5}
      //         style={styles.btn}
      //         textStyle={styles.txt}>
      //         Get available purchases
      //       </NativeButton> */}
      //       <TouchableOpacity
      //         onPress={this.getAvailablePurchases}
      //       >
      //         <Text> Get available purchases</Text>
      //       </TouchableOpacity>

      //       <Text style={{ margin: 5, fontSize: 15, alignSelf: 'center' }}>
      //         {availableItemsMessage}
      //       </Text>

      //       <Text style={{ margin: 5, fontSize: 9, alignSelf: 'center' }}>
      //         {receipt100}
      //       </Text>

      //       {/* <NativeButton
      //         onPress={(): void => this.getItems()}
      //         activeOpacity={0.5}
      //         style={styles.btn}
      //         textStyle={styles.txt}>
      //         Get Products ({productList.length})
      //       </NativeButton> */}

      //       <TouchableOpacity
      //          onPress={(): void => this.getItems()}
      //       >
      //         <Text> Get Products</Text>
      //       </TouchableOpacity>
      //       {productList.map((product, i) => {
      //         return (
      //           <View
      //             key={i}
      //             style={{
      //               flexDirection: 'column',
      //             }}>
      //             <Text
      //               style={{
      //                 marginTop: 20,
      //                 fontSize: 12,
      //                 color: 'black',
      //                 minHeight: 100,
      //                 alignSelf: 'center',
      //                 paddingHorizontal: 20,
      //               }}>
      //               {JSON.stringify(product)}
      //             </Text>
      //             {/* <NativeButton
      //               // onPress={(): void => this.requestPurchase(product.productId)}
      //               onPress={(): void =>
      //                 this.requestSubscription(product.productId)
      //               }
      //               activeOpacity={0.5}
      //               style={styles.btn}
      //               textStyle={styles.txt}>
      //               Request purchase for above product
      //             </NativeButton> */}
      //             <TouchableOpacity
      //               onPress={(): void =>
      //                 this.requestSubscription(product.productId)
      //               }
      //             >
      //               <Text> Request purchase for above product</Text>
      //             </TouchableOpacity>
      //           </View>
      //         );
      //       })}
      //     </ScrollView>
      //   </View>
      // </View>
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
    showAds: () => dispatch(shoeAds()),
    hideAds: () => dispatch(hideAds()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseCoinsScreen);