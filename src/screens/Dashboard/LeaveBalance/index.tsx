import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Colors } from '../../../assets/colors';
import fonts from '../../../assets/fonts';
import VectorIcon from '../../../utils/VectorIcon';
import { IconsType } from '../../../utils/constants';
import { useNavigation } from '@react-navigation/native';
import { getLeaveList } from '../../../api/auth';
import styles from './styles';

interface LeaveStats {
  year: number;
  totalLeaves: number;
  pendingLeaves: number;
  approvedLeaves: number;
  rejectedLeaves: number;
  cancelledLeaves: number;
  totalDaysApplied: number;
  totalDaysApproved: number;
  leavesByType: {
    'Paid Leave': number;
    'Unpaid Leave': number;
  };
}

interface LeaveItem {
  id: string;
  leaveType: number;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status: number; // 1: pending, 2: approved, 3: rejected, 4: cancelled
  appliedDate: string;
}

const LeaveBalanceScreen = () => {
  const navigation = useNavigation();
  const [stats, setStats] = useState<LeaveStats | null>(null);
  const [leaves, setLeaves] = useState<LeaveItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLeaveData();
  }, []);

  const fetchLeaveData = async () => {
    setIsLoading(true);
    try {
      const response = await getLeaveList();
      if (response.status === 200 && response.data?.success) {
        setStats(response.data.stats);
        setLeaves(response.data.leaves);
      }
    } catch (error) {
      console.log('Error fetching leave data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getStatusText = (status: number) => {
    switch (status) {
      case 1:
        return 'Pending';
      case 2:
        return 'Approved';
      case 3:
        return 'Rejected';
      case 4:
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status: number) => {
    switch (status) {
      case 1:
        return Colors.APP_COLOR_DARK;
      case 2:
        return Colors.colorGreen;
      case 3:
        return Colors.redStatus;
      case 4:
        return Colors.grey_A8A8A9;
      default:
        return Colors.black;
    }
  };

  const getLeaveTypeText = (leaveType: number) => {
    return leaveType === 1 ? 'Paid Leave' : 'Unpaid Leave';
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.APP_COLOR_DARK} />
          <Text style={styles.loadingText}>Loading leave data...</Text>
        </View>
      </SafeAreaView>
    );
  }

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
        <Text style={styles.headerTitle}>Leave Balance</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        {stats && (
          <>
            {/* Main Stats Row */}
            <View style={styles.statsRow}>
              <View style={[styles.statCard, styles.statCardPrimary]}>
                <Text style={styles.statLabel}>Total Leaves</Text>
                <Text style={styles.statValue}>{stats.totalLeaves}</Text>
              </View>
              <View style={[styles.statCard, styles.statCardPending]}>
                <Text style={styles.statLabel}>Pending</Text>
                <Text style={styles.statValue}>{stats.pendingLeaves}</Text>
              </View>
            </View>

            {/* Secondary Stats Row */}
            <View style={styles.statsRow}>
              <View style={[styles.statCard, styles.statCardApproved]}>
                <Text style={styles.statLabel}>Approved</Text>
                <Text style={styles.statValue}>{stats.approvedLeaves}</Text>
              </View>
              <View style={[styles.statCard, styles.statCardRejected]}>
                <Text style={styles.statLabel}>Rejected</Text>
                <Text style={styles.statValue}>{stats.rejectedLeaves}</Text>
              </View>
            </View>

            {/* Days Stats Row */}
            <View style={styles.statsRow}>
              <View style={[styles.statCard, styles.statCardDays]}>
                <Text style={styles.statLabel}>Days Applied</Text>
                <Text style={styles.statValue}>{stats.totalDaysApplied}</Text>
              </View>
              <View style={[styles.statCard, styles.statCardDays]}>
                <Text style={styles.statLabel}>Days Approved</Text>
                <Text style={styles.statValue}>{stats.totalDaysApproved}</Text>
              </View>
            </View>

            {/* Leave Type Stats */}
            <View style={styles.leaveTypeContainer}>
              <Text style={styles.sectionTitle}>Leaves by Type</Text>
              <View style={styles.leaveTypeRow}>
                <View style={styles.leaveTypeCard}>
                  <Text style={styles.leaveTypeLabel}>Paid Leave</Text>
                  <Text style={styles.leaveTypeValue}>
                    {stats.leavesByType['Paid Leave'] || 0}
                  </Text>
                </View>
                <View style={styles.leaveTypeCard}>
                  <Text style={styles.leaveTypeLabel}>Unpaid Leave</Text>
                  <Text style={styles.leaveTypeValue}>
                    {stats.leavesByType['Unpaid Leave'] || 0}
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}

        {/* Leaves List */}
        <View style={styles.leavesListContainer}>
          <Text style={styles.sectionTitle}>My Leaves ({stats?.year || new Date().getFullYear()})</Text>
          {leaves.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No leaves found</Text>
            </View>
          ) : (
            leaves.map((leave) => (
              <View key={leave.id} style={styles.leaveCard}>
                <View style={styles.leaveCardHeader}>
                  <View style={styles.leaveCardHeaderLeft}>
                    <Text style={styles.leaveDateRange}>
                      {formatDate(leave.startDate)} - {formatDate(leave.endDate)}
                    </Text>
                    <Text style={styles.leaveDays}>{leave.totalDays} day(s)</Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusColor(leave.status) + '20' },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        { color: getStatusColor(leave.status) },
                      ]}
                    >
                      {getStatusText(leave.status)}
                    </Text>
                  </View>
                </View>

                <View style={styles.leaveCardBody}>
                  <View style={styles.leaveInfoRow}>
                    <Text style={styles.leaveInfoLabel}>Type:</Text>
                    <Text style={styles.leaveInfoValue}>
                      {getLeaveTypeText(leave.leaveType)}
                    </Text>
                  </View>
                  <View style={styles.leaveInfoRow}>
                    <Text style={styles.leaveInfoLabel}>Applied:</Text>
                    <Text style={styles.leaveInfoValue}>
                      {formatDate(leave.appliedDate)}
                    </Text>
                  </View>
                  {leave.reason && (
                    <View style={styles.reasonContainer}>
                      <Text style={styles.reasonLabel}>Reason:</Text>
                      <Text style={styles.reasonText}>{leave.reason}</Text>
                    </View>
                  )}
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LeaveBalanceScreen;


