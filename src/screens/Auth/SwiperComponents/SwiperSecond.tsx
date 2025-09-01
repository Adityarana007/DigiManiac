import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import images from '../../../assets/images';
import { Colors } from '../../../assets/colors';
import fonts from '../../../assets/fonts';

const SwiperSecond = () => {
  return (

    <View style={styles.container}>
      <Image
        style={{marginRight: 10, height: 200, width: 200}}
        source={{uri: 'https://digimaniac.in/wp-content/uploads/2019/06/feature1-free-img.png'}}
        resizeMode="contain"
      />
        <Text style={styles.heading}>Graphic Designing Course</Text>
        <Text style={styles.description}>Graphic design is a type of communication that creates visual material for print and digital media, among other media, by combining colors, shapes, images, and words. Good designs are essential to the success of any organization because they provide information that motivates and educates customers. You need to enroll in the best graphic designing course at Digimaniac Institute in Kurukshetra.</Text>
    </View>

  );
};

export default SwiperSecond;

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
        textAlign: 'center',
        marginHorizontal: 10

    },
});
