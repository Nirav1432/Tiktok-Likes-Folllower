import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {Fonts} from '../../Utils/fonts'
const styles = StyleSheet.create({
    MAINVIW: { flex: 1, backgroundColor: "#E9ECF2", alignItems: "center", justifyContent: "flex-end" },
    VIW1: { height: "100%", width: "100%", backgroundColor: "#FA647F", opacity: 0.5, borderBottomLeftRadius: hp(100), borderBottomRightRadius: hp(100) },
    VIW2: { height: "50%",overflow:"hidden", justifyContent: "flex-start", alignItems: "center", width: "100%",},
    IMG1: { height: hp(11.53), width: hp(11.53), borderRadius: hp(0),position:"absolute" },
    IMG2: { height: "100%", width: "100%", borderBottomLeftRadius: hp(100), borderBottomRightRadius: hp(100) },

    VIW3: { width: "100%", justifyContent:"center", alignItems: "center", height: "50%"},
    VIW4: { justifyContent: "center", alignItems: "center", flexDirection: "row" },
    VIW5: { justifyContent: "center", alignItems: "center", marginVertical: hp(3) },
    VIW6: { justifyContent: "center", alignItems: "center" },
    TXT1: { fontSize: hp(3), fontFamily: Fonts.LatoBold, color: "black" },
    TXT2: { fontSize: hp(3), fontFamily:Fonts.LatoBold, color: "#FE2C55" },
    TXTINPUT: { paddingVertical: 0, height: hp(8), width: wp(83), backgroundColor: "white", borderRadius: hp(100), elevation: 10, paddingHorizontal: hp(4), fontFamily: Fonts.LatoBold, fontSize: hp(2.3), color: "#7C7A7A", },
    SRCH: { height: hp(7), width: wp(56), borderRadius: hp(100), backgroundColor: "#FE2C55", justifyContent: "center", alignItems: "center", elevation: 5 },
    TXT3: { fontSize: hp(2.3), fontFamily: Fonts.LatoBold, color: "#E9ECF2" },
})
export default styles