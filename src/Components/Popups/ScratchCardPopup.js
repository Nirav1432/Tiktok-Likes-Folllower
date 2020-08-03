import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { Icons } from '../../Utils/IconManager';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import ScratchView from 'react-native-scratch'
import { Fonts } from '../../Utils/fonts';


export default class ScratchCardPopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            prizeValue: 0,
            prizeId: 0
        }
    }
    async componentWillReceiveProps() {
        if(this.props.data!=null)
        this.setState({ prizeId: this.props.data.scratche_id, prizeValue: this.props.data.coin })
    }
    render() {
        return (
            <Modal isVisible={this.props.visible} animationIn="slideInRight" animationOut="slideOutRight" >
                <View style={styles.view1}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 5, justifyContent: "flex-end", alignItems: "center" }}>
                            <Image source={Icons.gift} style={{ height: heightPercentageToDP(14), width: heightPercentageToDP(14) }} />
                        </View>
                        <View style={{ flex: 5 }}>
                            <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
                                <Text style={{ fontSize: heightPercentageToDP(3), bottom: heightPercentageToDP(1), fontFamily: Fonts.LatoBlack, color: "#333333" }}>
                                    You Won
                            </Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Image source={Icons.Newdmd} style={{ height: heightPercentageToDP(4.5), width: heightPercentageToDP(4.5) }} />
                                    <View style={{ justifyContent: "center", marginLeft: heightPercentageToDP(1) }}>
                                        <Text style={{ fontFamily: Fonts.LatoBlack, fontSize: heightPercentageToDP(3) }}>{this.state.prizeValue}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <ScratchView
                        id={1} // ScratchView id (Optional)
                        brushSize={60} // Default is 10% of the smallest dimension (width/height)
                        threshold={80} // Report full scratch after 70 percentage, change as you see fit. Default is 50
                        fadeOut={false} // Disable the fade out animation when scratch is done. Default is true
                        placeholderColor="#FE2C55" // Scratch color while image is loading (or while image not present)
                        imageUrl="http://134.209.103.120/TiktokFollower/public/images/Scratch.jpg"
                        resourceName="your_image" // A url to your image (Optional)
                        resizeMode="cover" // Resize the image to fit or fill the scratch view. Default is stretch
                        onImageLoadFinished={this.onImageLoadFinished} // Event to indicate that the image has done loading
                        onTouchStateChanged={this.onTouchStateChangedMethod} // Touch event (to stop a containing FlatList for example)
                        onScratchProgressChanged={this.onScratchProgressChanged} // Scratch progress event while scratching
                        onScratchDone={() => this.props.onScratchDone()} // Scratch is done event
                    />
                </View>
            </Modal>
        )
    }
}
const styles = StyleSheet.create({
    view1: {
        height: heightPercentageToDP(33), width: heightPercentageToDP(33), backgroundColor: "white", alignSelf: "center",
        borderRadius: heightPercentageToDP(3), overflow: "hidden"
    }
})