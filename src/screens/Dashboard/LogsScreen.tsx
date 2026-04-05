import { SafeAreaView, StyleSheet, Text, View, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity, Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Colors } from '../../assets/colors';
import fonts from '../../assets/fonts';
import { getTimeEntries } from '../../api/auth';
import { Calendar } from 'react-native-calendars';

interface TimeEntry {
  id: string;
  clockIn: string;
  clockOut: string;
  totalHours: number;
  status: string;
  notes: string;
  location: {
    latitude: number;
    longitude: number;
    address?: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface DailyEntry {
  date: string;
  totalHours: number | null;
  totalSessions: number | null;
  completedSessions: number | null;
  isWeekOff?: boolean;
  history: TimeEntry[];
}


const LogsScreen = () => {
  const [timeEntries, setTimeEntries] = useState<DailyEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'list' | 'calendar'>('list');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const scrollViewRef = useRef<ScrollView>(null);
  const blinkAnimation = useRef(new Animated.Value(1)).current;
  const cardRefs = useRef<{ [key: string]: any }>({});

  const fetchTimeEntries = async () => {
    try {
      const response = await getTimeEntries();
      if (response.ok && response.data?.success) {
        setTimeEntries(response.data.dailyEntries);
      }
    } catch (error) {
      console.error('Error fetching time entries:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTimeEntries();
  }, []);

  useEffect(() => {
    // Cleanup animation on unmount
    return () => {
      blinkAnimation.stopAnimation();
    };
  }, [blinkAnimation]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchTimeEntries();
  };

  const startBlinkingAnimation = () => {
    // Reset animation value
    blinkAnimation.setValue(1);

    // Create blinking animation
    const blinkSequence = Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnimation, {
          toValue: 0.3,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(blinkAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      { iterations: 6 }, // 6 iterations = 3 seconds (6 * 500ms)
    );

    blinkSequence.start();
  };

  const handleDateSelect = (day: any) => {
    const selectedDateStr = day.dateString;
    const today = new Date().toISOString().split('T')[0];

    // Prevent selection of future dates
    if (selectedDateStr > today) {
      return;
    }

    setSelectedDate(selectedDateStr);

    // Find the index of the selected date in timeEntries
    const dateIndex = timeEntries.findIndex(entry => entry.date === selectedDateStr);

    if (dateIndex !== -1) {
      // Switch to list view and scroll to the selected date
      setActiveTab('list');

      // Scroll to the selected date after a short delay to ensure the view is rendered
      setTimeout(() => {
        // Try to scroll to the specific card using refs
        const cardRef = cardRefs.current[selectedDateStr];
        if (cardRef && scrollViewRef.current) {
          cardRef.measureLayout(
            scrollViewRef.current as any,
            (x: number, y: number) => {
              scrollViewRef.current?.scrollTo({
                y: Math.max(0, y - 50), // Offset to show the card header clearly
                animated: true,
              });
            },
            () => {
              // Fallback to estimated position if measureLayout fails
              const estimatedCardHeight = 200;
              const estimatedScrollPosition = dateIndex * estimatedCardHeight;
              scrollViewRef.current?.scrollTo({
                y: Math.max(0, estimatedScrollPosition),
                animated: true,
              });
            }
          );
        } else {
          // Fallback to estimated position
          const estimatedCardHeight = 200;
          const estimatedScrollPosition = dateIndex * estimatedCardHeight;
          scrollViewRef.current?.scrollTo({
            y: Math.max(0, estimatedScrollPosition),
            animated: true,
          });
        }

        // Start blinking animation after scrolling is complete
        setTimeout(() => {
          startBlinkingAnimation();
        }, 500);
      }, 400);
    }
  };

  const getMarkedDates = () => {
    const markedDates: any = {};

    // Mark time entries
    timeEntries.forEach(entry => {
      const hasMissingData = entry.totalHours === null || entry.totalSessions === null || entry.completedSessions === null;

      markedDates[entry.date] = {
        marked: true,
        dotColor: hasMissingData ? Colors.redStatus : Colors.APP_COLOR_SECONDARY, // Red for missing data, original color for valid data
        selected: selectedDate === entry.date,
        selectedColor: Colors.APP_COLOR_DARK,
      };
    });

    return markedDates;
  };

  const getStatusBadge = (dailyEntry: DailyEntry) => {
    // Check if isWeekOff key is true first (highest priority)
    if (dailyEntry.isWeekOff === true) {
      return { text: 'WEEK OFF', color: '#FFFFFF', bgColor: Colors.APP_COLOR_DARK };
    }

    const hasMissingData = dailyEntry.totalHours === null || dailyEntry.totalSessions === null || dailyEntry.completedSessions === null;

    if (hasMissingData) {
      return { text: 'MISSING', color: '#ffffff', bgColor: Colors.redStatus };
    }

    return { text: 'ON TIME', color: '#FFFFFF', bgColor: Colors.colorGreen };
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatHours = (hours: number) => {
    if (hours < 1) {
      return `${Math.round(hours * 60)}m`;
    }
    return `${hours.toFixed(2)}h`;
  };

  const getWorkTypeTag = (dailyEntry: DailyEntry) => {
    // Randomly assign work type for demo purposes
    const workTypes = ['Work From Home', 'Office', 'Field Work'];
    const randomIndex = dailyEntry.date.length % workTypes.length;
    return workTypes[randomIndex];
  };

  const groupEntriesByMonth = () => {
    const grouped: { [key: string]: DailyEntry[] } = {};

    timeEntries.forEach(entry => {
      const date = new Date(entry.date);
      const monthKey = `${date.toLocaleDateString('en-US', { month: 'long' })}, ${date.getFullYear()}`;

      if (!grouped[monthKey]) {
        grouped[monthKey] = [];
      }
      grouped[monthKey].push(entry);
    });

    return grouped;
  };

  const renderMonthHeader = (monthName: string) => (
    <View style={styles.monthHeader}>
      <Text style={styles.monthHeaderText}>{monthName}</Text>
    </View>
  );

  const renderSession = (session: TimeEntry, index: number, totalSessions: number) => {
    const clockOutTime = session.clockOut ? formatTime(session.clockOut) : '-';

    return (
      <View key={session.id} style={styles.sessionItem}>
        <View style={styles.sessionHeader}>
          <Text style={styles.sessionNumber}>Session {totalSessions - index}</Text>
          <Text style={styles.sessionDuration}>{formatHours(session.totalHours)}</Text>
        </View>
        <View style={styles.sessionTimes}>
          <View style={styles.sessionTimeSection}>
            <Text style={styles.sessionTimeLabel}>Clock In</Text>
            <Text style={styles.sessionTime}>{formatTime(session.clockIn)}</Text>
          </View>
          <View style={styles.sessionTimeSection}>
            <Text style={styles.sessionTimeLabel}>Clock Out</Text>
            <Text style={[styles.sessionTime, clockOutTime === '-' && styles.missingClockTime]}>
              {clockOutTime}
            </Text>
          </View>
        </View>
        {session.notes && (
          <Text style={styles.sessionNotes}>{session.notes}</Text>
        )}
        {session.location.address && (
          <Text style={styles.sessionLocation}>📍 {session.location.address}</Text>
        )}
      </View>
    );
  };

  const renderDailyEntry = (dailyEntry: DailyEntry) => {
    const isSelected = selectedDate === dailyEntry.date;
    const hasMissingData = dailyEntry.totalHours === null || dailyEntry.totalSessions === null || dailyEntry.completedSessions === null;
    const statusBadge = getStatusBadge(dailyEntry);
    const workTypeTag = getWorkTypeTag(dailyEntry);

    // Format date to show day and date (e.g., "Thu, 11")
    const date = new Date(dailyEntry.date);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNumber = date.getDate();
    const formattedDate = `${dayName}, ${dayNumber}`;

    return (
      <Animated.View
        key={dailyEntry.date}
        ref={(ref) => {
          cardRefs.current[dailyEntry.date] = ref;
        }}
        style={[
          styles.dailyCard,
          isSelected && styles.selectedDailyCard,
          isSelected && { opacity: blinkAnimation },
        ]}
      >
        <View style={styles.dailyHeader}>
          <View style={styles.dateContainer}>
            <Text style={[
              styles.dailyDate,
              isSelected && styles.selectedDailyDate,
            ]}>
              {formattedDate}
            </Text>
            {!hasMissingData && (
              <Text style={styles.workTypeTag}>{workTypeTag}</Text>
            )}
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusBadge.bgColor }]}>
            <Text style={[styles.statusBadgeText, { color: statusBadge.color }]}>
              {statusBadge.text}
            </Text>
          </View>
        </View>

        {!hasMissingData && dailyEntry.history.length > 0 && (
          <>
            {(() => {
              // Find the earliest clockIn and latest clockOut
              const firstEntry = dailyEntry.history.reduce((earliest, current) =>
                new Date(current.clockIn).getTime() < new Date(earliest.clockIn).getTime() ? current : earliest
              );
              const lastEntry = dailyEntry.history.reduce((latest, current) => {
                if (!current.clockOut) {
                  return latest;
                }
                if (!latest.clockOut) {
                  return current;
                }
                return new Date(current.clockOut).getTime() > new Date(latest.clockOut).getTime() ? current : latest;
              }, dailyEntry.history[0]);

              const clockInTime = new Date(firstEntry.clockIn).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              });
              const clockOutTime = lastEntry.clockOut
                ? new Date(lastEntry.clockOut).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })
                : '-';

              return (
                <>
                  <Text style={styles.shiftType}>
                    General Daily ({clockInTime} - {clockOutTime})
                  </Text>

                  <View style={styles.clockContainer}>
                    <View style={styles.clockSection}>
                      <Text style={styles.clockLabel}>Clock In</Text>
                      <Text style={styles.clockTime}>{clockInTime}</Text>
                    </View>
                    <View style={styles.clockSection}>
                      <Text style={styles.clockLabel}>Clock Out</Text>
                      <Text style={[styles.clockTime, clockOutTime === '-' && styles.missingClockTime]}>
                        {clockOutTime}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.separator} />

                  <View style={styles.hoursContainer}>
                    <Text style={styles.hoursLabel}>
                      Effective hours {formatHours(dailyEntry.totalHours!)}
                    </Text>
                    <Text style={styles.hoursLabel}>
                      Gross hours {formatHours(dailyEntry.totalHours!)}
                    </Text>
                  </View>

                  {dailyEntry.history.length > 1 && (
                    <>
                      <View style={styles.sessionsSeparator} />
                      <View style={styles.sessionsContainer}>
                        <Text style={styles.sessionsTitle}>Sessions</Text>
                        {(() => {
                          // Sort sessions by clockOut time (descending - latest first), or clockIn if no clockOut
                          const sortedSessions = [...dailyEntry.history].sort((a, b) => {
                            const timeA = a.clockOut ? new Date(a.clockOut).getTime() : new Date(a.clockIn).getTime();
                            const timeB = b.clockOut ? new Date(b.clockOut).getTime() : new Date(b.clockIn).getTime();
                            return timeB - timeA; // Descending order - latest first
                          });

                          return sortedSessions.map((session, index) =>
                            renderSession(session, index, sortedSessions.length)
                          );
                        })()}
                      </View>
                    </>
                  )}
                </>
              );
            })()}
          </>
        )}

        {hasMissingData && (
          <View style={styles.missingContainer}>
            <View style={styles.missingBox}>
              <Text style={styles.missingDash}>-</Text>
            </View>
            <View style={styles.missingClockContainer}>
              <View style={styles.missingClockSection}>
                <Text style={styles.missingClockLabel}>Clock In</Text>
                <Text style={styles.missingClockValue}>-</Text>
              </View>
              <View style={styles.missingClockSection}>
                <Text style={styles.missingClockLabel}>Clock Out</Text>
                <Text style={styles.missingClockValue}>-</Text>
              </View>
            </View>
          </View>
        )}
      </Animated.View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.APP_COLOR_DARK} />
          <Text style={styles.loadingText}>Loading shift logs...</Text>
        </View>
      </SafeAreaView>
    );
  }


  const renderTabButton = (tab: 'list' | 'calendar', title: string) => (
    <TouchableOpacity
      style={[
        styles.tabButton,
        activeTab === tab && styles.activeTabButton,
      ]}
      onPress={() => setActiveTab(tab)}
    >
      <Text style={[
        styles.tabButtonText,
        activeTab === tab && styles.activeTabButtonText,
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const renderCalendarView = () => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    return (
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={handleDateSelect}
          markedDates={getMarkedDates()}
          maxDate={today}
          disableAllTouchEventsForDisabledDays={true}
          disableAllTouchEventsForInactiveDays={true}
          theme={{
            backgroundColor: Colors.white,
            calendarBackground: Colors.white,
            textSectionTitleColor: Colors.APP_COLOR_DARK,
            selectedDayBackgroundColor: Colors.APP_COLOR_DARK,
            selectedDayTextColor: Colors.white,
            todayTextColor: Colors.colorGreen,
            dayTextColor: Colors.black,
            textDisabledColor: Colors.grey_C4C4C4,
            dotColor: Colors.colorGreen,
            selectedDotColor: Colors.white,
            arrowColor: Colors.APP_COLOR_DARK,
            monthTextColor: Colors.APP_COLOR_DARK,
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
    );
  };

  const renderListView = () => {
    const groupedEntries = groupEntriesByMonth();
    const sortedMonths = Object.keys(groupedEntries).sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateB.getTime() - dateA.getTime(); // Sort newest first
    });

    return (
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {timeEntries.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No shift logs found</Text>
          </View>
        ) : (
          sortedMonths.map(monthName => (
            <View key={monthName}>
              {renderMonthHeader(monthName)}
              {groupedEntries[monthName].map(renderDailyEntry)}
            </View>
          ))
        )}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabContainer}>
        {renderTabButton('list', 'List')}
        {renderTabButton('calendar', 'Calendar')}
      </View>

      {activeTab === 'list' ? renderListView() : renderCalendarView()}
    </SafeAreaView>
  );
};

export default LogsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Light background
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white, // Light card background
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 8,
    padding: 4,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: Colors.APP_COLOR_DARK, // Active tab
  },
  tabButtonText: {
    fontSize: 14,
    fontFamily: fonts.montserratMedium,
    color: Colors.grey_A8A8A9, // Gray for inactive tabs
  },
  activeTabButtonText: {
    color: Colors.white,
    fontFamily: fonts.montserratSemiBold,
  },
  calendarContainer: {
    flex: 1,
    padding: 15,
  },
  calendar: {
    borderRadius: 12,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scrollView: {
    flex: 1,
    paddingTop: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: fonts.montserratMedium,
    color: '#A8A8A9',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: fonts.montserratMedium,
    color: '#A8A8A9',
  },
  dailyCard: {
    backgroundColor: Colors.white, // Light card background
    borderRadius: 12,
    marginBottom: 15,
    marginHorizontal: 15,
    padding: 16,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedDailyCard: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.APP_COLOR_DARK, // Accent for selected card
    backgroundColor: Colors.white,
  },
  selectedDailyDate: {
    color: Colors.APP_COLOR_DARK,
    fontFamily: fonts.montserratBold,
  },
  dailyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  dailyDate: {
    fontSize: 18,
    fontFamily: fonts.montserratBold,
    color: Colors.APP_COLOR_DARK,
    flex: 1,
  },
  missingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  missingBox: {
    width: 24,
    height: 24,
    backgroundColor: Colors.redStatus,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  missingDash: {
    fontSize: 16,
    fontFamily: fonts.montserratBold,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  missingClockContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  missingClockSection: {
    flex: 1,
  },
  missingClockLabel: {
    fontSize: 12,
    fontFamily: fonts.montserratRegular,
    color: '#A8A8A9',
    marginBottom: 4,
  },
  missingClockValue: {
    fontSize: 14,
    fontFamily: fonts.montserratMedium,
    color: Colors.redStatus,
  },
  dateContainer: {
    flex: 1,
  },
  workTypeTag: {
    fontSize: 14,
    fontFamily: fonts.montserratMedium,
    color: '#F59E0B', // Orange/yellow color
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBadgeText: {
    fontSize: 12,
    fontFamily: fonts.montserratBold,
    fontWeight: 'bold',
  },
  shiftType: {
    fontSize: 14,
    fontFamily: fonts.montserratMedium,
    color: '#A8A8A9',
    marginBottom: 12,
  },
  clockContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  clockSection: {
    flex: 1,
  },
  clockLabel: {
    fontSize: 12,
    fontFamily: fonts.montserratRegular,
    color: '#A8A8A9',
    marginBottom: 4,
  },
  clockTime: {
    fontSize: 14,
    fontFamily: fonts.montserratMedium,
    color: Colors.colorGreen, // Green color for times
  },
  missingClockTime: {
    color: '#A8A8A9', // Light gray color for missing times
  },
  separator: {
    height: 1,
    backgroundColor: '#404040',
    marginVertical: 12,
  },
  hoursContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hoursLabel: {
    fontSize: 12,
    fontFamily: fonts.montserratRegular,
    color: '#A8A8A9',
  },
  monthHeader: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    alignItems: 'center',
  },
  monthHeaderText: {
    fontSize: 18,
    fontFamily: fonts.montserratBold,
    color: Colors.APP_COLOR_DARK, // Purple color for month headers
    textAlign: 'center',
  },
  sessionsSeparator: {
    height: 1,
    backgroundColor: '#404040',
    marginVertical: 16,
  },
  sessionsContainer: {
    marginTop: 8,
  },
  sessionsTitle: {
    fontSize: 14,
    fontFamily: fonts.montserratSemiBold,
    color: Colors.APP_COLOR_DARK,
    marginBottom: 12,
  },
  sessionItem: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: Colors.APP_COLOR_DARK,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sessionNumber: {
    fontSize: 12,
    fontFamily: fonts.montserratMedium,
    color: Colors.APP_COLOR_DARK,
  },
  sessionDuration: {
    fontSize: 12,
    fontFamily: fonts.montserratBold,
    color: Colors.colorGreen,
  },
  sessionTimes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sessionTimeSection: {
    flex: 1,
  },
  sessionTimeLabel: {
    fontSize: 10,
    fontFamily: fonts.montserratRegular,
    color: '#A8A8A9',
    marginBottom: 2,
  },
  sessionTime: {
    fontSize: 12,
    fontFamily: fonts.montserratMedium,
    color: Colors.colorGreen,
  },
  sessionNotes: {
    fontSize: 10,
    fontFamily: fonts.montserratRegular,
    color: '#A8A8A9',
    marginBottom: 4,
    fontStyle: 'italic',
  },
  sessionLocation: {
    fontSize: 10,
    fontFamily: fonts.montserratRegular,
    color: '#A8A8A9',
  },
});
