import { StyleSheet } from "react-native";
import fonts from "../../../../assets/fonts";
import { Colors } from "../../../../assets/colors";
import palette from "../../../../assets/palette";

const styles = StyleSheet.create({
    // Original container and card styles
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
    
    // Header buttons
    backButton: {
        color: Colors.white,
        fontSize: 16,
        fontFamily: fonts.montserratMedium,
        marginLeft: 20,
    },
    
    saveButton: {
        color: Colors.white,
        fontSize: 16,
        fontFamily: fonts.montserratBold,
        marginRight: 20,
    },
    
    // Profile photo section (same as Profile screen)
    profilePhotoSection: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 20,
    },
    
    profilePhotoContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    
    profilePhoto: {
        width: 140,
        height: 140,
        borderRadius: 70,
        borderWidth: 4,
        borderColor: Colors.white,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 8,
    },
    
    defaultProfilePhoto: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: Colors.white,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 8,
    },
    
    defaultUserIcon: {
        // tintColor: '#999',
    },
    
    editPhotoButton: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: Colors.APP_COLOR_DARK,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: Colors.white,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    
    cameraIcon: {
        width: 20,
        height: 20,
        tintColor: Colors.white,
    },
    
    changePhotoButton: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: 'rgba(255, 107, 53, 0.1)',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: Colors.APP_COLOR_DARK,
    },
    
    changePhotoText: {
        color: Colors.APP_COLOR_DARK,
        fontSize: 16,
        fontWeight: '600',
        fontFamily: fonts.montserratMedium,
    },
    
    // User info section (editable input fields)
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
        marginBottom: 10,
        fontFamily: fonts.montserratMedium,
    },
    
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e1e5e9',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: '#f8f9fa',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    
    inputIconContainer: {
        marginRight: 12,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    inputIcon: {
        width: 20,
        height: 20,
        tintColor: '#666',
    },
    
    inputText: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        fontFamily: fonts.montserratRegular,
        paddingVertical: 0, // Remove default padding for TextInput
    },
    btnContainer: {
        backgroundColor: Colors.APP_COLOR_DARK,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    
    logoutText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: '600',
    },
});

export default styles;
