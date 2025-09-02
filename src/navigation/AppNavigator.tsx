import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppStackParamList} from './types';
import BottomTabNavigator from './BottomTabNavigator';
import { TransitionPresets } from '@react-navigation/bottom-tabs';
import { Image, Platform, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../assets/colors';
import fonts from '../assets/fonts';
import { getHitSlop } from '../utils/helpers';
import images from '../assets/images';
import EditProfileScreen from '../screens/Dashboard/Profile/EditProfile';

const HeaderHeight = 40;
const getDeviceHeight = () => {
  if (Platform.OS == 'android') {
    return HeaderHeight
  } else {
    return undefined
  }
};
const Stack = createNativeStackNavigator<AppStackParamList>();
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
      forceInset={{ bottom: 'never' }}
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
            paddingRight: 20,
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

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Tabs">
      <Stack.Screen
        name="Tabs"
        component={BottomTabNavigator}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={() => ({
        //   headerStyle:
        //   Platform.OS === 'android'
        //     ? {
        //       backgroundColor: Colors.APP_COLOR_DARK,
        //       shadowColor: 'transparent',
        //       elevation: 0, // remove shadow on Android
        //       shadowOpacity: 0,
        //       height: HeaderHeight,
        //     }
        //     : {
        //       backgroundColor: Colors.APP_COLOR_DARK,
        //       shadowColor: 'transparent',
        //       elevation: 0, // remove shadow on Android
        //       shadowOpacity: 0,
        //       height: getDeviceHeight(),
        //     },

        // headerTintColor: Colors.white,
        // headerTitleAlign: 'center',
        header: props => (
          <BackHeader
              title={'Edit Profile'}
              icon1={images.common.back}
              {...props}
          />
      ),
        })}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
