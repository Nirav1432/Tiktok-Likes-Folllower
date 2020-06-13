import { StyleSheet,Platform } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Fonts } from "../../Utils/fonts";
const styles = StyleSheet.create({

    MAINVIW: { flex: 1, backgroundColor: "#E8EBF2" },
    VIW1: { height: hp(12), backgroundColor: "#FE2C55", elevation: 10, justifyContent: "center" },
    VIW7: { width: "100%", flexDirection: "row", paddingLeft: hp(1) },
    VIW8: { justifyContent: "center", alignItems: "flex-end", position: "absolute" },
    VIW9: { height: hp(7), backgroundColor: "#FE7E97", width:Platform.OS==="android"? "28%":"32%", position: "absolute", alignSelf: "flex-end", borderTopLeftRadius: hp(100), borderBottomLeftRadius: hp(100), flexDirection: "row", padding: hp(1) },
    VIW10: { borderRadius: hp(100), backgroundColor: "#FE2C55", height: hp(5), width: hp(5), justifyContent: "center", alignItems: "center" },
    VIW11: { justifyContent: "center", height: "100%", width: "100%" },
    IMG2: { height: hp(4), width: hp(4), },
    IMG3: { height: hp(3), width: hp(3) },
    TXT4: { fontSize: Platform.OS === "ios" ? hp(2) : hp(2.3), fontFamily: Fonts.LatoBlack, color: "white", left: wp(1.5) },
    TXT5: { fontSize: hp(2.5), fontFamily: Fonts.LatoBlack, color: "#E9ECF2" },
    INGBTN: { justifyContent: "center", alignItems: "center", width: wp(13) },
    Title: { justifyContent: "center", left: wp(5), },
    VIW2: { height: hp(28), backgroundColor: "white", borderRadius: hp(2), margin: hp(2.5), elevation: 10, flexDirection: "row" },
    IMG4: { alignSelf: "center", height: hp(11), width: hp(11) },
    VIW12: { justifyContent: "center", alignItems: "center", flex: 1 },
    TXT55: { color: "black", fontFamily: Fonts.LatoBold, marginTop: hp(1), fontSize: hp(2.5), alignSelf: "center" },
})

export default styles