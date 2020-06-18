import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Fonts } from "../../Utils/fonts";

const styles = StyleSheet.create({

    MAINVIW: { flex: 1, backgroundColor: "#E9ECF2" },
    TXT1: { fontFamily: Fonts.LatoBlack, color: "#FE2C55", fontSize: hp(3), alignSelf: "center", marginTop: hp(6) },
    TXT2: { fontFamily: Fonts.LatoBlack, fontSize: hp(2.5), lineHeight: hp(3.5), textAlign: "center", alignSelf: "center", marginTop: hp(2) },
    Timer: { height: hp(8.5), flexDirection: "row", width: wp(60), padding: hp(1.5), backgroundColor: "#FE2C55", borderRadius: hp(100), elevation: 10, alignSelf: "center", marginTop: hp(8), alignItems: "center" },
    watch: { height: hp(6), width: hp(6) },
    watchView: { justifyContent: "center", alignItems: "center", position: "absolute", left: hp(2) },
    timerTExt: { fontFamily: Fonts.LatoBlack, color: "white", fontSize: hp(3), left: wp(1) },

    IMG1: { height: hp(3.5), width: hp(3.5) },
    watchView2: { justifyContent: "center", height: hp(6), width: hp(6), borderColor: "white", alignItems: "center", position: "absolute", left: hp(2), borderRadius: hp(100), borderWidth: hp(0.3) },
    Timer2: { height: hp(9), flexDirection: "row", width: wp(70), backgroundColor: "#FE2C55", borderRadius: hp(100), elevation: 10, alignSelf: "center", marginTop: hp(8), alignItems: "center", padding: 0 },


})

export default styles