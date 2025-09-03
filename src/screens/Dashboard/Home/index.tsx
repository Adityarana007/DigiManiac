import React, { useEffect, useState, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import styles from './styles';
import images from '../../../assets/images';
import { Icons } from '../../../assets/icons';
import { getCategories, clockIn, clockOut, getTimeStatus } from '../../../api/auth';
import {Strings} from '../../../assets/strings';
import { Colors } from '../../../assets/colors';
import fonts from '../../../assets/fonts';
import VectorIcon from '../../../utils/VectorIcon';
import { IconsType } from '../../../utils/constants';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../components/common/Loader';
import { Spacer } from '../../../components/common/Spacer';
import DeviceInfo from 'react-native-device-info';

type Category= {
  name: string;
  photo: string | null;
}

type TimeEntry = {
  id: string;
  userId: number;
  clockIn: string;
  status: string;
  notes: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
    _id: string;
  };
}

const HomeScreen = () => {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<string | null>(null);
  const [workedDuration, setWorkedDuration] = useState<string>('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [timeEntry, setTimeEntry] = useState<TimeEntry | null>(null);
  const [isLoadingStatus, setIsLoadingStatus] = useState(true);
  const [dailyLoggedHours, setDailyLoggedHours] = useState<string>('00:00');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Start timer when clocked in
    if (isClockedIn) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isClockedIn]);

  // Check if it's a new day and reset daily hours
  useEffect(() => {
    const checkAndResetDailyHours = async () => {
      const today = new Date().toDateString();
      const lastLoggedDate = await AsyncStorage.getItem('lastLoggedDate');
      
      if (lastLoggedDate !== today) {
        setDailyLoggedHours('00:00');
        await AsyncStorage.setItem('lastLoggedDate', today);
      } else {
        // Load saved daily hours
        const hours = await AsyncStorage.getItem('dailyLoggedHours');
        if (hours) {
          setDailyLoggedHours(hours);
        }
      }
    };
    
    checkAndResetDailyHours();
  }, []);

  // Fetch time status when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fetchTimeStatus();
    }, [])
  );

  const fetchTimeStatus = async () => {
    setIsLoadingStatus(true);
    try {
      const response = await getTimeStatus();
      console.log('Time status response:', response);
      
      if (response.status === 200 && response.data?.success) {
        const isClockedIn = response.data?.isClockedIn;
        const currentSession = response.data?.currentSession;
        const todaySummary = response.data?.todaySummary;
        console.log('Is clocked in:', isClockedIn);
        console.log('Current session:', currentSession);
        console.log('Today summary:', todaySummary);
        
        if (isClockedIn && currentSession) {
          console.log('Setting clocked in state');
          setIsClockedIn(true);
          setTimeEntry({
            id: currentSession.id,
            userId: 1, // Default value since not in response
            clockIn: currentSession.clockIn,
            status: 'active',
            notes: currentSession.notes,
            location: currentSession.location
          });
          // Convert clockIn time to local time format
          const clockInDate = new Date(currentSession.clockIn);
          const timeString = formatTime(clockInDate);
          setClockInTime(timeString);
        } else {
          console.log('Setting clocked out state');
          setIsClockedIn(false);
          setTimeEntry(null);
          setClockInTime(null);
        }
        
        // Update daily logged hours from todaySummary
        if (todaySummary) {
          const totalHours = todaySummary.totalTimeToday;
          const hours = Math.floor(totalHours);
          const minutes = Math.round((totalHours - hours) * 60);
          const formattedHours = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
          setDailyLoggedHours(formattedHours);
        }
      } else {
        console.log('No active time entry found');
        setIsClockedIn(false);
        setTimeEntry(null);
        setClockInTime(null);
      }
    } catch (error) {
      console.log('Error fetching time status:', error);
      setIsClockedIn(false);
      setTimeEntry(null);
      setClockInTime(null);
    } finally {
      setIsLoadingStatus(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: true, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const calculateDuration = (startTime: string) => {
    const start = new Date(startTime);
    const now = new Date();
    
    const diffMs = now.getTime() - start.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const addToDailyHours = (sessionDuration: string) => {
    const [sessionHours, sessionMinutes, sessionSeconds] = sessionDuration.split(':').map(Number);
    const [dailyHours, dailyMinutes] = dailyLoggedHours.split(':').map(Number);
    
    // Convert everything to seconds for accurate calculation
    const sessionTotalSeconds = (sessionHours * 3600) + (sessionMinutes * 60) + (sessionSeconds || 0);
    const dailyTotalSeconds = (dailyHours * 3600) + (dailyMinutes * 60);
    const totalSeconds = sessionTotalSeconds + dailyTotalSeconds;
    
    const newHours = Math.floor(totalSeconds / 3600);
    const newMinutes = Math.floor((totalSeconds % 3600) / 60);
    
    const newDailyHours = `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
    setDailyLoggedHours(newDailyHours);
    AsyncStorage.setItem('dailyLoggedHours', newDailyHours);
  };

  const handleClockIn = async () => {
    setIsLoading(true);
    try {
      const params = {
        notes: 'Starting work shift',
        location: {
          latitude: 40.7128,
          longitude: -74.0060,
        },
        deviceInfo: {
          deviceId: await DeviceInfo.getUniqueId(),
        }
      }
      const response = await clockIn(params);
      if (response.status === 200) {
        const now = new Date();
        const timeString = formatTime(now);
        
        // Immediately update local state
        setIsClockedIn(true);
        setClockInTime(timeString);
        
        // Create a temporary time entry for immediate UI update
        const tempTimeEntry: TimeEntry = {
          id: 'temp-' + Date.now(),
          userId: 1,
          clockIn: now.toISOString(),
          status: 'active',
          notes: 'Starting work shift',
          location: {
            latitude: 40.7128,
            longitude: -74.0060,
            address: 'Office Building, New York',
            _id: 'temp-location'
          }
        };
        setTimeEntry(tempTimeEntry);
        
        // Then refresh from server to get the actual entry
        setTimeout(async () => {
          await fetchTimeStatus();
        }, 500);
        
        // Alert.alert('Success', `Clocked in at ${timeString}`);
      } else {
        // Alert.alert('Error', response.data?.message || 'Failed to clock in');
      }
    } catch (error) {
      console.log('Clock in error:', error);
      // Alert.alert('Error', 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClockOut = async () => {
    setIsLoading(true);
    try {
    const params = {
      notes: 'Ending work shift',
    }
      const response = await clockOut(params);
      console.log('Clock out response:', response);
      
      if (response.status === 200) {
        const sessionDuration = timeEntry ? calculateDuration(timeEntry.clockIn) : '00:00';
        
        // Add session duration to daily hours
        addToDailyHours(sessionDuration);
        
        // Clear current session state
        setIsClockedIn(false);
        setClockInTime(null);
        setTimeEntry(null);
        setWorkedDuration(''); // Clear worked duration since we're using daily hours
        
        // Alert.alert('Success', `Clocked out! Session duration: ${sessionDuration}`);
        
        // Refresh status after clock out
        setTimeout(async () => {
          await fetchTimeStatus();
        }, 500);
      } else {
        // Alert.alert('Error', response.data?.message || 'Failed to clock out');
      }
    } catch (error) {
      console.log('Clock out error:', error);
      // Alert.alert('Error', 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentDuration = () => {
    if (!isClockedIn || !timeEntry) return '00:00';
    return calculateDuration(timeEntry.clockIn);
  };

  if (isLoadingStatus) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.parentView}>
          <View style={[styles.mainCardView]}>
            <View style={styles.clockContainer}>
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading time status...</Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.parentView}>
        <View style={[styles.mainCardView]}>
          <View style={styles.clockContainer}>
            {/* Header */}
            <View style={styles.header}>
              {/* <Text style={styles.title}>SHIFT TODAY : FLEXIBLE TIMINGS</Text> */}
            </View>

            {/* Main Card - Combined Day/Date and Clock In/Out */}
            <View style={styles.mainCard}>
              {/* Top Section - Day and Date */}
              <View style={styles.topSection}>
                <View style={styles.dateInfo}>
              <Text style={styles.title}>SHIFT TODAY</Text>
              <Spacer margin={5} />
                  <Text style={styles.currentDay}>
                    {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
                  </Text>
                  <Text style={styles.currentDate}>
                    {new Date().toLocaleDateString('en-US', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </Text>
                </View>
                <View style={styles.shiftProgress}>
                  <Text style={styles.progressText}>
                    {(() => {
                      const totalHours = parseFloat(dailyLoggedHours.split(':')[0]) + parseFloat(dailyLoggedHours.split(':')[1]) / 60;
                      if (totalHours >= 1) {
                        const hours = Math.floor(totalHours);
                        const minutes = Math.round((totalHours - hours) * 60);
                        return `${hours}h ${minutes}m / 9h`;
                      } else {
                        return `${Math.floor(parseFloat(dailyLoggedHours.split(':')[1]))}m / 9h`;
                      }
                    })()}
                  </Text>
                </View>
              </View>

              {/* Middle Section - Current Time */}
              {/* <View style={styles.timeSection}>
                <Text style={styles.currentTime}>
                  {formatTime(currentTime)}
                </Text>
              </View> */}

              {/* Bottom Section - Clock In/Out and Session Info */}
              <View style={styles.actionSection}>
                {/* Clock In/Out Button */}
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    isClockedIn ? styles.clockOutButton : styles.clockInButton
                  ]}
                  onPress={isClockedIn ? handleClockOut : handleClockIn}
                  disabled={isLoading}
                >
                  <Text style={styles.actionButtonText}>
                    {isLoading ? 'Processing...' : (isClockedIn ? 'Clock Out' : 'Clock In')}
                  </Text>
                </TouchableOpacity>

                {/* Session Information */}
                {isClockedIn && timeEntry && (
                  <View style={styles.sessionInfo}>
                    <Text style={styles.clockInTimeDisplay}>
                      ✓ Clocked in at {formatTime(new Date(timeEntry.clockIn))}
                    </Text>
                    <Text style={styles.sessionDuration}>
                      Session: {getCurrentDuration()}
                    </Text>
                  </View>
                )}

                {/* Daily Progress - Show when not clocked in */}
                {!isClockedIn && dailyLoggedHours !== '00:00' && (
                  <View style={styles.dailyProgress}>
                    <Text style={styles.dailyProgressText}>
                      Today's Total: {dailyLoggedHours}
                    </Text>
                  </View>
                )}
              </View>
            </View>

          </View>
        </View>
      </View>
      <Loader visible={isLoading} />
    </SafeAreaView>
  );
};

export default HomeScreen;