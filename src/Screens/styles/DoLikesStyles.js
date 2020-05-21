import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Fonts } from '../../Utils/fonts';

const styles = StyleSheet.create({

    MAINVIW: { flex: 1, backgroundColor: "#E9ECF2" },
    VIW1: { height: hp(20), width: wp(30), borderRadius: hp(2), overflow: "hidden", marginTop: wp(2), marginHorizontal: wp(1), justifyContent: "flex-end", alignItems: "center" },
    VIW2: { justifyContent: "center", alignItems: "center", flexDirection: "row", width: "100%", height: "100%", right: wp(2) },
    VIW3: { justifyContent: "center", alignItems: "center", right: wp(1.5), height: hp(2.5), width: hp(2.5), position: "absolute", alignSelf: "flex-end", borderRadius: 100, backgroundColor: "#D02345" },
    VIW4: { height: "100%", justifyContent: "center" },
    VIW5: { height: hp(13), justifyContent: "center", alignItems: "center" },
    IMG: { height: "100%", width: "100%", },
    IMG2: { height: hp(2), width: hp(2), marginHorizontal: wp(1) },
    IMG3: { height: hp(1.5), width: hp(1.5) },
    TXT: { fontSize: hp(2.6), color: "white", fontWeight: "bold" },
    TXT2: { fontSize: hp(2.2), color: "white", fontFamily: Fonts.LatoBold },
    SubmitBotton: { height: hp(6), width: wp(45), borderRadius: hp(100), elevation: 5, backgroundColor: "#FE2C55", justifyContent: "center", alignItems: "center", alignSelf: "center"},
    TXT22: { fontFamily: Fonts.LatoBlack, color: "white", fontSize: hp(3) },
    BTN: { position: "absolute", height: hp(4), width: wp(23), overflow: "hidden", justifyContent: "center", backgroundColor: "#FE2C55", borderRadius: 100, bottom: wp(2) }

})

export default styles