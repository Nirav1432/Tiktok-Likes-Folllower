import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({

    MAINVIW: { flex: 1, backgroundColor: "#E9ECF2" },
    VIW1: { height: hp(12), backgroundColor: "#FE2C55", elevation: 5, flexDirection: "row", paddingLeft: hp(2) },
    VIW7: { width: "50%", flexDirection: "row" },
    VIW8: { width: "50%", justifyContent: "center", alignItems: "flex-end" },
    VIW9: { height: hp(7), backgroundColor: "#FE7E97", borderTopLeftRadius: hp(100), borderBottomLeftRadius: hp(100), width: wp(28), flexDirection: "row", padding: hp(1) },
    VIW10: { borderRadius: hp(100), backgroundColor: "#FE2C55", height: hp(5), width: hp(5), justifyContent: "center", alignItems: "center" },
    VIW11: { justifyContent: "center", height: "100%", width: "100%" },
    IMG2: { height: hp(4), width: hp(4), },
    IMG3: { height: hp(3), width: hp(3) },
    TXT4: { fontSize: hp(3), fontFamily: "LatoBlack", color: "white", left: hp(1) },
    TXT5: { fontSize: hp(3.5), fontFamily: "LatoBlack", color: "#E9ECF2" },
    INGBTN: { justifyContent: "center" },
    Title: { justifyContent: "center", left: wp(6) },
    VIW2: { height: hp(28), backgroundColor: "white", borderRadius: hp(2), margin: hp(2.5) , elevation: 10,flexDirection:"row" },
    IMG4: { alignSelf: "center", height: hp(11), width: hp(11) },
    VIW12: { justifyContent: "center", alignItems: "center", flex: 1 },
    TXT55: { color: "black", fontFamily: "LatoBold", marginTop: hp(1), fontSize: hp(2),alignSelf:"center" },
})

export default styles