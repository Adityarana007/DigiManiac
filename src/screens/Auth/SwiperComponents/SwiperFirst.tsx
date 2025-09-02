import {Image, SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import images from '../../../assets/images';
import { Colors } from '../../../assets/colors';
import fonts from '../../../assets/fonts';

const SwiperFirst = () => {
  return (
    <>
    <StatusBar backgroundColor={Colors.APP_COLOR_DARK} barStyle={'dark-content'}/>
    <View style={styles.container}>
      <Image
        style={{marginRight: 10, height: 200, width: 200}}
        // source={images.swiper?.swiperFirstIcon}
        source={{uri: 'https://digimaniac.in/wp-content/uploads/2019/06/feature2-free-img.png'}}
        resizeMode="contain"
      />
        <Text style={styles.heading}>Basic to Advanced Digital Marketing Course</Text>
        <Text style={styles.description}>Digital marketing is a rapidly growing field and job opportunities in this field are increasing daily. This course is designed to equip you with the skills and knowledge you need to start a promising career in digital marketing. Upon course completion, you will also undergo 3 months of internship, working on live projects.</Text>
    </View>
    </>


  );
};

export default SwiperFirst;

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
