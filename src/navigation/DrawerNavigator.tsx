import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerParamList } from './types';
import BottomTabNavigator from './BottomTabNavigator';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  ScrollView,
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
    { name: 'Profile', icon: 'person-outline', type: 'tab', screen: 'Profile' },
    { name: 'Shift Logs', icon: 'time-outline', type: 'tab', screen: 'Logs' },
    { name: 'Apply Leave', icon: 'calendar-outline', type: 'stack', screen: 'SelectLeaveDate' },
    { name: 'Settings', icon: 'settings-outline', type: 'tab', screen: 'Home' },
    { name: 'Logout', icon: 'log-out-outline', type: 'tab', screen: 'Home' },
  ];

  const handleMenuPress = (item: any) => {
    navigation.closeDrawer();

    if (item.type === 'tab') {
      // Navigate to a specific tab screen within MainTabs
      navigation.navigate('MainTabs', { screen: item.screen });
    } else if (item.type === 'stack') {
      // Navigate to a stack screen (parent navigator - AppStack)
      const parent = navigation.getParent();
      if (parent) {
        parent.navigate(item.screen);
      }
    }
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

const drawerContent = (props: any) => <CustomDrawerContent {...props} />;

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={drawerContent}
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
    backgroundColor: Colors.white_f5f5f5,
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
