import React, { useState, useEffect } from 'react';
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
import { getLeaveList } from '../../../api/auth';

interface SelectedDates {
  startDate: string | null;
  endDate: string | null;
}


const SelectLeaveDateScreen = ({ navigation }: any) => {
  const [selectedDates, setSelectedDates] = useState<SelectedDates>({
    startDate: null,
    endDate: null,
  });
  const [isSingleDay, _setIsSingleDay] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [leaveDates, setLeaveDates] = useState<string[]>([]);

  const handleDateSelect = (day: any) => {
    const dateString = day.dateString;
    const today = new Date().toISOString().split('T')[0];

    // Prevent selection of past dates
    if (dateString < today) {
      return;
    }

    // Prevent selection of leave dates
    if (leaveDates.includes(dateString)) {
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


  // Fetch leave list and extract all leave dates
  useEffect(() => {
    const fetchLeaveDates = async () => {
      try {
        const response = await getLeaveList();
        if (response.status === 200 && response.data?.success && response.data?.leaves) {
          const dates: string[] = [];

          // Extract all dates from each leave range
          response.data.leaves.forEach((leave: any) => {
            const startDate = new Date(leave.startDate);
            const endDate = new Date(leave.endDate);

            // Generate all dates between start and end (inclusive)
            for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
              const dateString = d.toISOString().split('T')[0];
              dates.push(dateString);
            }
          });

          setLeaveDates(dates);
        }
      } catch (error) {
        console.log('Error fetching leave list:', error);
      }
    };

    fetchLeaveDates();
  }, []);

  const getMarkedDates = () => {
    const markedDates: any = {};

    // First, mark ALL leave dates with light red color and disable them
    // Leave dates should always remain light red, even if within a selected range
    leaveDates.forEach((dateString) => {
      markedDates[dateString] = {
        disabled: true, // Disable leave dates - make them non-clickable
        marked: true,
        selected: false, // Explicitly mark as NOT selected
        dotColor: '#FFE5E5', // Light red dot indicator
        customStyles: {
          container: {
            backgroundColor: '#FFE5E5', // Light red background
            borderRadius: 16,
          },
          text: {
            color: Colors.black,
          },
        },
      };
    });

    // Then, mark selected dates (but skip leave dates to preserve their light red color)
    if (isSingleDay && selectedDate) {
      // Only mark as selected if it's not a leave date
      if (!leaveDates.includes(selectedDate)) {
        markedDates[selectedDate] = {
          selected: true,
          selectedColor: Colors.APP_COLOR_DARK,
          customStyles: {
            container: {
              backgroundColor: Colors.APP_COLOR_DARK,
              borderRadius: 16,
            },
            text: {
              color: Colors.white,
            },
          },
        };
      }
    } else if (selectedDates.startDate && selectedDates.endDate) {
      // Mark range, but exclude leave dates within the range
      const start = new Date(selectedDates.startDate);
      const end = new Date(selectedDates.endDate);

      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const dateString = d.toISOString().split('T')[0];

        // Skip leave dates - they should not be selected even if in the range
        if (leaveDates.includes(dateString)) {
          continue;
        }

        markedDates[dateString] = {
          selected: true,
          selectedColor: Colors.APP_COLOR_DARK,
          customStyles: {
            container: {
              backgroundColor: Colors.APP_COLOR_DARK,
              borderRadius: 16,
            },
            text: {
              color: Colors.white,
            },
          },
        };
      }
    } else if (selectedDates.startDate) {
      // Only mark as selected if it's not a leave date
      if (!leaveDates.includes(selectedDates.startDate)) {
        markedDates[selectedDates.startDate] = {
          selected: true,
          selectedColor: Colors.APP_COLOR_DARK,
          customStyles: {
            container: {
              backgroundColor: Colors.APP_COLOR_DARK,
              borderRadius: 16,
            },
            text: {
              color: Colors.white,
            },
          },
        };
      }
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
      let count = 0;

      // Count only non-leave dates in the range
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const dateString = d.toISOString().split('T')[0];
        // Exclude leave dates from count
        if (!leaveDates.includes(dateString)) {
          count++;
        }
      }

      return count;
    } else if (selectedDates.startDate) {
      // Check if the single start date is a leave date
      if (leaveDates.includes(selectedDates.startDate)) {
        return 0;
      }
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
            markingType={'custom'}
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

        {/* Legend */}
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColorBox, styles.legendColorBoxLeave]} />
            <Text style={styles.legendText}>Leaves</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColorBox, styles.legendColorBoxSelected]} />
            <Text style={styles.legendText}>Selected Date</Text>
          </View>
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
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    gap: 24,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendColorBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.grey_A8A8A9,
  },
  legendColorBoxLeave: {
    backgroundColor: '#FFE5E5',
  },
  legendColorBoxSelected: {
    backgroundColor: Colors.APP_COLOR_DARK,
  },
  legendText: {
    fontSize: 14,
    fontFamily: fonts.montserratMedium,
    color: Colors.black,
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
