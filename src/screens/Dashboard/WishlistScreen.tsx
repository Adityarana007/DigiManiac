import { SafeAreaView, StyleSheet, Text, View, ScrollView, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors } from '../../assets/colors'
import fonts from '../../assets/fonts'
import { getTimeEntries } from '../../api/auth'

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

  const onRefresh = () => {
    setRefreshing(true);
    fetchTimeEntries();
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

  const renderDailyEntry = (dailyEntry: DailyEntry) => (
    <View key={dailyEntry.date} style={styles.dailyCard}>
      <View style={styles.dailyHeader}>
        <Text style={styles.dailyDate}>{formatDate(dailyEntry.date)}</Text>
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
    </View>
  );

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shift Logs</Text>
      </View>
      <ScrollView
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
    </SafeAreaView>
  )
}

export default LogsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white_f5f5f5,
  },
  header: {
    backgroundColor: Colors.APP_COLOR_DARK,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: fonts.montserratBold,
    color: Colors.white,
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