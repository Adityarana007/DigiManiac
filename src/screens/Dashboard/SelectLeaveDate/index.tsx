import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Colors } from '../../../assets/colors';
import fonts from '../../../assets/fonts';
import VectorIcon from '../../../utils/VectorIcon';
import { IconsType } from '../../../utils/constants';
import { Calendar } from 'react-native-calendars';

interface SelectedDates {
  startDate: string | null;
  endDate: string | null;
}


const SelectLeaveDateScreen = ({ navigation }: any) => {
  const [selectedDates, setSelectedDates] = useState<SelectedDates>({
    startDate: null,
    endDate: null,
  });
  const [isSingleDay, setIsSingleDay] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');

  const handleDateSelect = (day: any) => {
    const dateString = day.dateString;
    const today = new Date().toISOString().split('T')[0];

    // Prevent selection of past dates
    if (dateString < today) {
      return;
    }

    if (isSingleDay) {
      setSelectedDate(dateString);
      setSelectedDates({ startDate: dateString, endDate: dateString });
    } else {
      // Range selection logic
      if (!selectedDates.startDate) {
        // First date selection - set as start date
        setSelectedDates({ startDate: dateString, endDate: null });
      } else if (!selectedDates.endDate) {
        // Second date selection - set as end date
        const startDate = selectedDates.startDate;
        const endDate = dateString;

        // Ensure start date is before end date
        if (new Date(startDate) <= new Date(endDate)) {
          setSelectedDates({ startDate, endDate });
        } else {
          setSelectedDates({ startDate: endDate, endDate: startDate });
        }
      } else {
        // Reset and start new selection
        setSelectedDates({ startDate: dateString, endDate: null });
      }
    }
  };

  const toggleSingleDay = () => {
    setIsSingleDay(!isSingleDay);
    setSelectedDates({ startDate: null, endDate: null });
    setSelectedDate('');
  };


  const getMarkedDates = () => {
    const markedDates: any = {};

    if (isSingleDay && selectedDate) {
      markedDates[selectedDate] = {
        selected: true,
        selectedColor: Colors.APP_COLOR_DARK,
      };
    } else if (selectedDates.startDate && selectedDates.endDate) {
      // Mark range
      const start = new Date(selectedDates.startDate);
      const end = new Date(selectedDates.endDate);

      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const dateString = d.toISOString().split('T')[0];
        markedDates[dateString] = {
          selected: true,
          selectedColor: Colors.APP_COLOR_DARK,
        };
      }
    } else if (selectedDates.startDate) {
      markedDates[selectedDates.startDate] = {
        selected: true,
        selectedColor: Colors.APP_COLOR_DARK,
      };
    }

    return markedDates;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
    });
  };

  const getSelectedDaysCount = () => {
    if (isSingleDay && selectedDate) {
      return 1;
    } else if (selectedDates.startDate && selectedDates.endDate) {
      const start = new Date(selectedDates.startDate);
      const end = new Date(selectedDates.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end dates
      return diffDays;
    } else if (selectedDates.startDate) {
      return 1;
    }
    return 0;
  };

  const getSelectedDateText = () => {
    if (isSingleDay && selectedDate) {
      return `Selected date: ${formatDate(selectedDate)}`;
    } else if (selectedDates.startDate && selectedDates.endDate) {
      return `Selected dates: ${formatDate(selectedDates.startDate)} - ${formatDate(selectedDates.endDate)}`;
    } else if (selectedDates.startDate) {
      return `Start date: ${formatDate(selectedDates.startDate)}`;
    }
    return 'Select dates';
  };

  const handleSubmit = () => {
    let startDate = '';
    let endDate = '';
    let daysCount = 0;

    if (isSingleDay && selectedDate) {
      startDate = selectedDate;
      endDate = selectedDate;
      daysCount = 1;
    } else if (selectedDates.startDate && selectedDates.endDate) {
      startDate = selectedDates.startDate;
      endDate = selectedDates.endDate;
      daysCount = getSelectedDaysCount();
    } else if (selectedDates.startDate) {
      startDate = selectedDates.startDate;
      endDate = selectedDates.startDate;
      daysCount = 1;
    } else {
      Alert.alert('Error', 'Please select dates');
      return;
    }

    // Navigate to ApplyLeave screen with selected dates
    navigation.navigate('ApplyLeave' as never, {
      startDate,
      endDate,
      daysCount,
    } as never);
  };

  const isSubmitDisabled = () => {
    if (isSingleDay) {
      return !selectedDate;
    }
    return !selectedDates.startDate;
  };

  return (
    <SafeAreaView style={styles.container}>
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
        <Text style={styles.headerTitle}>Select Date</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Date Selection Fields */}
        <View style={styles.dateSelectionContainer}>
          <View style={styles.dateField}>
            <Text style={styles.dateLabel}>START DATE</Text>
            <Text style={styles.dateValue}>
              {selectedDates.startDate ? formatDate(selectedDates.startDate) : 'Pick a Date'}
            </Text>
          </View>
          <View
            style={[styles.singleDayButton, isSingleDay && styles.singleDayButtonActive]}
          >
            <Text style={[styles.singleDayText, isSingleDay && styles.singleDayTextActive]}>
              {getSelectedDaysCount()} Day{getSelectedDaysCount() !== 1 ? 's' : ''}
            </Text>
          </View>

          <View style={styles.dateField}>
            <Text style={styles.dateLabel}>END DATE</Text>
            <Text style={styles.dateValue}>
              {selectedDates.endDate ? formatDate(selectedDates.endDate) : 'Pick a Date'}
            </Text>
          </View>
        </View>

        {/* Calendar */}
        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={handleDateSelect}
            markedDates={getMarkedDates()}
            minDate={new Date().toISOString().split('T')[0]}
            disableAllTouchEventsForDisabledDays={true}
            disableAllTouchEventsForInactiveDays={true}
            theme={{
              backgroundColor: Colors.white,
              calendarBackground: Colors.white,
              textSectionTitleColor: Colors.grey_A8A8A9,
              selectedDayBackgroundColor: Colors.APP_COLOR_DARK,
              selectedDayTextColor: Colors.white,
              todayTextColor: Colors.APP_COLOR_DARK,
              dayTextColor: Colors.black,
              textDisabledColor: Colors.grey_C4C4C4,
              arrowColor: Colors.APP_COLOR_DARK,
              monthTextColor: Colors.grey_A8A8A9,
              indicatorColor: Colors.APP_COLOR_DARK,
              textDayFontFamily: fonts.montserratMedium,
              textMonthFontFamily: fonts.montserratBold,
              textDayHeaderFontFamily: fonts.montserratMedium,
              textDayFontSize: 16,
              textMonthFontSize: 18,
              textDayHeaderFontSize: 14,
            }}
            style={styles.calendar}
          />
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            isSubmitDisabled() && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={isSubmitDisabled()}
        >
          <Text style={styles.submitButtonText}>{getSelectedDateText()}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SelectLeaveDateScreen;

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
    backgroundColor: Colors.white,
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
    fontFamily: fonts.montserratBold,
    color: Colors.black,
  },
  singleDayButton: {
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.grey_A8A8A9,
  },
  singleDayButtonActive: {
    backgroundColor: Colors.APP_COLOR_DARK,
    borderColor: Colors.APP_COLOR_DARK,
  },
  singleDayText: {
    fontSize: 12,
    fontFamily: fonts.montserratMedium,
    color: Colors.grey_A8A8A9,
  },
  singleDayTextActive: {
    color: Colors.white,
  },
  multipleButton: {
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: Colors.grey_A8A8A9,
  },
  multipleButtonActive: {
    backgroundColor: Colors.APP_COLOR_DARK,
    borderColor: Colors.APP_COLOR_DARK,
  },
  multipleText: {
    fontSize: 12,
    fontFamily: fonts.montserratMedium,
    color: Colors.grey_A8A8A9,
  },
  multipleTextActive: {
    color: Colors.white,
  },
  calendarContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 10,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calendar: {
    borderRadius: 12,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButton: {
    backgroundColor: Colors.APP_COLOR_DARK,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: fonts.montserratMedium,
    color: Colors.white,
  },
});
