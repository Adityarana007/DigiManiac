import { StyleSheet } from "react-native";
import fonts from "../../../assets/fonts";
import { Colors } from "../../../assets/colors";
import palette from "../../../assets/palette";

const styles = StyleSheet.create({
    // Original styles
    container: { flex: 1, backgroundColor: '#fff' },
    logo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.APP_COLOR_DARK,
    },
    mainCardView: palette.view.noMargincardView,
    parentView: palette.view.superParent,
    cardView: palette.view.roundcardView,
    shadowView: palette.view.shadowView,
    
    // Clock in/out styles
    clockContainer: {
        flex: 1,
        padding: 20,
    },
    
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.APP_COLOR_DARK,
        textAlign: 'center',
        flex: 1,
        fontFamily: fonts.montserratBold,
    },
    
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        fontFamily: fonts.montserratRegular,
        position: 'absolute',
        top: 35,
        left: 0,
        right: 0,
    },
    
    statusCard: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    
    statusIcon: {
        marginBottom: 16,
    },
    
    statusText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
        fontFamily: fonts.montserratSemiBold,
    },
    
    clockInTime: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
        fontFamily: fonts.montserratMedium,
    },
    
    clockInDate: {
        fontSize: 12,
        color: '#999',
        marginBottom: 8,
        fontFamily: fonts.montserratRegular,
    },
    
    notesText: {
        fontSize: 12,
        color: '#666',
        fontStyle: 'italic',
        fontFamily: fonts.montserratRegular,
    },
    
    timerContainer: {
        backgroundColor: Colors.APP_COLOR_DARK,
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        marginBottom: 24,
    },
    
    timerLabel: {
        fontSize: 14,
        color: Colors.white,
        marginBottom: 8,
        fontFamily: fonts.montserratMedium,
    },
    
    timerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    timeUnit: {
        alignItems: 'center',
        marginHorizontal: 8,
    },
    
    timeValue: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.white,
        fontFamily: fonts.montserratBold,
    },
    
    timeLabel: {
        fontSize: 12,
        color: Colors.white,
        fontFamily: fonts.montserratMedium,
        marginTop: 2,
    },
    
    timeSeparator: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.white,
        fontFamily: fonts.montserratBold,
        marginHorizontal: 4,
    },
    
    timer: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.white,
        fontFamily: fonts.montserratBold,
    },
    
    durationContainer: {
        backgroundColor: '#f8f9fa',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#e1e5e9',
    },
    
    durationLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        fontFamily: fonts.montserratMedium,
    },
    
    duration: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.APP_COLOR_DARK,
        fontFamily: fonts.montserratBold,
    },
    
    buttonContainer: {
        gap: 16,
    },
    
    clockButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    
    clockInButton: {
        backgroundColor: Colors.APP_COLOR_DARK,
    },
    
    clockOutButton: {
        backgroundColor: '#dc3545',
    },
    
    disabledButton: {
        backgroundColor: '#ccc',
        opacity: 0.6,
    },
    
    buttonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
        fontFamily: fonts.montserratSemiBold,
    },
    
    // Loading styles
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    loadingText: {
        fontSize: 16,
        color: '#666',
        fontFamily: fonts.montserratMedium,
    },
    
    refreshButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 107, 53, 0.1)',
    },
});

export default styles;