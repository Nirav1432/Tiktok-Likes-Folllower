import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import styles from './styles/ContactusStyles';
import Header from '../Components/Header';
import Preloader from '../Components/Preloader';
import { Services } from '../Configurations/Api/Connections'
import { connect } from 'react-redux'

var userid = ""
class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false, Message: "", err: false
        };
    }
    UNSAFE_componentWillMount() {
        userid = this.props.Data.CommonData.userId
        console.log(userid)
    }
    render() {
        return (
            <View style={styles.MAINVIW}>
                <Preloader isLoader={this.state.visible} />
                <Header title={"Contact Us"} backPress={() => this.props.navigation.goBack()} />
                <View style={styles.VIW1}>
                    <Text style={styles.TXT1}>if you have any more questions or{"\n"}Concerns, please Contact to us</Text>
                </View>
                <TextInput style={[styles.TXTINPUT, { borderColor: "red", borderWidth: this.state.err ? 2 : 0 }]} multiline={true} placeholder="Your Message" onChangeText={(m) => this.CheckMessage(m)} />
                <TouchableOpacity style={styles.SubmitBotton} onPress={() => this.sendContact()}>
                    <Text style={styles.TXT2}>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }

    CheckMessage = (m) => {

        let CheckMessage = /^(?!\s*$).+/

        if (CheckMessage.test(m)) {
            this.setState({ Message: m, err: false })
        }
        else {
            this.setState({ err: true })
        }
    }

    sendContact = () => {

        let CheckMessage = /^(?!\s*$).+/

        if (CheckMessage.test(this.state.Message)) {
            this.setState({ visible:true, err: false, })
            let Data={user_id:userid,message:this.state.Message}
            Services.AddContactUS(Data).then((res)=>{
                if(res.success){
                    this.setState({visible:false})
                    this.props.navigation.navigate('ContactUsList')
                }
            })
        }
        else {
            this.setState({ err: true })
        }
      
    }
}
const mapStateToProps = (state) => {
    return {
        Data: state.LoginData
    };
};
export default connect(mapStateToProps)(ContactUs);