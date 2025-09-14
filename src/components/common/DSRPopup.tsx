import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Colors } from '../../assets/colors';
import fonts from '../../assets/fonts';
import Toast from 'react-native-simple-toast';

interface DSRPopupProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (dsr: string) => void;
  isLoading?: boolean;
}

const DSRPopup: React.FC<DSRPopupProps> = ({
  visible,
  onClose,
  onSubmit,
  isLoading = false,
}) => {
  const [dsrText, setDsrText] = useState('');

  const handleSubmit = () => {
    if (!dsrText.trim()) {
      Toast.show('Please enter your Daily Status Report before clocking out.', Toast.SHORT);
      return;
    }

    onSubmit(dsrText.trim());
  };

  const handleClose = () => {
    setDsrText('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Daily Status Report</Text>
            <Text style={styles.modalSubtitle}>
              Please provide your daily status report before clocking out
            </Text>
          </View>

          <View style={styles.modalBody}>
            <Text style={styles.inputLabel}>Daily Status Report *</Text>
            <TextInput
              style={styles.dsrTextInput}
              value={dsrText}
              onChangeText={setDsrText}
              placeholder="Enter your daily status report..."
              placeholderTextColor={Colors.grey_A8A8A9}
              multiline={true}
              numberOfLines={6}
              textAlignVertical="top"
              editable={!isLoading}
            />
            <Text style={styles.inputHint}>This field is mandatory for clock out</Text>
          </View>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={[styles.cancelButton, isLoading && styles.disabledButton]}
              onPress={handleClose}
              disabled={isLoading}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.submitButton,
                isLoading && styles.disabledButton,
              ]}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              <Text style={styles.submitButtonText}>
                {isLoading ? 'Processing...' : 'Submit & Clock Out'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    width: '100%',
    maxHeight: '80%',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: fonts.montserratBold,
    color: Colors.APP_COLOR_DARK,
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    fontFamily: fonts.montserratRegular,
    color: Colors.grey_A8A8A9,
  },
  modalBody: {
    padding: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: fonts.montserratMedium,
    color: Colors.APP_COLOR_DARK,
    marginBottom: 8,
  },
  dsrTextInput: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    fontFamily: fonts.montserratRegular,
    color: Colors.black,
    backgroundColor: '#F8F9FA',
    minHeight: 120,
    textAlignVertical: 'top',
  },
  inputHint: {
    fontSize: 12,
    fontFamily: fonts.montserratRegular,
    color: Colors.grey_A8A8A9,
    marginTop: 8,
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.grey_A8A8A9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    fontFamily: fonts.montserratMedium,
    color: Colors.grey_A8A8A9,
  },
  submitButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: Colors.colorGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    fontSize: 14,
    fontFamily: fonts.montserratMedium,
    color: Colors.white,
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default DSRPopup;
