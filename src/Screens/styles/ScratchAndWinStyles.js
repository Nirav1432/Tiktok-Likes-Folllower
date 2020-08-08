import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Fonts } from '../../Utils/fonts';
const styles = StyleSheet.create({

    MAINVIW: { flex: 1, backgroundColor: "#E9ECF2" },
    TXT1: { fontFamily: Fonts.LatoBlack, fontSize: hp(3), alignSelf: "center", textAlign: "center", marginVertical: hp(3) },
    ScratchView: { flex: 1, justifyContent: "center" },
    View1: {
        width: wp(40),
        backgroundColor: "white",
        height: wp(40),
        marginBottom: wp(2),
        borderRadius: hp(2),
        overflow: "hidden",
        elevation: 5
    }

})

export default styles