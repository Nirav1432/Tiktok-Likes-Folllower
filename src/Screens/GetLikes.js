import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import styles from './styles/GetLikesStyles';
import { Icons } from "../Utils/IconManager";
import Header from '../Components/Header';


export default class GetLikes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { follower_coin: 0 }
    };
  }

  render() {
    return (
      <View style={styles.MAINVIW}>
        <Header title={"Get Likes"} backPress={() => this.props.navigation.goBack()} coin={this.state.data.follower_coin} />
        <View style={styles.VIW1}>
          <View>
            <Text>
              <Text style={styles.TXT1}>Get</Text>
              <Text style={[styles.TXT1, { color: "#FE2C55" }]}> Likes</Text>
            </Text>
          </View>
          <View>
            <Text style={styles.TXT1}>on Your Video</Text>
          </View>
        </View>
        <View style={styles.VIW2}>
          <Text>
            <Text style={styles.TXT2}>Get</Text>
            <Text style={[styles.TXT2, { color: "#FE2C55" }]}> 20</Text>
            <Text style={styles.TXT2}> real likes in </Text>
            <Text style={[styles.TXT2, { color: "#FE2C55" }]}> 60</Text>
            <Text style={styles.TXT2}> diamonds</Text>
          </Text>
        </View>
        <View style={styles.VIW5}>
          <View style={styles.VIW6}>
            <TextInput style={[styles.TXTINPUT, { borderWidth: this.state.borderWidth, borderColor: "red" }]} placeholder="Enter Tiktok Video URL" />
          </View>
          <View style={styles.VIW7}>
            <Image source={Icons.Video} style={styles.IMG} />
          </View>
        </View>
        <View style={styles.VIW8}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.BTNSTYLE}>
              <Text style={styles.TXT3}>Paste URL</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <TouchableOpacity style={styles.BTNSTYLE1}>
              <Text style={styles.TXT3}>Submit</Text>
              <Image source={Icons.premium_quality} style={styles.IMG1} resizeMode="contain" />
              <Text style={styles.TXT3}>60</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.VIW9}>
          <Text style={styles.TXT4}>Note: When you get likes on your old video then{"\n"}
              submit new video URL after 48 hours.</Text>
        </View>
      </View>
    );
  }
}
