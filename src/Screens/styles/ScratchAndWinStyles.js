import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Fonts } from '../../Utils/fonts';
const styles = StyleSheet.create({

    MAINVIW: { flex: 1, backgroundColor: "#E9ECF2" },
    TXT1: { fontFamily: Fonts.LatoBlack, fontSize: hp(3), alignSelf: "center", textAlign: "center", marginVertical: hp(3) },
    ScratchView: { flex: 1, }

})

export default styles