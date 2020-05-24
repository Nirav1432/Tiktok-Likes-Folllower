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
                                this.props.type == "Comment" ?
                                Icons.comment
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
                                    this.props.type == "Comment" ?
                                        <Text style={styles.TXT1}>Comment Request</Text>
                                        :
                                        <Text style={styles.TXT1}>Share Request</Text>
                            }

                        </View>
                    </View>
                    <View style={styles.VIW4}>                      
                        {
                            this.props.type == "Like" ?
                                <Text style={[styles.TXT2, { fontSize: hp(2) }]}>Congratulations! Your Like requested{"\n"}processed Successfully.</Text>
                                :
                                this.props.type == "Comment" ?
                                    <Text style={[styles.TXT2, { fontSize: hp(2) }]}>Congratulations! Your Comment requested{"\n"}processed Successfully.</Text>
                                    :
                                    <Text style={[styles.TXT2, { fontSize: hp(2) }]}>Congratulations! Your Share requested{"\n"}processed Successfully.</Text>

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
