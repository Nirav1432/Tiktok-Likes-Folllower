import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import styles from './styles/GetFollowerStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import GetFollowerPop from '../Components/Popups/GetFollowerPop'
import RequestSuccess from '../Components/Popups/RequestSuccess'
import { Icons } from '../Utils/IconManager'
import Header from '../Components/Header';
import Preloader from '../Components/Preloader';
import { connect } from 'react-redux'
import { Services } from '../Configurations/Api/Connections';


class GetFollower extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            offers: [
                {
                    title: " Get 20 real followers in 60\n diamonds.",
                    diamonds: 60
                },
                {
                    title: " Get 40 real followers in 100\n diamonds.",
                    diamonds: 900
                },
                {
                    title: " Get 20 real followers in 60\n diamonds.",
                    diamonds: 60
                },
                {
                    title: " Get 40 real followers in 100\n diamonds.",
                    diamonds: 100
                },
                {
                    title: " Get 20 real followers in 60\n diamonds.",
                    diamonds: 60
                },
                {
                    title: " Get 40 real followers in 100\n diamonds.",
                    diamonds: 100
                },
                {
                    title: " Get 20 real followers in 60\n diamonds.",
                    diamonds: 60
                },
                {
                    title: " Get 40 real followers in 100\n diamonds.",
                    diamonds: 100
                },
            ],
            DataFromServer:null,
            Visi: false,
            Visi1: false
        };
    }
    componentDidMount() {      
        this.setState({visible:true})
        this.getData()
    }

    getData() {

       Services.getListofCoins().then((res)=>{
           if(res.selection.length>0){
               console.log(res)
                this.setState({visible:false})
                this.setState({DataFromServer:res.selection})
           }
           else{

           }
       }).catch((res)=>{
           this.setState({visible:false})
       })  
    }

    PopupMangement=()=>{
        this.setState({ Visi: false })        
        setTimeout(()=>this.setState({Visi1:true}),1000)
    }

    render() {
        return (
            <View style={styles.MAINVIW}>
                <Preloader isLoader={this.state.visible} />
                <GetFollowerPop
                    visible={this.state.Visi}
                    ClosePop={() => this.setState({ Visi: false })}
                    YesPress={() => this.PopupMangement()}
                />
                <RequestSuccess
                    visible={this.state.Visi1}
                    ClosePop={() => this.setState({ Visi1: false })}
                />

                <Header title={"Get Followers"} backPress={() => this.props.navigation.goBack()} />
{
    this.state.DataFromServer!=null?

    <FlatList
    data={this.state.DataFromServer}
    renderItem={({ item, index, ss }) =>
        <View style={[styles.VIW12, { marginTop: index == 0 ? hp(2) : 0 }]}>
            <View style={styles.VIW13}>
                <View>
                    <Text style={styles.TXT6}>{index + 1 + ". "}</Text>
                </View>
                <View>
                    <Text style={styles.TXT6}>{"Get "+ item.request+" real followers in "+item.coin}</Text>
<Text  style={styles.TXT6}>{"Diamonds."}</Text>
                </View>
            </View>
            <View style={styles.VIW14}>
                <TouchableOpacity style={[styles.VIW16]} onPress={() => this.setState({ Visi: true })}>
                    <View style={styles.VIW17}>
                        <Image source={Icons.Group} style={styles.IMG4} resizeMode="contain" />
                    </View>
                    <View style={styles.VIW18}>
                        <Image source={Icons.premium_quality} style={styles.IMG5} resizeMode="contain" />
                    </View>
                    <View style={styles.VIW19}>
                        <Text style={styles.TXT4}>{item.coin}</Text>
                    </View>

                </TouchableOpacity>
            </View>
        </View>
    }
    style={styles.FlatList}
    showsVerticalScrollIndicator={false}
/>


    :
    <></>
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
export default connect(mapStateToProps)(GetFollower);