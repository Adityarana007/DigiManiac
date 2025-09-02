import { StyleSheet } from "react-native";
import fonts from "../../../assets/fonts";
import { Colors } from "../../../assets/colors";

const styles = StyleSheet.create({
    container: {
        paddingVertical: 25,
        paddingHorizontal: 10,
        flex: 1,
        backgroundColor: '#fff',
      },
      welcome: {
        fontSize: 32,
        fontFamily: fonts.montserratSemiBold,
        marginBottom: 40,
        textAlign: 'center'
      },
      inputBox: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
        alignItems: 'center',
        fontFamily: fonts.montserratSemiBold
      },
      icon: {
        marginRight: 10,
      },
      eyeIcon: {
        marginLeft: 'auto',
      },
      input: {
        flex: 1,
        paddingHorizontal: 10,
        fontFamily: fonts.montserratRegular

      },
      forgot: {
        // alignSelf: 'flex-end',
        color: Colors.APP_COLOR_DARK,
        fontFamily: fonts.montserratSemiBold,

      },
      loginButton: {
        backgroundColor:Colors.APP_COLOR_DARK,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
      },
      loginText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: fonts.montserratSemiBold

      },
      orText: {
        textAlign: 'center',
        marginVertical: 25,
        color: '#555',
        fontFamily: fonts.montserratRegular

      },
      socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 25,
      },
      socialCircle: {
        width: 55,
        height: 55,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: Colors.APP_COLOR_DARK,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FCF3F6'
      },
      socialIcon: {
        width: 25,
        height: 25,
      },
      signupText: {
        textAlign: 'center',
        color: '#555',
        fontFamily: fonts.montserratRegular,
        justifyContent: 'center',
        alignItems: 'center'
      },
      signUp: {
        color: Colors.APP_COLOR_DARK,
        fontFamily: fonts.montserratSemiBold,
        marginLeft: 6
      },
      createAccountView:{
        flexDirection: 'row',
        justifyContent: 'center'
      },
      logo:{
        alignSelf: 'center'
      }
});

export default styles;