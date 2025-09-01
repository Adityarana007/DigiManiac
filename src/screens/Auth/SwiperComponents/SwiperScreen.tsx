import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import Swiper from 'react-native-swiper';
import SwiperFirst from './SwiperFirst';
import fonts from '../../../assets/fonts';
import {Colors} from '../../../assets/colors';
import SwiperSecond from './SwiperSecond';
import SwiperThird from './SwiperThird';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/types';

const {width, height} = Dimensions.get('window');

type SwiperRefType = {
  scrollBy: (index: number, animated?: boolean) => void;
};

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const SwiperScreen = () => {
  const swiperRef = useRef<SwiperRefType | null>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const navigation = useNavigation<NavigationProp>();

  const goNext = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
      console.log('first___', swiperRef.current);
    }
  };

  const goPrev = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(-1);
    }
  };

  const goToLogin = () => {
    navigation.navigate('Login')
  };
  const onSkipPress = () => {
    navigation.navigate('Login')
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.colorRed} barStyle={'dark-content'}/>
      <View style={styles.countSkipView}>
        <View style={styles.countView}>
        <Text style={styles.pageCount}>{pageIndex + 1}</Text>
        <Text style={styles.pageCountTotal}>/2</Text>
        </View>
        <TouchableOpacity onPress={onSkipPress}>
          <Text style={styles.buttonText}>Skip</Text>
        </TouchableOpacity>
      </View>
      <Swiper
        ref={swiperRef}
        loop={false}
        showsPagination={true}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        onIndexChanged={indx => {
          console.log('indxx', indx);
          setPageIndex(indx);
        }}>
        <View style={styles.slide}>
          <SwiperFirst />
        </View>
        <View style={styles.slide}>
          <SwiperSecond />
        </View>
        {/* <View style={styles.slide}>
          <SwiperThird />
        </View> */}
      </Swiper>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={goPrev}
          disabled={pageIndex === 0}>
          <Text
            style={[
              styles.buttonText,
              {color: pageIndex === 0 ? Colors.grey_C4C4C4 : Colors.colorRed},
            ]}>
            Prev
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={pageIndex ===1 ? goToLogin : goNext}>
          <Text style={styles.buttonText}>{ pageIndex === 1 ? 'Get Started' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SwiperScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width,
    backgroundColor: Colors.white_f5f5f5,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  dot: {
    backgroundColor: '#bbb',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: Colors.black,
    width: 40,
    height: 10,
    borderRadius: 5,
    margin: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    backgroundColor: Colors.white_f5f5f5,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  buttonText: {
    color: Colors.colorRed,
    fontFamily: fonts.montserratSemiBold,
  },
  countSkipView:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: Platform.OS === 'android' ? 40 : 10
  },
  countView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pageCount: {
    color: Colors.black,
    fontFamily: fonts.montserratSemiBold,
    fontSize: 18,
  },
  pageCountTotal: {
    color: Colors.grey_A0A0A1,
    fontFamily: fonts.montserratSemiBold,
    fontSize: 18,
  },
});
