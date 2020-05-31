import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Fonts } from "../../Utils/fonts";
const styles = StyleSheet.create({
    MAINVIW: { flex: 1, backgroundColor: "#E9ECF2" },
    VIW1: { height: hp(20), justifyContent: "center", alignItems: "center" },
    TXT1: { textAlign: "center", fontFamily: Fonts.LatoBlack, color: "#FE2C55", fontSize: hp(2.5) },
    TXTINPUT: { height: hp(40), fontFamily: Fonts.LatoBold, color: "#7C7A7A", fontSize: hp(2.5), marginHorizontal: hp(2), borderRadius: hp(2), elevation: 5, backgroundColor: "white", textAlignVertical: "top", padding: hp(2.3) },
    SubmitBotton: { height: hp(6), width: wp(45), borderRadius: hp(100), elevation: 5, backgroundColor: "#FE2C55", justifyContent: "center", alignItems: "center", alignSelf: "center"},
    TXT2: { fontFamily: Fonts.LatoBlack, color: "white", fontSize: hp(2.5) }
})

export default styles