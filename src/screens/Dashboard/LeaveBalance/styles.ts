import { StyleSheet } from 'react-native';
import { Colors } from '../../../assets/colors';
import fonts from '../../../assets/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white_f5f5f5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.white,
  },
  closeButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: fonts.montserratBold,
    color: Colors.APP_COLOR_DARK,
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.white_f5f5f5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    fontFamily: fonts.montserratMedium,
    color: Colors.grey_A8A8A9,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statCardPrimary: {
    borderTopWidth: 4,
    borderTopColor: Colors.APP_COLOR_DARK,
  },
  statCardPending: {
    borderTopWidth: 4,
    borderTopColor: Colors.APP_COLOR_DARK,
  },
  statCardApproved: {
    borderTopWidth: 4,
    borderTopColor: Colors.colorGreen,
  },
  statCardRejected: {
    borderTopWidth: 4,
    borderTopColor: Colors.redStatus,
  },
  statCardDays: {
    borderTopWidth: 4,
    borderTopColor: Colors.grey_A8A8A9,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: fonts.montserratMedium,
    color: Colors.grey_A8A8A9,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontFamily: fonts.montserratBold,
    color: Colors.black,
  },
  leaveTypeContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: fonts.montserratBold,
    color: Colors.black,
    marginBottom: 12,
  },
  leaveTypeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  leaveTypeCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  leaveTypeLabel: {
    fontSize: 12,
    fontFamily: fonts.montserratMedium,
    color: Colors.grey_A8A8A9,
    marginBottom: 8,
  },
  leaveTypeValue: {
    fontSize: 20,
    fontFamily: fonts.montserratBold,
    color: Colors.APP_COLOR_DARK,
  },
  leavesListContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 32,
  },
  emptyContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    fontFamily: fonts.montserratMedium,
    color: Colors.grey_A8A8A9,
  },
  leaveCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  leaveCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  leaveCardHeaderLeft: {
    flex: 1,
  },
  leaveDateRange: {
    fontSize: 14,
    fontFamily: fonts.montserratSemiBold,
    color: Colors.black,
    marginBottom: 4,
  },
  leaveDays: {
    fontSize: 12,
    fontFamily: fonts.montserratMedium,
    color: Colors.grey_A8A8A9,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: fonts.montserratSemiBold,
  },
  leaveCardBody: {
    borderTopWidth: 1,
    borderTopColor: Colors.grey_C4C4C4,
    paddingTop: 12,
  },
  leaveInfoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  leaveInfoLabel: {
    fontSize: 12,
    fontFamily: fonts.montserratMedium,
    color: Colors.grey_A8A8A9,
    width: 70,
  },
  leaveInfoValue: {
    fontSize: 12,
    fontFamily: fonts.montserratMedium,
    color: Colors.black,
    flex: 1,
  },
  reasonContainer: {
    marginTop: 4,
  },
  reasonLabel: {
    fontSize: 12,
    fontFamily: fonts.montserratMedium,
    color: Colors.grey_A8A8A9,
    marginBottom: 4,
  },
  reasonText: {
    fontSize: 12,
    fontFamily: fonts.montserratRegular,
    color: Colors.black,
    lineHeight: 18,
  },
});

export default styles;


