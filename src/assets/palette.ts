
import { StyleSheet, Dimensions, Platform } from 'react-native';
import fonts from './fonts';
const { width, height } = Dimensions.get('window');
import DeviceInfo from 'react-native-device-info';
import { dynamicWidth } from '../utils/dynamicHeightWidth';
import { Colors } from './colors';
let deviceHasNotch = DeviceInfo.hasNotch();

const palette = {
  view: StyleSheet.create({
    superCenterParent: {
      backgroundColor: Colors.APP_COLOR_DARK,
      flex: 1,
      justifyContent: 'center',
    },
    superParent: {
      backgroundColor: Colors.APP_COLOR_DARK,
      flex: 1,
    },
    roundcardView: {
      backgroundColor: Colors.white,
      borderRadius: 20,
      margin: dynamicWidth(20),
      flex: 1,
      overflow: 'hidden',
    },

    roundTopcardView: {
      backgroundColor: Colors.white,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      marginTop: dynamicWidth(20),
      marginRight: dynamicWidth(20),
      marginLeft: dynamicWidth(20),
      flex: 1,
    },

    // cardpaddingHolder: {
    //   paddingTop: 0,
    //   paddingLeft: 20,
    //   paddingRight: 20,
    // },

    noMargincardView: {
      backgroundColor: Colors.CARD_BACKGROUND,
      borderTopRightRadius: 25,
      borderTopLeftRadius: 25,
      flex: 1,
      marginTop: 20,
    },

    cardWithAllRadius: {
      backgroundColor: Colors.CARD_BACKGROUND,
      borderRadius: 25,
      flex: 1,
      marginTop: 20,
    },

    withoutMarginCardView: {
      backgroundColor: Colors.CARD_BACKGROUND,
      borderTopRightRadius: 25,
      borderTopLeftRadius: 25,
      flex: 1,
    },
    shadowView: {
      borderRadius: 20,
      shadowColor: '#000000',
      shadowOffset: {
        width: Platform.OS === 'android' ? 4 : 0.2,
        height: Platform.OS === 'android' ? 4 : 0.2,
      },
      shadowRadius: 15,
      shadowOpacity: 0.08,
      elevation: 15,

    },

    cardViewShadow: {
      backgroundColor: 'rgb(255,255,255)',
      borderRadius: 20,
      shadowColor: '#000000',
      shadowOffset: {
        width: Platform.OS === 'android' ? 4 : 0.2,
        height: Platform.OS === 'android' ? 4 : 0.2,
        
      },
      shadowRadius: 15,
      shadowOpacity: 0.08,
      elevation: 15,
      // elevation: Platform.OS === 'android' ? 0 : 15,
    },

    cardViewShadowAndroid: {
      marginHorizontal: 20,
      marginTop: 5,
      marginBottom: 5,
      borderRadius: 20,
      backgroundColor: 'rgb(255,255,255)',
    },

    cardView: {
      backgroundColor: Colors.white,
      borderRadius: 20,
      flexDirection: 'row',
      paddingStart: 20,
      paddingEnd: 15,
      paddingTop: 20,
      paddingBottom: 22,
      marginBottom: 10,
    },
    middleDiv: {
      flex: 1,
      flexDirection: 'column',
      marginStart: 12,
      marginEnd: 16,
    },
    cardpaddingHolder: {
      paddingTop: 20,
      paddingLeft: 20,
      paddingRight: 20,
    },
  }),

  dropdown: StyleSheet.create({
    dropdowItemStyle: {
      justifyContent: 'flex-start',
      paddingTop: 0,
      height: 28,
    },
    dropDownStyle: {
      // backgroundColor: "#fafafa",
      // paddingBottom: 5,
      // borderRadius: 10,
    },
  }),

  searchView: StyleSheet.create({
    searchViewStyle: {
      alignItems: 'center',
      height: 30,
      overflow: 'hidden',
      flexDirection: 'row',
      marginEnd: 10,
      marginStart: 10,
      justifyContent: 'space-between',
    },

    searchCross: {
      height: 30,
      width: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),

  button: StyleSheet.create({
    default: {
      flex: 1,
      height: 45,
      justifyContent: 'center',
      borderBottomLeftRadius: 7,
      borderTopLeftRadius: 7,
      borderBottomRightRadius: 7,
      borderTopRightRadius: 7,
      backgroundColor: Colors.APP_COLOR_SECONDARY,

      borderWidth: 0,
      borderRadius: 0,
    },
    defaultDisabled: {
      flex: 1,
      height: 45,
      justifyContent: 'center',
      borderBottomLeftRadius: 7,
      borderTopLeftRadius: 7,
      borderBottomRightRadius: 7,
      borderTopRightRadius: 7,
      backgroundColor: Colors.APP_COLOR_SECONDARY,
      borderWidth: 0,
      borderRadius: 0,
    },
    leftRounded: {
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,
      marginRight: 1,
    },
    rightRounded: {
      borderBottomLeftRadius: 0,
      borderTopLeftRadius: 0,
      marginLeft: 1,
    },

    buttonStyle: {
      justifyContent: 'center',
      height: 55,
      alignItems: 'center',
      backgroundColor: Colors.APP_COLOR_SECONDARY,
      borderRadius: 27.5,
      width: width - 80,
    },
  }),
  text: StyleSheet.create({
    title: {
      marginTop: 30,
      fontSize: 18,
      fontFamily: fonts.montserratMedium,
      color: Colors.DARK_GREY_TITLE,
    },
    subTitle: {
      marginTop: 15,
      fontSize: 14,
      fontFamily: fonts.montserratRegular,
      color: Colors.TEXT_WHITE,
    },
    inputFieldTitle: {
      marginBottom: 14,
      fontSize: 14,
      fontFamily: fonts.montserratMedium,
      color: Colors.TEXT_WHITE,
    },
    buttonTextStyle: {
      fontFamily: fonts.montserratMedium,
      letterSpacing: 0.5,
      color: Colors.white,
      fontSize: 14,
    },

    underlinetext: {
      fontFamily: fonts.montserratMedium,
      fontSize: 13,
      letterSpacing: 0.23,
      textDecorationLine: 'underline',
      lineHeight: 17,
      marginLeft: 5,
      color: Colors.colorRed,
      alignSelf: 'center',
      flex: 3,
    },
    validationtext: {
      fontFamily: fonts.montserratMedium,
      fontSize: 12,
      color: Colors.validation_red,
    },
    subHeadingNotchMargin: {
      marginTop: deviceHasNotch ? 10 : 5,
    },
    subHeading: {
      fontFamily: fonts.montserratMedium,
      fontSize: 15,
      letterSpacing: 0,
      color: Colors.black,
      alignSelf: 'center',

    },
  }),

  input: StyleSheet.create({
    validationtext: {
      fontFamily: fonts.montserratMedium,
      fontSize: 12,
      color: Colors.validation_red,
    },
    sectionStyle: {
      borderBottomWidth: 1,
      borderBottomColor: 'rgb(215,215,222)',
      marginRight: 5,
      paddingBottom: 0,
    },
    inputSelectedLabel: {
      fontFamily: fonts.montserratMedium,
      fontSize: 13,
      color: 'rgb(135,146,141)',
      letterSpacing: 0.23,
      marginTop: 15,
    },
    inputText: {
      fontFamily: fonts.montserratMedium,
      fontSize: 14,
      color: Colors.black,
      flex: 1,
      paddingTop: 5,
      paddingBottom: Platform.OS === 'android' ? 0 : 5,
      paddingLeft: 0,
      textAlignVertical: 'top',
    },
  }),
  password: StyleSheet.create({
    row: {
      flexDirection: 'row',
    },
    eye: {
      width: 24,
      resizeMode: 'contain',
      tintColor: 'grey',
    },
    border: {
      flex: 1,
      height: 1,
      backgroundColor: 'rgba(0,0,0,0.1)',
      marginBottom: 30,
    },
  }),
  forgotPasswordFlow: StyleSheet.create({
    content: {
      flex: 1,
      paddingLeft: dynamicWidth(30),
      paddingRight: dynamicWidth(30),
      paddingTop: 10,

      alignItems: 'stretch',
      alignContent: 'space-between',
      backgroundColor: 'white',
      borderTopEndRadius: 20,
      borderTopStartRadius: 20,
    },
    header: {
      paddingLeft: dynamicWidth(30),
      paddingRight: dynamicWidth(30),
      paddingTop: 10,
      marginBottom: 20,
      alignItems: 'stretch',
    },
    parent: {
      flex: 1,
      alignItems: 'stretch',
      width: '100%',
    },
    subContent: { flex: 1 },

    menuOptions: {
      shadowColor: 'black',
      shadowOpacity: 0.3,
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 5,
      padding: 5,
      borderRadius: 10,
      width: 150,
      marginTop: 30,
    },

    menuItemtext: {
      fontFamily: fonts.montserratRegular,
      fontSize: 12,
      color: 'rgb(119,146,143)',
      letterSpacing: 0,
      borderBottomWidth: 1,
      borderColor: '#d3d3d3',
      paddingBottom: 5,
    },
  }),

  menu: StyleSheet.create({
    menuOptions: {
      shadowRadius: 5,
      padding: 5,
      borderRadius: 10,
      shadowColor: 'black',
      shadowOpacity: 0.3,
      shadowOffset: { width: 0, height: 0 },
      width: 50,
      marginTop: 30,
    },
    menuItemtext: {
      fontFamily: fonts.montserratMedium,
      fontSize: 14,
      borderBottomWidth: 1,
      borderColor: '#d3d3d3',
      paddingBottom: 5,
      color: Colors.black,
    },
    filterText: {
      fontFamily: fonts.montserratMedium,
      color: Colors.black,
      fontSize: 14,
      letterSpacing: 0.0,
    },
  }),

  radio: StyleSheet.create({
    inputSelectedLabelRadio: {
      fontFamily: fonts.montserratMedium,
      fontSize: 14,
      color: Colors.black,
      letterSpacing: 0.23,
    },
  }),

  rejectionpopup: StyleSheet.create({
    modal: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(73,110,116,0.9)',

      flex: 1,
    },

    roundedview: {
      paddingTop: 10,
      paddingBottom: 20,
      paddingLeft: 20,
      paddingRight: 20,
      borderRadius: 20,
      width: Dimensions.get('screen').width - 40,
      backgroundColor: '#fff',
    },
    titletext: {
      fontFamily: fonts.montserratMedium,
      fontSize: 12,
      color: 'rgb(88,126,133)',
    },

    text: {
      fontFamily: fonts.montserratMedium,
      fontSize: 12,
      color: 'rgb(47,50,69)',
    },
    inputText: {
      height: 70,
      fontFamily: fonts.montserratMedium,
      fontSize: 14,
      color: Colors.black,
      paddingLeft: 0,
    },
    buttonStyle: {
      backgroundColor: Colors.APP_COLOR_SECONDARY,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 35,
      height: 50,
      borderRadius: 22,
    },
    buttonTextStyle: {
      fontFamily: fonts.montserratMedium,
      fontSize: 14,
      letterSpacing: 0.5,
      color: Colors.white,
    },

    inputSelectedLabel: {
      fontFamily: fonts.montserratMedium,
      fontSize: 12,
      color: Colors.colorRed,
      letterSpacing: 0.23,
    },
    inputUnSelectedLabel: {
      fontFamily: fonts.montserratMedium,
      fontSize: 12,
      color: Colors.UNSELECTED_LABEL_COLOR,
      letterSpacing: 0.23,
    },
  }),

  dropdownnew: StyleSheet.create({
    dropDownMenuOptionsContainerStyle: {
      color: Colors.MAIN_SPINNER_ITEM_TEXT_COLOR,
      fontFamily: fonts.montserratMedium,
      fontSize: 14,
      borderRadius: 10,
      fontWeight: 'bold',

      shadowColor: '#000000',
      shadowOffset: {
        width: Platform.OS === 'android' ? 4 : 0.2,
        height: Platform.OS === 'android' ? 4 : 0.2,
      },
      shadowRadius: 15,
      shadowOpacity: 0.08,
      elevation: 15,
    },


    dropDownPopUpTextView: {
      fontFamily: fonts.montserratRegular,
      fontSize: 12,
      marginTop: 10,
      marginBottom: 10,
      paddingRight: 15,
      paddingLeft: 15,
      color: '#2a4642',
    },

    dropDownFullWidthPopUpTextView: {
      fontFamily: fonts.montserratRegular,
      fontSize: 12,
      flex: 1,
      width: Dimensions.get('window').width - 90,
      marginTop: 10,
      marginBottom: 10,
      paddingRight: 15,
      paddingLeft: 15,
      color: '#2a4642',
    },

    dropDownPopUpDividerView: {
      backgroundColor: '#E7EEE0',
      marginRight: 15,
      marginLeft: 15,
      height: 0.8,
    },
    dropDownPopUpDividerViewLastItem: {
      height: 1,
    },
  }),
};

export default palette;
