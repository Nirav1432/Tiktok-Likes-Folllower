import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Fonts } from "../../Utils/fonts";
const styles = StyleSheet.create({
    MAINVIW: { flex: 1, backgroundColor: "#E9ECF2" },
    VIW1: { height: hp(63), backgroundColor: "#E9ECF2" },
    VIW2: { height: hp(25), justifyContent: "center", alignItems: "center" },
    userView: { width: "100%", padding: hp(2), alignItems: "flex-start" },
    messageView: { borderRadius: hp(1.2), borderColor: "#FE2C55", borderWidth: hp(0.3), width: "60%" },
    TXTUSER: { fontFamily: Fonts.LatoBlack, color: "#FE2C55", marginLeft: hp(1), marginTop: hp(1), fontSize: hp(2) },
    messageTXT: { fontFamily: Fonts.LatoBlack, fontSize: hp(1.5), marginLeft: hp(1), marginBottom: hp(1), marginRight: hp(1), marginTop: hp(0.2) },
    adminView: { width: "100%", padding: hp(2), alignItems: "flex-end" },
    TXTAdmin: { fontFamily: Fonts.LatoBlack, color: "#006CFF", marginLeft: hp(1), marginTop: hp(1), fontSize: hp(2) },
    messageViewAdmin: { borderRadius: hp(1.2), borderColor: "#006CFF", borderWidth: hp(0.3), width: "60%" },
    Button: { height: hp(6), width: wp(45), borderRadius: hp(100), elevation: 5, backgroundColor: "#FE2C55", justifyContent: "center", alignItems: "center", marginTop: hp(2) },
    TXT2: { fontFamily: Fonts.LatoBold, color: "#7C7A7A", fontSize: hp(1.8), textAlign: "center" },
    TXT3: { fontFamily: Fonts.LatoBlack, color: "white", fontSize: hp(2.8) }
})

export default styles