import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { Colors } from '../../../assets/colors';
import fonts from '../../../assets/fonts';
import VectorIcon from '../../../utils/VectorIcon';
import { IconsType } from '../../../utils/constants';
import { useRoute, useNavigation } from '@react-navigation/native';
import { applyLeave } from '../../../api/auth';
import Toast from 'react-native-simple-toast';

interface RouteParams {
  startDate: string;
  endDate: string;
  daysCount: number;
}

const ApplyLeaveScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { startDate, endDate, daysCount } = route.params as RouteParams;
  const [selectedLeaveType, setSelectedLeaveType] = useState<string>('');
  const [noteToApprover, setNoteToApprover] = useState<string>('');
  const [_teammates, _setTeammates] = useState<string[]>([]);
  const [showLeaveTypeDropdown, setShowLeaveTypeDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const leaveTypes = [
    'Paid Leave',
    'Unpaid Leave',
  ];


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleSelectDates = () => {
    navigation.goBack();
  };

  const handleLeaveTypeSelect = (leaveType: string) => {
    setSelectedLeaveType(leaveType);
    setShowLeaveTypeDropdown(false);
  };


  const handleRequestLeave = async () => {
    if (!selectedLeaveType) {
      Toast.show('Please select a leave type', Toast.SHORT);
      return;
    }

    if (!noteToApprover.trim()) {
      Toast.show('Please add a reason for leave', Toast.SHORT);
      return;
    }

    setIsSubmitting(true);
    try {
      // Map leave type to numeric value
      const leaveTypeValue = selectedLeaveType === 'Paid Leave' ? 1 : 2;

      const requestBody = {
        leaveType: leaveTypeValue,
        startDate: startDate,
        endDate: endDate,
        reason: noteToApprover.trim(),
      };

      console.log('Submitting leave request:', requestBody);

      const response = await applyLeave(requestBody);

      if (response.status === 200) {
        Toast.show(response.data?.message , Toast.LONG);
        setTimeout(() => {
          navigation.goBack();
        }, 1500);
      } else {
        Toast.show(response.data?.message || 'Failed to submit leave request', Toast.SHORT);
      }
    } catch (error) {
      console.log('Leave request error:', error);
      Toast.show('Something went wrong while submitting leave request', Toast.SHORT);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSubmitDisabled = !selectedLeaveType || !noteToApprover.trim() || isSubmitting;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
          >
            <VectorIcon
              type={IconsType.Ionicons}
              name="close"
              color={Colors.APP_COLOR_DARK}
              size={24}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Apply Leave</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Date Selection Section */}
        <TouchableOpacity style={styles.dateSelectionContainer} onPress={handleSelectDates}>
          <View style={styles.dateField}>
            <Text style={styles.dateLabel}>START DATE</Text>
            <Text style={styles.dateValue}>{formatDate(startDate)}</Text>
          </View>

          <TouchableOpacity style={styles.singleDayButton}>
            <Text style={styles.singleDayText}>
              {daysCount} Day{daysCount !== 1 ? 's' : ''}
            </Text>
          </TouchableOpacity>

          <View style={styles.dateField}>
            <Text style={styles.dateLabel}>END DATE</Text>
            <Text style={styles.dateValue}>{formatDate(endDate)}</Text>
          </View>
        </TouchableOpacity>

        {/* Leave Type Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Leave type *</Text>
          <TouchableOpacity
            style={styles.dropdownContainer}
            onPress={() => setShowLeaveTypeDropdown(!showLeaveTypeDropdown)}
          >
            <Text style={[styles.dropdownText, selectedLeaveType ? styles.dropdownTextSelected : styles.dropdownTextPlaceholder]}>
              {selectedLeaveType || 'Select leave type'}
            </Text>
            <VectorIcon
              type={IconsType.Ionicons}
              name="chevron-down"
              color={Colors.grey_A8A8A9}
              size={20}
            />
          </TouchableOpacity>

          {/* Dropdown Options */}
          {showLeaveTypeDropdown && (
            <View style={styles.dropdownOptions}>
              {leaveTypes.map((leaveType, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dropdownOption,
                    index === leaveTypes.length - 1 && styles.dropdownOptionLast,
                  ]}
                  onPress={() => handleLeaveTypeSelect(leaveType)}
                >
                  <Text style={styles.dropdownOptionText}>{leaveType}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Note to Approver Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Reason for leave</Text>
          <TextInput
            style={styles.textArea}
            value={noteToApprover}
            onChangeText={setNoteToApprover}
            placeholder="Add Reason for leave"
            placeholderTextColor={Colors.grey_A8A8A9}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Leave request is for <Text style={styles.footerDaysText}>{daysCount} day{daysCount !== 1 ? 's' : ''}</Text>
          </Text>

          <TouchableOpacity
            style={[styles.submitButton, isSubmitDisabled && styles.submitButtonDisabled]}
            onPress={handleRequestLeave}
            disabled={isSubmitDisabled}
          >
            <Text style={[styles.submitButtonText, isSubmitDisabled && styles.submitButtonTextDisabled]}>
              {isSubmitting ? 'Submitting...' : 'Request Leave'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ApplyLeaveScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
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
  dateSelectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dateField: {
    flex: 1,
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: 12,
    fontFamily: fonts.montserratMedium,
    color: Colors.grey_A8A8A9,
    marginBottom: 8,
  },
  dateValue: {
    fontSize: 16,
    fontFamily: fonts.montserratSemiBold,
    color: Colors.black,
  },
  singleDayButton: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.grey_A8A8A9,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  singleDayText: {
    fontSize: 14,
    fontFamily: fonts.montserratMedium,
    color: Colors.grey_A8A8A9,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 24,
    marginTop: 20,
    position: 'relative',
  },
  sectionLabel: {
    fontSize: 14,
    fontFamily: fonts.montserratMedium,
    color: Colors.black,
    marginBottom: 12,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.CARD_BACKGROUND,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.black,
  },
  dropdownText: {
    fontSize: 14,
    fontFamily: fonts.montserratRegular,
    flex: 1,
    // color: Colors.redStatus,
  },
  dropdownTextSelected: {
    color: Colors.black,
  },
  dropdownTextPlaceholder: {
    color: Colors.grey_A0A0A1,
  },
  errorText: {
    fontSize: 12,
    fontFamily: fonts.montserratRegular,
    color: '#EF4444',
    marginTop: 8,
  },
  dropdownOptions: {
    position: 'absolute',
    top: '75%',
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.grey_A8A8A9,
    marginTop: 8,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  dropdownOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey_A8A8A9,
  },
  dropdownOptionLast: {
    borderBottomWidth: 0,
  },
  dropdownOptionText: {
    fontSize: 14,
    fontFamily: fonts.montserratRegular,
    color: Colors.black,
  },
  textArea: {
    backgroundColor: Colors.CARD_BACKGROUND,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.black,
    fontSize: 14,
    fontFamily: fonts.montserratRegular,
    color: Colors.black,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  teammatesDescription: {
    fontSize: 14,
    fontFamily: fonts.montserratRegular,
    color: Colors.grey_A8A8A9,
    marginBottom: 16,
    lineHeight: 20,
  },
  addTeammateButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Colors.APP_COLOR_DARK,
    backgroundColor: 'transparent',
  },
  addTeammateText: {
    fontSize: 12,
    fontFamily: fonts.montserratMedium,
    color: Colors.APP_COLOR_DARK,
    marginTop: 4,
  },
  footer: {
    marginHorizontal: 20,
    marginBottom: 32,
    marginTop: 8,
  },
  footerText: {
    fontSize: 14,
    fontFamily: fonts.montserratRegular,
    color: Colors.grey_A8A8A9,
    textAlign: 'left',
    marginBottom: 20,
  },
  footerDaysText: {
    color: Colors.black,
    fontFamily: fonts.montserratSemiBold,
  },
  submitButton: {
    backgroundColor: Colors.black,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  submitButtonDisabled: {
    backgroundColor: Colors.grey_A8A8A9,
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: fonts.montserratSemiBold,
    color: Colors.white,
  },
  submitButtonTextDisabled: {
    color: Colors.white,
  },
  userIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.APP_COLOR_DARK,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  userIconText: {
    fontSize: 12,
    fontFamily: fonts.montserratBold,
    color: Colors.white,
  },
});
