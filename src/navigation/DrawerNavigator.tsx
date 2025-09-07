import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerParamList } from './types';
import BottomTabNavigator from './BottomTabNavigator';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  Image,
  Platform, 
  ScrollView
} from 'react-native';
import { Colors } from '../assets/colors';
import fonts from '../assets/fonts';
import VectorIcon from '../utils/VectorIcon';
import { IconsType } from '../utils/constants';
import images from '../assets/images';

const Drawer = createDrawerNavigator<DrawerParamList>();

const CustomDrawerContent = (props: any) => {
  const { navigation } = props;

  const menuItems = [
      { name: 'Profile', icon: 'person-outline', screen: 'MainTabs' },
    { name: 'Home', icon: 'home-outline', screen: 'MainTabs' },
    { name: 'Shift Logs', icon: 'time-outline', screen: 'MainTabs' },
    { name: 'Apply Leave', icon: 'calendar-outline', screen: 'MainTabs' },
    { name: 'Settings', icon: 'settings-outline', screen: 'MainTabs' },
    { name: 'Logout', icon: 'log-out-outline', screen: 'MainTabs' },
  ];

  const handleMenuPress = (item: any) => {
    navigation.navigate('MainTabs');
    navigation.closeDrawer();
  };

  return (
    <ScrollView style={styles.drawerContainer}>
      {/* Drawer Header */}
      <View style={styles.drawerHeader}>
        <Image source={images.common.logo} style={styles.logo} />
        <Text style={styles.headerTitle}>Employee Portal</Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => handleMenuPress(item)}
            activeOpacity={0.7}
          >
            <View style={styles.menuItemContent}>
              <VectorIcon
                type={IconsType.Ionicons}
                name={item.icon}
                color={Colors.APP_COLOR_DARK}
                size={24}
              />
              <Text style={styles.menuItemText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: Colors.APP_COLOR_DARK,
          width: 280,
        },
        drawerType: 'front',
        overlayColor: 'rgba(0, 0, 0, 0.5)',
        headerShown: false,
        swipeEnabled: true,
        drawerPosition: 'left',
      }}
    >
      <Drawer.Screen 
        name="MainTabs" 
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: Colors.white_f5f5f5    ,
  },
  drawerHeader: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 80 : 40,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  logo: {
    // width: 60,
    // height: 60,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: fonts.montserratBold,
    color: Colors.APP_COLOR_DARK,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: fonts.montserratRegular,
    color: Colors.APP_COLOR_DARK,
    opacity: 0.7,
  },
  menuContainer: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: fonts.montserratMedium,
    color: Colors.APP_COLOR_DARK,
    marginLeft: 15,
  },
});

export default DrawerNavigator;
