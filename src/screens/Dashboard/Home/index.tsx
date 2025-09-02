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
        console.log('Is clocked in:', isClockedIn);
        console.log('Current session:', currentSession);
        
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
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const addToDailyHours = (sessionDuration: string) => {
    const [sessionHours, sessionMinutes] = sessionDuration.split(':').map(Number);
    const [dailyHours, dailyMinutes] = dailyLoggedHours.split(':').map(Number);
    
    let totalMinutes = (dailyHours + sessionHours) * 60 + dailyMinutes + sessionMinutes;
    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;
    
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
          address: 'Office Building, New York'
        },
        deviceInfo: {
          deviceId: 'mobile-123'
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
              <Text style={styles.title}>Time Tracking</Text>
              <Text style={styles.subtitle}>Track your work hours</Text>
              <TouchableOpacity 
                style={styles.refreshButton} 
                onPress={fetchTimeStatus}
              >
                <VectorIcon
                  type={IconsType.Ionicons}
                  name="refresh"
                  size={20}
                  color={Colors.APP_COLOR_DARK}
                />
              </TouchableOpacity>
            </View>

            {/* Status Card - Only show when clocked in */}
            {isClockedIn && (
              <View style={styles.statusCard}>
                <View style={styles.statusIcon}>
                  <VectorIcon
                    type={IconsType.Ionicons}
                    name="time"
                    size={40}
                    color={Colors.APP_COLOR_DARK}
                  />
                </View>
                
                <Text style={styles.statusText}>
                  Currently Working
                </Text>
                
                {timeEntry && (
                  <>
                    <Text style={styles.clockInTime}>
                      Clocked in at {formatTime(new Date(timeEntry.clockIn))}
                    </Text>
                    <Text style={styles.clockInDate}>
                      {formatDate(timeEntry.clockIn)}
                    </Text>
                    {timeEntry.notes && (
                      <Text style={styles.notesText}>
                        Notes: {timeEntry.notes}
                      </Text>
                    )}
                  </>
                )}
              </View>
            )}

            {/* Timer Display - Only show when clocked in */}
            {isClockedIn && (
              <View style={styles.timerContainer}>
                <Text style={styles.timerLabel}>Current Session</Text>
                <View style={styles.timerContent}>
                  <View style={styles.timeUnit}>
                    <Text style={styles.timeValue}>{getCurrentDuration().split(':')[0]}</Text>
                    <Text style={styles.timeLabel}>Hrs</Text>
                  </View>
                  <Text style={styles.timeSeparator}>:</Text>
                  <View style={styles.timeUnit}>
                    <Text style={styles.timeValue}>{getCurrentDuration().split(':')[1]}</Text>
                    <Text style={styles.timeLabel}>Mins</Text>
                  </View>
                </View>
              </View>
            )}

            {/* Daily Logged Hours - Show when not clocked in */}
            {!isClockedIn && dailyLoggedHours !== '00:00' && (
              <View style={styles.durationContainer}>
                <Text style={styles.durationLabel}>Today's Total Hours</Text>
                <Text style={styles.duration}>{dailyLoggedHours}</Text>
              </View>
            )}

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.clockButton,
                  styles.clockInButton,
                  isClockedIn && styles.disabledButton
                ]}
                onPress={handleClockIn}
                disabled={isClockedIn || isLoading}
              >
                <VectorIcon
                  type={IconsType.Ionicons}
                  name="play"
                  size={24}
                  color={Colors.white}
                />
                <Text style={styles.buttonText}>
                  {isLoading ? 'Processing...' : 'Clock In'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.clockButton,
                  styles.clockOutButton,
                  !isClockedIn && styles.disabledButton
                ]}
                onPress={handleClockOut}
                disabled={!isClockedIn || isLoading}
              >
                <VectorIcon
                  type={IconsType.Ionicons}
                  name="stop"
                  size={24}
                  color={Colors.white}
                />
                <Text style={styles.buttonText}>
                  {isLoading ? 'Processing...' : 'Clock Out'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <Loader visible={isLoading} />

    </SafeAreaView>
  );
};

export default HomeScreen;