import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Fonts } from "../../Utils/fonts";
const styles = StyleSheet.create({
    MAINVIW: { flex: 1, backgroundColor: "#E9ECF2" },


    VIW1: { height: hp(30), backgroundColor: "#FE2C55", elevation: 5, flexDirection: "row", paddingLeft: hp(2) },
    VIW2: { height: hp(28), backgroundColor: "white", borderRadius: hp(2), marginHorizontal: hp(2), top: hp(-14), elevation: 10 },
    VIW3: { height: hp(24), backgroundColor: "white", borderRadius: hp(2), marginTop: hp(2), marginHorizontal: hp(2), top: hp(-14), elevation: 10, flexDirection: "row" },
    VIW33: { height: hp(24), backgroundColor: "white", borderRadius: hp(2), marginTop: hp(2), marginHorizontal: hp(2), elevation: 10, flexDirection: "row" },

    VIW4: { height: "30%" },
    VIW5: { height: "20%", justifyContent: "center" },
    VIW6: { height: "50%", flexDirection: "row", justifyContent: "center" },
    VIW7: { width: "50%", justifyContent: "center", alignItems: "flex-start" },
    VIW8: { width: "50%", justifyContent: "center", alignItems: "flex-end" },
    VIW9: { height: hp(7), backgroundColor: "#FE7E97", borderTopLeftRadius: hp(100), borderBottomLeftRadius: hp(100), width: wp(28), flexDirection: "row", padding: hp(1) },
    VIW10: { borderRadius: hp(100), backgroundColor: "#FE2C55", height: hp(5), width: hp(5), justifyContent: "center", alignItems: "center" },
    VIW11: { justifyContent: "center", height: "100%", width: "100%" },
    VIW12: { justifyContent: "center", alignItems: "center", flex: 1 },
    VIW13: { height: hp(8), flexDirection: "row"},



    IMG1: { height: hp(18), width: hp(18), top: hp(-9), alignSelf: "center", borderRadius: hp(100), borderWidth: hp(0.3), borderColor: "#FFB9C7" },
    IMG2: { height: hp(4), width: hp(4), },
    IMG3: { height: hp(3), width: hp(3) },
    BTN:{ height: hp(6), width: hp(6),justifyContent:"center" },
    IMG4: { alignSelf: "center", height: hp(11), width: hp(11) },


    TXT1: { alignSelf: "center", fontSize: hp(2.5), fontFamily: Fonts.LatoBlack, color: "#FE2C55", marginTop: hp(3) },
    TXT2: { fontSize: hp(3), fontFamily: Fonts.LatoBlack, alignSelf: "center" },
    TXT3: { color: "#7C7A7A", fontFamily: Fonts.LatoBold, marginTop: hp(1), fontSize: hp(2) },
    TXT4: { fontSize: hp(3), fontFamily: Fonts.LatoBlack, color: "white", left: hp(1) },
    TXT5: { color: "black",textAlign:"center", fontFamily: Fonts.LatoBold, marginTop: hp(1), fontSize: hp(2), alignSelf: "center" },

    CMNVIW: { justifyContent: "center", flex: 1, alignItems: "center" }


})

export default styles