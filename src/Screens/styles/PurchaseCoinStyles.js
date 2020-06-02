import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Fonts } from "../../Utils/fonts";

const styles = StyleSheet.create({

    MAINVIW: { flex: 1, backgroundColor: "#E9ECF2" },
    VIW12: { justifyContent: "flex-end", alignItems: "center", marginBottom: hp(5) },
    IMG4: { alignSelf: "center", height: hp(12), width: hp(12) },
    TXT6: { fontFamily: Fonts.LatoBlack, fontSize: hp(2.2) },
    VIW13: { justifyContent: "flex-start", padding: hp(2), width: "92%", height: hp(13), elevation: 10, flexDirection: "row", borderRadius: hp(2), backgroundColor: "white" },
    TXT3: { fontFamily: Fonts.LatoBlack, color: "white", fontSize: hp(3) },
    buy: { height: hp(6), bottom: hp(-3), position: "absolute", width: wp(30), justifyContent: "center", alignItems: "center", backgroundColor: "#FE2C55", borderRadius: hp(100), elevation: 10 },
    VIW14: { height: hp(25), marginBottom: hp(2), width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center" },
    VIW15: { justifyContent: "center", alignItems: "center" },
    TXT33: { fontFamily: Fonts.LatoBold, fontSize: hp(2.2), color: "#333333",top:hp(0.3) }
})

export default styles