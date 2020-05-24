import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Fonts } from "../../Utils/fonts";
const styles = StyleSheet.create({
    MAINVIW: { flex: 1, backgroundColor: "#E8EBF2" },
    InnerView1: { height: hp(28), backgroundColor: "#FE2C55", borderBottomLeftRadius: hp(100), borderBottomRightRadius: hp(100), justifyContent: "center", alignItems: "center" },
    InnerView2: { height: hp(72) },
    CMNVIW: { height: hp(9), marginTop: hp(2), elevation: 5, flexDirection: "row", backgroundColor: "white", borderTopLeftRadius: hp(100), borderBottomLeftRadius: hp(100), zIndex: 0, width: "93%", alignSelf: "flex-end" },
    IMG1: { height: hp(13), width: hp(13) },

    VIW1: { width: "30%", justifyContent: "center", alignItems: "center" },
    VIW2: { width: "70%", justifyContent: "center" },
    CMNIMG: { height: hp(3.2), width: hp(3.2) },
    CMNTXT: { fontSize: hp(2.5), fontFamily: Fonts.LatoBlack }
})

export default styles