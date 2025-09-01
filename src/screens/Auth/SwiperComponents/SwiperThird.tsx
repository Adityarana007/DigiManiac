import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import images from '../../../assets/images';
import { Colors } from '../../../assets/colors';
import fonts from '../../../assets/fonts';

const SwiperThird = () => {
  return (

    <View style={styles.container}>
      <Image
        style={{marginRight: 10}}
        source={images.swiper?.swiperThirdIcon}
        resizeMode="contain"
      />
        <Text style={styles.heading}>Get Your Order</Text>
        <Text style={styles.description}>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</Text>
    </View>

  );
};

export default SwiperThird;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading:{
        color: Colors.black,
        fontSize: 24,
        fontFamily: fonts.montserratExtraBold,
        textAlign: 'center'
    },
    description:{
        color: Colors.grey_A8A8A9,
        fontSize: 14,
        fontFamily: fonts.montserratSemiBold,
        marginTop: 10,
        textAlign: 'center'
    },
});
