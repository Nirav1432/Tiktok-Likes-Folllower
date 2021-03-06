import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Fonts } from "../../Utils/fonts";
const styles = StyleSheet.create({
    MAINVIW: { flex: 1 },
    Modal: { backgroundColor: "transparent", },
    VIW1: { flex: 1 },
    VIW2: { height: hp(33), backgroundColor: "white", borderRadius: hp(4), overflow: "hidden" },
    VIW3: { flexDirection: "row" },
    VIW4: { alignItems: "center", width: "100%", marginVertical: hp(3) },
    VIW5: { flexDirection: "row" },
    VIW6: { justifyContent: "center", alignItems: "flex-end" },
    VIW7: { justifyContent: "center", alignItems: "flex-start", left: hp(1) },
    VIW8: {},
    VIW9: {},
    VIW10: {},
    IMG: { height: hp(6), width: hp(6) },
    TXT1: { fontFamily: Fonts.LatoBlack, fontSize: hp(3.2), color: "white" },
    TXT2: { fontFamily: Fonts.LatoBold, color: "white", fontSize: hp(2), alignSelf: "center", textAlign: "center" },
    TXT3: { fontFamily: Fonts.LatoBlack, color: "white", fontSize: hp(2) },
    BTNS1: { marginRight: hp(2), justifyContent: "center", alignItems: "center", height: hp(5.5), width: wp(27), borderRadius: hp(100), backgroundColor: "#FE2C55", elevation: 10 },
    BTNS2: { marginLeft: hp(2), justifyContent: "center", alignItems: "center", height: hp(5.5), width: wp(27), borderRadius: hp(100), backgroundColor: "#FE2C55", elevation: 10 },
    VIWX: { justifyContent: "center", alignItems: "center", flex: 1, paddingHorizontal:wp(2) }

})

export default styles