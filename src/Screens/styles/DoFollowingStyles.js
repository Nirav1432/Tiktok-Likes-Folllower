import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Fonts } from "../../Utils/fonts";
const styles = StyleSheet.create({

    MAINVIW: { flex: 1, backgroundColor: "#E9ECF2" },
    VIW1: { backgroundColor: "white", borderRadius: hp(2), marginHorizontal: hp(1.5), marginBottom: hp(2) },
    VIW2: { height: "100%", justifyContent: "center" },
    VIW3: { justifyContent: "center", alignItems: "center" },
    VIW4: { justifyContent: "center" },
    profileView: { flex: 1, flexDirection: "row", paddingVertical: hp(2), marginHorizontal: hp(2) },
    ImageView: { flexDirection: "row", flex: 1 },
    profileImage: { height: hp(8), width: hp(8), borderRadius: hp(100) },
    TXT: { fontSize: hp(2.6), color: "#FE2C55", fontWeight: "bold" },
    TXT1: { fontFamily: Fonts.LatoBlack, fontSize: hp(2.1) },
    TXT2: { fontFamily: Fonts.LatoBold, color: "#7C7A7A", fontSize: hp(1.6),marginTop:hp(0.2)},
    TXT22: { fontSize: hp(2.2), color: "#FE2C55", fontFamily: Fonts.LatoBold },

    BTN: { overflow: "hidden", justifyContent: "center", borderRadius: 100, bottom: wp(2) },
    VIW22: { justifyContent: "center", alignItems: "center", flexDirection: "row", alignSelf: "center" },
    IMG2: { height: hp(2), width: hp(2), marginHorizontal: wp(1.5) },

    Button: { height: hp(4), width: wp(24), borderRadius: hp(100), marginTop: hp(1), elevation: 5, backgroundColor: "#FE2C55", justifyContent: "center", alignItems: "center" },
    TXT3: { fontFamily: Fonts.LatoBlack, color: "white", fontSize: hp(2) },


    DetailView: { flex: 1, padding: hp(2), flexDirection: "row" },
    Commonview: { flex: 1, justifyContent: "center", alignItems: "center" },
    TXT4: { fontFamily: Fonts.LatoBlack, fontSize: hp(2) },
    TXT5: { fontFamily: Fonts.LatoBold, color: "#7C7A7A", fontSize: hp(2), marginTop: hp(0.5) }



})

export default styles