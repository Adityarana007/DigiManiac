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
        paddingTop: 0,
    },
    
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    
    title: {
        fontSize: 16,
        // fontWeight: '600',
        color: Colors.grey_A0A0A1,
        // textAlign: 'center',
        fontFamily: fonts.montserratSemiBold,
        letterSpacing: 0.5,
    },
    
    // Main Unified Card
    mainCard: {
        backgroundColor: '#2C3E50',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
    
    // Top Section - Day and Date
    topSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    
    dateInfo: {
        flex: 1,
    },
    
    currentDay: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.white,
        fontFamily: fonts.montserratBold,
        marginBottom: 4,
    },
    
    currentDate: {
        fontSize: 16,
        color: '#BDC3C7',
        fontFamily: fonts.montserratMedium,
    },
    
    shiftProgress: {
        alignItems: 'flex-end',
    },
    
    progressText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E67E22',
        fontFamily: fonts.montserratBold,
    },
    
    // Middle Section - Current Time
    timeSection: {
        alignItems: 'center',
        marginBottom: 20,
        paddingVertical: 10,
    },
    
    currentTime: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.white,
        fontFamily: fonts.montserratBold,
    },
    
    // Bottom Section - Action and Info
    actionSection: {
        alignItems: 'center',
    },
    
    actionButton: {
        width: '100%',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 16,
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
        backgroundColor: '#27AE60',
    },
    
    clockOutButton: {
        backgroundColor: '#E74C3C',
    },
    
    actionButtonText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: fonts.montserratBold,
    },
    
    // Session Information
    sessionInfo: {
        alignItems: 'center',
        width: '100%',
    },
    
    clockInTimeDisplay: {
        fontSize: 14,
        color: '#2ECC71',
        fontFamily: fonts.montserratMedium,
        marginBottom: 8,
    },
    
    sessionDuration: {
        fontSize: 16,
        color: '#BDC3C7',
        fontFamily: fonts.montserratMedium,
    },
    
    // Daily Progress
    dailyProgress: {
        alignItems: 'center',
        width: '100%',
    },
    
    dailyProgressText: {
        fontSize: 16,
        color: '#E67E22',
        fontFamily: fonts.montserratMedium,
        fontWeight: '600',
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
    
    // Quick Actions Section
    quickActionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: Colors.white,
        marginHorizontal: 15,
        marginTop: 15,
        marginBottom: 15,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    
    quickActionButton: {
        alignItems: 'center',
        flex: 1,
    },
    
    quickActionIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.APP_COLOR_DARK,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        borderWidth: 1,
        borderColor: Colors.white,
    },
    
    quickActionTitle: {
        fontSize: 14,
        fontFamily: fonts.montserratMedium,
        color: Colors.APP_COLOR_DARK,
        marginBottom: 2,
    },
    
    quickActionSubtitle: {
        fontSize: 14,
        fontFamily: fonts.montserratMedium,
        color: Colors.APP_COLOR_DARK,
    },
});

export default styles;