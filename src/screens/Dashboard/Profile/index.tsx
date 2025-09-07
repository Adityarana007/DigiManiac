import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  ScrollView,
} from "react-native";
import { launchImageLibrary, launchCamera, MediaType, PhotoQuality } from "react-native-image-picker";
import styles from "./styles";
import images from "../../../assets/images";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../../navigation/types";
import { Colors } from "../../../assets/colors";
import { getProfile } from "../../../api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useSession } from "../../../context/SessionContext";
import { navigateToLogin } from "../../../utils/navigationService";

const ProfileScreen = (props: {navigation: NativeStackNavigationProp<AuthStackParamList>}) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userName, setUserName] = useState("John Doe");
  const [userEmail, setUserEmail] = useState("john.doe@example.com");
  const [userDesignation, setUserDesignation] = useState("Software Developer");
  const { showSessionExpiredModal } = useSession();

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: () => setHeaderTitle(),
      headerRight: () => setHeaderRight(),
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      getProfileApi();
    }, [])
  );

  const setHeaderTitle = () => {
    return (
      <Text style={styles.title}>Profile</Text>
    );
  }

  useEffect(() => {
    getProfileApi();
  }, []);

  const getProfileApi = async () => {
    try {
      const res = await getProfile();
      console.log("res___", res);
      if(res.status === 200){
        setUserName(res.data?.user?.name);
        setUserEmail(res.data?.user?.email);
        setUserDesignation(res.data?.user?.designation || "Software Developer");
      } else if (res.status === 401) {
        // Token expired - modal will be shown automatically by API client
        console.log("Token expired in Profile screen");
      } else {
        //   Toast.show(res?.data?.error, Toast.LONG);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }
  
  const setHeaderRight = () => {
    return (
      <TouchableOpacity onPress={() => props.navigation.getParent()?.navigate('EditProfile')}>
        <Image
            style={{ width: 20, height: 20, tintColor: Colors.white, marginRight: 20 }}
            source={images.profile.icEdit}
          />
      </TouchableOpacity>
    );
  };
  
  const selectImage = () => {
    Alert.alert(
      "Select Image",
      "Choose image source",
      [
        {
          text: "Camera",
          onPress: () => openCamera(),
        },
        {
          text: "Gallery",
          onPress: () => openGallery(),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  const openCamera = () => {
    const options = {
      mediaType: "photo" as MediaType,
      quality: 0.8 as PhotoQuality,
      includeBase64: false,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled camera");
      } else if (response.errorCode) {
        console.log("Camera Error: ", response.errorMessage);
      } else if (response.assets && response.assets[0]) {
        setProfileImage(response.assets[0].uri || null);
      }
    });
  };

  const openGallery = () => {
    try {
        const options = {
            mediaType: "photo" as MediaType,
            quality: 0.8 as PhotoQuality,
            includeBase64: false,
          };
          launchImageLibrary(options, (response) => {
            if (response.didCancel) {
              console.log("User cancelled gallery");
            } else if (response.errorCode) {
              console.log("Gallery Error: ", response.errorMessage);
            } else if (response.assets && response.assets[0]) {
                // alert('success')
              setProfileImage(response.assets[0].uri || null);
            }
          });
    } catch (error) {
      console.log("Gallery Error: ", error);
    }
  
  };

  const onLogoutPress = async () => {
    try {
      await AsyncStorage.clear();
      navigateToLogin();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        
        {/* Profile Photo Section */}
        <View style={styles.profilePhotoSection}>
          <View style={styles.profilePhotoContainer}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profilePhoto} />
            ) : (
              <View style={styles.defaultProfilePhoto}>
                <Image
                  source={images.common.default_user}
                  style={styles.defaultUserIcon}
                />
              </View>
            )}
          </View>
        </View>

        {/* User Info Section */}
        <View style={styles.userInfoSection}>
          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Full Name</Text>
              <Text style={styles.infoValue}>{userName}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Email Address</Text>
              <Text style={styles.infoValue}>{userEmail}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Designation</Text>
              <Text style={styles.infoValue}>{userDesignation}</Text>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.btnContainer} onPress={onLogoutPress}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;