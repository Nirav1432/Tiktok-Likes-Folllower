
import { InterstitialAdManager, AdSettings } from 'react-native-fbads';

export function custom_number_format(labelValue) {

    return Math.abs(Number(labelValue)) >= 1.0e+9

        ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(1) + "B"
        // Six Zeroes for Millions 
        : Math.abs(Number(labelValue)) >= 1.0e+6

            ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(1) + "M"
            // Three Zeroes for Thousands
            : Math.abs(Number(labelValue)) >= 1.0e+3

                ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(1) + "K"

                : Math.abs(Number(labelValue));
}

export const InterStrialAds = async () => {

    let Success = false

    await InterstitialAdManager.showAd("979168055864310_979168595864256")
        .then((didClick) => {
            Success = true
        })
        .catch(error => {
            Success = false
        });

    // await setTimeout(() => {

    // }, 3000)

    return Success;

}