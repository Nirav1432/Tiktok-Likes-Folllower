import { StyleSheet, Dimensions } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Fonts } from "../../Utils/fonts";
const styles = StyleSheet.create({
    MAINVIW: {
        flex: 1,
        backgroundColor: "#E9ECF2",
    },
    VIW1: { backgroundColor: "#E9ECF2", justifyContent: "flex-end", height: hp(88) },
    VIW2: { height: hp(15), marginBottom: hp(2), flexDirection: "row", padding: hp(2), borderRadius: hp(1), backgroundColor: "white", elevation: 5, marginHorizontal: hp(2) },
    VIW3: { justifyContent: "center", flex: 6, },
    VIW4: { justifyContent: "center", alignItems: "flex-start", flex: 4 },
    flat: { backgroundColor: "#E9ECF2" },
    CMNVIW: { justifyContent: "center", alignItems: "flex-end", flex: 4 },
    IMG: { height: hp(10), width: hp(10), borderRadius: hp(100) },
    TXT: { fontFamily: Fonts.LatoBlack, fontSize: hp(2) },
    TXT1: { fontSize: hp(1.6), fontFamily: Fonts.LatoBlack, color: "white" },
    BTN: { justifyContent: 'center', elevation: 10, alignItems: 'center', height: hp(4.6), backgroundColor: "#FE2C55", width: wp(25), borderRadius: hp(100) }
})

export default styles