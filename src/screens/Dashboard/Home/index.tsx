import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import styles from './styles';
import images from '../../../assets/images';
import { Icons } from '../../../assets/icons';
import { getCategories } from '../../../api/auth';
import {Strings} from '../../../assets/strings';
// import { Icons } from '../../../assets/icons';

type Category= {
  name: string;
  photo: string | null;
}
const HomeScreen = () => {


  return (
    <SafeAreaView style={styles.container}>
      
    </SafeAreaView>
  );
};

export default HomeScreen;