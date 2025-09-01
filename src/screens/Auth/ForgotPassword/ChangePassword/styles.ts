import { StyleSheet } from "react-native";
import fonts from "../../../../assets/fonts";
import { Colors } from "../../../../assets/colors";

const styles = StyleSheet.create({
    container: {
        paddingVertical: 25,
        paddingHorizontal: 10,
        flex: 1,
        backgroundColor: '#fff',
      },
      welcome: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 40,
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
        alignSelf: 'flex-end',
        color: Colors.colorRed,
        marginBottom: 25,
        fontFamily: fonts.montserratSemiBold
      },
      loginButton: {
        backgroundColor:Colors.colorRed,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20
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
        borderColor: '#e53950',
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
        color: '#e53950',
        fontFamily: fonts.montserratSemiBold,
        marginLeft: 6
      },
      createAccountView:{
        flexDirection: 'row',
        justifyContent: 'center'
      },
      signupTextDescription:{
        fontFamily: fonts.montserratRegular,
        color: '#676767',
        fontSize: 12,

      } ,
      backView:{
        paddingLeft: 10
      }
});

export default styles;