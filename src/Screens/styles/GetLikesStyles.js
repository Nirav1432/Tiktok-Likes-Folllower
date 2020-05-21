import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Fonts } from '../../Utils/fonts'

const styles = StyleSheet.create({

    MAINVIW: { backgroundColor: "#E9ECF2", flex: 1 },
    TXT1: { fontFamily: Fonts.LatoBlack, alignSelf: "center", fontSize: hp(5) },
    TXT2: { fontFamily: Fonts.LatoBlack, alignSelf: "center", fontSize: hp(3) },
    VIW1: { alignItems: "center", height: hp(20), justifyContent: "center" },
    VIW2: { alignItems: "center" },
    VIW5: { justifyContent: "center", alignItems: "center", marginHorizontal: hp(3), flexDirection: "row", marginTop: hp(6), padding: hp(1), backgroundColor: "white", borderRadius: hp(100) },
    TXTINPUT: { paddingVertical: 0, height: hp(7.5), width: "100%", backgroundColor: "white", borderRadius: hp(100), paddingHorizontal: hp(4), fontFamily: "LatoBold", fontSize: hp(2.5), color: "#7C7A7A", },
    VIW6: { width: "80%" },
    VIW8: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: hp(6), marginHorizontal: hp(3) },
    VIW7: { width: "20%", alignItems: "center" },
    VIW9: { marginTop: hp(6), marginHorizontal: hp(3) },
    IMG: { height: hp(7), width: hp(7), },
    IMG1: { height: hp(3), width: hp(3), marginHorizontal: hp(1) },
    BTNSTYLE: { height: hp(6), width: wp(42), borderRadius: hp(100), backgroundColor: "#006CFF", justifyContent: "center", alignItems: "center" },
    TXT3: { fontFamily: Fonts.LatoBlack, color: "white", fontSize: hp(2.5) },
    BTNSTYLE1: { height: hp(6), flexDirection: "row", width: wp(42), borderRadius: hp(100), backgroundColor: "#FE2C55", justifyContent: "center", alignItems: "center" },
    TXT4: { textAlign: "center", fontFamily: Fonts.LatoBold, color: "#7C7A7A", fontSize: hp(2),lineHeight:hp(4) }


})

export default styles