import {createBottomTabNavigator, TransitionPresets} from '@react-navigation/bottom-tabs';
import {BottomTabParamList} from './types';
import VectorIcon from '../utils/VectorIcon';
import {IconsType} from '../utils/constants';
import {Colors} from '../assets/colors';
import SettingScreen from '../screens/Dashboard/SettingScreen';
import WishlistScreen from '../screens/Dashboard/WishlistScreen';
import HomeScreen from '../screens/Dashboard/Home';
import { Image, Platform, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { getHitSlop } from '../utils/helpers';
import images from '../assets/images';
import fonts from '../assets/fonts';
import ProfileScreen from '../screens/Dashboard/Profile';

const Tab = createBottomTabNavigator<BottomTabParamList>();
const HeaderHeight = 40;
const getDeviceHeight = () => {
  if (Platform.OS == 'android') {
    return HeaderHeight
  } else {
    return undefined
  }
};

function BackHeader(props) {
  // if ("routeParams" in props) consoleJson(props.officeObject.isActive);
  return (
    <SafeAreaView
      style={[
        {
          // flex: deviceHasNotch ? 1 : 0,
          backgroundColor:Colors.APP_COLOR_DARK,
        },
        // Platform.OS == "ios" && { marginBottom: 28 },
      ]}
      >
      <View
        style={{
          backgroundColor: Colors.APP_COLOR_DARK,
          flexDirection: 'row',
          marginTop: 0,
          // paddingLeft: 5,
          // paddingRight: 5,
          height: HeaderHeight,
          paddingHorizontal: 10,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: 5,
            paddingTop: 5,
            flex: 1,
            paddingLeft: 5,
          }}>
          {typeof props.icon1 !== 'undefined' && (
            <TouchableOpacity
              activeOpacity={0.7}
              hitSlop={getHitSlop()}
              onPress={() => props.navigation.pop()}>
              <View style={{ padding: 10 }}>
                <Image style={{ width: 8, height: 14 }} source={props.icon1} />
              </View>
            </TouchableOpacity>
          )}
          <Text
            accessibilityRole={'text'}
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontFamily: fonts.montserratBold,
              color: Colors.white,
              paddingRight: 10,
              flex: 1,
            }}>
            {props.title}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}


const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = 'home-outline'; // Ionicons
              break;
            case 'Profile':
              iconName = 'person-outline'; // Ionicons
              break;
            case 'Settings':
              iconName = 'settings-outline'; // Ionicons
              break;
            case 'Wishlist':
              iconName = 'heart-outline'; // Ionicons
              break;
            default:
              iconName = 'ellipse-outline';
          }

          return (
            <VectorIcon
              type={IconsType.Ionicons}
              name={iconName}
              color={color}
              size={size}
            />
          );
        },
        tabBarActiveTintColor: Colors.APP_COLOR_DARK,
        tabBarInactiveTintColor: Colors.black,
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        // options={{headerShown: false}}
        options={() => ({
          header: props => (
            <BackHeader
              title={'Home'}
              // icon1={images.common.back}
              {...props}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{headerShown: false}}
      />
    
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{headerShown: false}}
      />
        <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        // options={{headerShown: false}}
        options={() => ({
          headerStyle:
          Platform.OS === 'android'
            ? {
              backgroundColor: Colors.APP_COLOR_DARK,
              shadowColor: 'transparent',
              elevation: 0, // remove shadow on Android
              shadowOpacity: 0,
              height: HeaderHeight,
            }
            : {
              backgroundColor: Colors.APP_COLOR_DARK,
              shadowColor: 'transparent',
              elevation: 0, // remove shadow on Android
              shadowOpacity: 0,
              height: getDeviceHeight(),
            },

        headerTintColor: Colors.white,
        headerTitleAlign: 'center',
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
