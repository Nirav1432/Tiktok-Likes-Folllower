import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Fonts } from "../../Utils/fonts";
const styles = StyleSheet.create({

    MAINVIW: { flex: 1, backgroundColor: "#FE2C55" },


    VIW1: { height: hp(30), backgroundColor: "transparent", elevation: 5, width: "100%" },
    VIW2: { height: hp(28), backgroundColor: "white", borderRadius: hp(2), marginHorizontal: hp(2), elevation: 10, justifyContent: "center" },
    VIW3: { height: hp(24), backgroundColor: "white", borderRadius: hp(2), marginTop: hp(2), marginHorizontal: hp(2), elevation: 10, flexDirection: "row" },
    VIW33: { height: hp(24), backgroundColor: "white", borderRadius: hp(2), marginTop: hp(2), marginHorizontal: hp(2), elevation: 10, flexDirection: "row" },
    VIW333: { backgroundColor: "#E9ECF2", flex: 1, justifyContent: "flex-end", zIndex: 5, paddingBottom: hp(2) },
    VIW4: {},
    VIW5: { justifyContent: "center", backgroundColor: "red" },
    VIW6: { flexDirection: "row", justifyContent: "flex-end", flex: 1, paddingBottom: hp(3) },
    VIW7: { justifyContent: "center", alignItems: "flex-start", flex: 1, paddingLeft: hp(2) },
    VIW8: { justifyContent: "center", alignItems: "flex-end", position: "absolute", width: "20%", alignSelf: "flex-end" },
    VIW9: { height: hp(7), backgroundColor: "#FE7E97", borderTopLeftRadius: hp(100), borderBottomLeftRadius: hp(100), flexDirection: "row", padding: hp(1) },
    VIW10: { borderRadius: hp(100), backgroundColor: "#FE2C55", height: hp(5), width: hp(5), justifyContent: "center", alignItems: "center" },
    VIW11: { justifyContent: "center", height: "100%", width: "100%" },
    VIW12: { justifyContent: "center", alignItems: "center", flex: 1 },
    VIW13: { height: hp(8), width: "100%", justifyContent: "center" },



    IMG1: { height: hp(16), width: hp(16), top: hp(-8), position: "absolute", alignSelf: "center", borderRadius: hp(100), borderWidth: hp(0.3), borderColor: "#FFB9C7" },
    IMG2: { height: hp(4), width: hp(4) },
    IMG3: { height: hp(3), width: hp(3) },
    BTN: { height: hp(6), width: hp(6), justifyContent: "center" },
    IMG4: { alignSelf: "center", height: hp(10), width: hp(10) },


    TXT1: { alignSelf: "center", fontSize: hp(3), position: "absolute", fontFamily: Fonts.LatoBlack, color: "#FE2C55" },
    TXT2: { fontSize: hp(3), fontFamily: Fonts.LatoBlack, alignSelf: "center" },
    TXT3: { color: "#7C7A7A", fontFamily: Fonts.LatoBold, marginTop: hp(1), fontSize: hp(2) },
    TXT4: { fontSize: 20, fontFamily: Fonts.LatoBlack, color: "white", left: hp(1) },
    TXT5: { color: "black", textAlign: "center", fontFamily: Fonts.LatoBold, marginTop: hp(1), fontSize: hp(2), alignSelf: "center" },

    CMNVIW: { justifyContent: "flex-end", flex: 1, alignItems: "center" }


})

export default styles