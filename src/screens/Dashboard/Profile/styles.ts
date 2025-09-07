import { StyleSheet } from "react-native";
import fonts from "../../../assets/fonts";
import { Colors } from "../../../assets/colors";
import palette from "../../../assets/palette";

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
    container: { 
        flex: 1, 
        backgroundColor: '#f8f9fa' 
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 30,
    },
    cardpaddingHolder: {
        paddingTop: 0,
        paddingLeft: 20,
        paddingRight: 20,
    },
    
    // Profile photo section (improved)
    profilePhotoSection: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 30,
        paddingHorizontal: 20,
    },
    
    profilePhotoContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    
    profilePhoto: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: Colors.white,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 10,
    },
    
    defaultProfilePhoto: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#e9ecef',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: Colors.white,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 10,
    },
    
    defaultUserIcon: {
        // width: 60,
        // height: 60,
    },
    
    editPhotoButton: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: '#FF6B35',
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
        borderColor: '#FF6B35',
    },
    
    changePhotoText: {
        color: '#FF6B35',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: fonts.montserratMedium,
    },
    
    // User info section (improved design)
    userInfoSection: {
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    
    infoCard: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    
    infoItem: {
        marginBottom: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    
    infoLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        fontFamily: fonts.montserratMedium,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    
    infoValue: {
        fontSize: 18,
        color: '#333',
        fontFamily: fonts.montserratSemiBold,
        lineHeight: 24,
    },
    
    // Logout button (improved)
    btnContainer: {
        backgroundColor: Colors.APP_COLOR_DARK,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 20,
        shadowColor: Colors.APP_COLOR_DARK,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    
    logoutText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '600',
        fontFamily: fonts.montserratSemiBold,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
});

export default styles;