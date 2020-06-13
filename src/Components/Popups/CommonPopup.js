import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../Styles/GetFollowerPopStyles'
import Modal from 'react-native-modal';
import { Icons } from '../../Utils/IconManager';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class CommonPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Modal isVisible={this.props.visible} animationIn="slideInRight" animationOut="slideOutRight" >
                <View style={styles.VIW2}>
                    <View style={styles.VIW3}>
                        <View style={styles.VIW6}>
                            <Image source={this.props.type == "Like" ?
                                Icons.Like :
                                this.props.type == "Views" ?
                                Icons.doView
                                :
                                Icons.shareHome
                            }


                                style={styles.IMG} resizeMode="contain" />
                        </View>
                        <View style={styles.VIW7}>
                            {
                                this.props.type == "Like" ?
                                    <Text style={styles.TXT1}>Like Request</Text>
                                    :
                                    this.props.type == "Views" ?
                                        <Text style={styles.TXT1}>Views Request</Text>
                                        :
                                        <Text style={styles.TXT1}>Share Request</Text>
                            }

                        </View>
                    </View>
                    <View style={styles.VIW4}>                      
                        {
                            this.props.type == "Like" ?
                                <Text style={[styles.TXT2, { fontSize: hp(2) }]}>Congratulations! Your Like request processed{"\n"}successfully within 48-96 hours.</Text>
                                :
                                this.props.type == "Views" ?
                                    <Text style={[styles.TXT2, { fontSize: hp(2) }]}>Congratulations! Your Views request processed{"\n"}successfully within 48-96 hours.</Text>
                                    :
                                    <Text style={[styles.TXT2, { fontSize: hp(2) }]}>Congratulations! Your Share request processed{"\n"}successfully within 48-96 hours.</Text>

                        }
                    </View>
                    <View style={styles.VIW5}>
                        <TouchableOpacity style={styles.BTNS1} onPress={() => this.props.ClosePop()}>
                            <Text style={styles.TXT3}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
}
