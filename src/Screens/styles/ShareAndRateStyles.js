import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Fonts } from '../../Utils/fonts';

const styles = StyleSheet.create({

    MAINVIW: { flex: 1, backgroundColor: "#E9ECF2" },
    VIW1: { margin: hp(2), paddingBottom: hp(5), borderRadius: hp(2), backgroundColor: "white", elevation: 1, paddingHorizontal: hp(2) },
    VIW2: { flex: 1, justifyContent: "center", alignItems: "center" },
    IMG: { alignSelf: "center", height: hp(20), width: hp(20) },
    TXT: { fontFamily: Fonts.LatoBold, fontSize: hp(2.5) },
    Button: { height: hp(6.5), width: wp(40), borderRadius: hp(100), elevation: 5, backgroundColor: "#FE2C55", justifyContent: "center", alignItems: "center" },
    TXT3: { fontFamily: Fonts.LatoBlack, color: "white", fontSize: hp(2.5) },
    ButtonView: { flexDirection: "row", marginTop: hp(3) },
    Thankyou: { fontFamily: Fonts.LatoBold, fontSize: hp(2.5), marginVertical: hp(2), alignSelf: "center" },
    LastTXT: { fontFamily: Fonts.LatoBold, color: "#7C7A7A", fontSize: hp(2), alignSelf: "center", textAlign: "center" }
})

export default styles