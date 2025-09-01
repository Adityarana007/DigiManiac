import { StyleSheet } from "react-native";
import fonts from "../../../assets/fonts";
import { Colors } from "../../../assets/colors";
import palette from "../../../assets/palette";

const styles = StyleSheet.create({
    mainCardView: palette.view.noMargincardView,
    parentView: palette.view.superParent,
    cardView: palette.view.roundcardView,
    shadowView: palette.view.shadowView,
    title: {
      color: Colors.white,
      fontFamily: fonts.montserratBold,
      fontSize: 20,
      textAlign: 'center'
    },
    container: { flex: 1, backgroundColor: '#fff' },
    cardpaddingHolder: {
      paddingTop: 0,
      paddingLeft: 20,
      paddingRight: 20,
    },
    // New styles for profile screen
    header: {
      alignItems: 'center',
      marginBottom: 30,
    },
    profilePhotoSection: {
      alignItems: 'center',
      marginBottom: 30,
    },
    profilePhotoContainer: {
      position: 'relative',
      marginBottom: 15,
    },
    profilePhoto: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 3,
      borderColor: '#007AFF',
    },
    defaultProfilePhoto: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: '#f0f0f0',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 3,
      borderColor: Colors.colorRed,
    },
    editPhotoButton: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: Colors.colorRed,
      width: 35,
      height: 35,
      borderRadius: 17.5,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 3,
      borderColor: '#fff',
    },
    changePhotoButton: {
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    changePhotoText: {
      color: Colors.colorRed,
      fontSize: 16,
      fontWeight: '600',
    },
    userInfoSection: {
      marginBottom: 30,
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
      marginBottom: 8,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 12,
      backgroundColor: '#f9f9f9',
    },
    inputIcon: {
      marginRight: 10,
    },
    inputText: {
      flex: 1,
      fontSize: 16,
      color: '#333',
    },
    saveButton: {
      backgroundColor: Colors.colorRed,
      paddingVertical: 15,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 20,
    },
    saveButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '600',
    },
    userimage: {
        height: 89,
        width: 89,
        borderRadius: 44.5,
      },
      btnContainer: {
        backgroundColor: Colors.colorRed,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
      },
      logoutText: {
        fontSize: 16,
        fontFamily: fonts.montserratSemiBold,
        color: Colors.white
      }
});

export default styles;