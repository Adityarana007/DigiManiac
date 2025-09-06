import { SafeAreaView, StyleSheet, Text, View, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity, Animated } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { Colors } from '../../assets/colors'
import fonts from '../../assets/fonts'
import { getTimeEntries } from '../../api/auth'
import { Calendar } from 'react-native-calendars'

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
  totalHours: number;
  totalSessions: number;
  completedSessions: number;
  history: TimeEntry[];
}

interface TimeEntriesResponse {
  statusCode: number;
  success: boolean;
  dailyEntries: DailyEntry[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    limit: number;
  };
}

const LogsScreen = () => {
  const [timeEntries, setTimeEntries] = useState<DailyEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'list' | 'calendar'>('list');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const scrollViewRef = useRef<ScrollView>(null);
  const blinkAnimation = useRef(new Animated.Value(1)).current;

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
      { iterations: 6 } // 6 iterations = 3 seconds (6 * 500ms)
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
        // Use a more accurate calculation based on actual card heights
        let scrollPosition = 0;
        
        // Calculate cumulative height up to the selected date
        for (let i = 0; i < dateIndex; i++) {
          const entry = timeEntries[i];
          // Base card height: padding (30) + header (60) + margin (15) = 105
          let cardHeight = 105;
          // Add height for each time entry (approximately 80px per entry)
          cardHeight += entry.history.length * 80;
          scrollPosition += cardHeight;
        }
        
        // Add some padding to account for ScrollView padding (15px)
        scrollPosition += 15;
        
        scrollViewRef.current?.scrollTo({
          y: Math.max(0, scrollPosition - 30), // Offset to show the card header clearly
          animated: true,
        });
        
        // Start blinking animation after scrolling is complete
        setTimeout(() => {
          startBlinkingAnimation();
        }, 500);
      }, 400); // Increased delay to ensure proper rendering
    }
  };

  const getMarkedDates = () => {
    const markedDates: any = {};
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    
    // Mark time entries
    timeEntries.forEach(entry => {
      markedDates[entry.date] = {
        marked: true,
        dotColor: Colors.APP_COLOR_SECONDARY,
        selected: selectedDate === entry.date,
        selectedColor: Colors.APP_COLOR_DARK,
      };
    });
    
    return markedDates;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatHours = (hours: number) => {
    if (hours < 1) {
      return `${Math.round(hours * 60)}m`;
    }
    return `${hours.toFixed(2)}h`;
  };

  const renderTimeEntry = (entry: TimeEntry) => (
    <View key={entry.id} style={styles.entryCard}>
      <View style={styles.entryHeader}>
        <Text style={styles.entryTime}>
          {formatTime(entry.clockIn)} - {formatTime(entry.clockOut)}
        </Text>
        <Text style={styles.entryDuration}>{formatHours(entry.totalHours)}</Text>
      </View>
      <Text style={styles.entryStatus}>{entry.status}</Text>
      {entry.notes && (
        <Text style={styles.entryNotes}>{entry.notes}</Text>
      )}
      {entry.location.address && (
        <Text style={styles.entryLocation}>📍 {entry.location.address}</Text>
      )}
    </View>
  );

  const renderDailyEntry = (dailyEntry: DailyEntry) => {
    const isSelected = selectedDate === dailyEntry.date;
    
    return (
      <Animated.View 
        key={dailyEntry.date} 
        style={[
          styles.dailyCard,
          isSelected && styles.selectedDailyCard,
          isSelected && { opacity: blinkAnimation }
        ]}
      >
        <View style={styles.dailyHeader}>
          <Text style={[
            styles.dailyDate,
            isSelected && styles.selectedDailyDate
          ]}>
            {formatDate(dailyEntry.date)}
          </Text>
          <View style={styles.dailyStats}>
            <Text style={styles.dailyHours}>{formatHours(dailyEntry.totalHours)}</Text>
            <Text style={styles.dailySessions}>
              {dailyEntry.completedSessions}/{dailyEntry.totalSessions} sessions
            </Text>
          </View>
        </View>
        <View style={styles.entriesContainer}>
          {dailyEntry.history.map(renderTimeEntry)}
        </View>
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
        activeTab === tab && styles.activeTabButton
      ]}
      onPress={() => setActiveTab(tab)}
    >
      <Text style={[
        styles.tabButtonText,
        activeTab === tab && styles.activeTabButtonText
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
            todayTextColor: Colors.APP_COLOR_SECONDARY,
            dayTextColor: Colors.black,
            textDisabledColor: Colors.grey_C4C4C4,
            dotColor: Colors.APP_COLOR_SECONDARY,
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

  const renderListView = () => (
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
        timeEntries.map(renderDailyEntry)
      )}
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabContainer}>
        {renderTabButton('list', 'List')}
        {renderTabButton('calendar', 'Calendar')}
      </View>

      {activeTab === 'list' ? renderListView() : renderCalendarView()}
    </SafeAreaView>
  )
}

export default LogsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white_f5f5f5,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
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
    backgroundColor: Colors.APP_COLOR_DARK,
  },
  tabButtonText: {
    fontSize: 14,
    fontFamily: fonts.montserratMedium,
    color: Colors.grey_A8A8A9,
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
    padding: 15,
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
    color: Colors.grey_A8A8A9,
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
    color: Colors.grey_A8A8A9,
  },
  dailyCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
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
    borderWidth: 2,
    borderColor: Colors.APP_COLOR_DARK,
    backgroundColor: Colors.white_f5f5f5,
  },
  selectedDailyDate: {
    color: Colors.APP_COLOR_DARK,
    fontFamily: fonts.montserratBold,
  },
  dailyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
  },
  dailyDate: {
    fontSize: 16,
    fontFamily: fonts.montserratSemiBold,
    color: Colors.APP_COLOR_DARK,
    flex: 1,
  },
  dailyStats: {
    alignItems: 'flex-end',
  },
  dailyHours: {
    fontSize: 18,
    fontFamily: fonts.montserratBold,
    color: Colors.APP_COLOR_SECONDARY,
  },
  dailySessions: {
    fontSize: 12,
    fontFamily: fonts.montserratRegular,
    color: Colors.grey_A8A8A9,
    marginTop: 2,
  },
  entriesContainer: {
    gap: 10,
  },
  entryCard: {
    backgroundColor: Colors.CARD_BACKGROUND,
    borderRadius: 8,
    padding: 12,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  entryTime: {
    fontSize: 14,
    fontFamily: fonts.montserratMedium,
    color: Colors.APP_COLOR_DARK,
  },
  entryDuration: {
    fontSize: 14,
    fontFamily: fonts.montserratBold,
    color: Colors.APP_COLOR_SECONDARY,
  },
  entryStatus: {
    fontSize: 12,
    fontFamily: fonts.montserratRegular,
    color: Colors.grey_A8A8A9,
    marginBottom: 5,
    textTransform: 'capitalize',
  },
  entryNotes: {
    fontSize: 12,
    fontFamily: fonts.montserratRegular,
    color: Colors.black,
    marginBottom: 5,
  },
  entryLocation: {
    fontSize: 12,
    fontFamily: fonts.montserratRegular,
    color: Colors.grey_A8A8A9,
  },
})