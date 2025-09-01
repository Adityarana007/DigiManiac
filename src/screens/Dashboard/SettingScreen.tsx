import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../assets/colors'
import fonts from '../../assets/fonts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

const SettingScreen = () => {
  const navigation = useNavigation();
  
  const onLogoutPress = async () => {
    AsyncStorage.clear();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Root' }],
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>SettingScreen</Text> */}
     
    </SafeAreaView>
  )
}

export default SettingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent :'center',
    alignItems: 'center'
  },
  btnContainer: {
    padding: 20,
    backgroundColor: Colors.colorRed,
    width: '30%',
    borderRadius: 12
  },
  logoutText: {
    fontSize: 16,
    fontFamily: fonts.montserratSemiBold,
    color: Colors.white
  }
})