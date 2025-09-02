import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  Platform,
} from "react-native";
import { launchImageLibrary, launchCamera, MediaType, PhotoQuality } from "react-native-image-picker";
// import styles from "./styles";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import images from "../../../../assets/images";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../../../navigation/types";
import { Colors } from "../../../../assets/colors";
import { getProfile, updateProfile } from "../../../../api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-simple-toast';
import styles from "./styles";
import Loader from "../../../../components/common/Loader";

const EditProfileScreen = (props: {navigation: NativeStackNavigationProp<AuthStackParamList>}) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    props.navigation.setOptions({
    //   headerTitle: () => setHeaderTitle(),
    //   headerLeft: () => setHeaderLeft(),
    });
    getProfileData();
  }, []);

  const setHeaderTitle = () => {
    return (
      <Text style={styles.title}>Edit Profile</Text>
    );
  }

  const setHeaderLeft = () => {
    return (
      <TouchableOpacity onPress={onBackPress}>
        <Text style={styles.backButton}>Cancel</Text>
      </TouchableOpacity>
    );
  }



  const getProfileData = async () => {
    const res = await getProfile();
    console.log("res___", res);
    if(res.status === 200){
      setUserName(res.data?.user?.name || "");
      setUserEmail(res.data?.user?.email || "");
      setProfileImage(res.data?.user?.profile_image || null);
    }
  }

  const onBackPress = () => {
    props.navigation.goBack();
  }

  const onSavePress = async () => {
    if (!userName.trim() || !userEmail.trim()) {
      Toast.show('Please fill all fields', Toast.SHORT);
      return;
    }

    setLoading(true);
    try {
      const params = {
        name: userName.trim(),
        email: userEmail.trim(),
        // profile_image: profileImage
      };
      
      const res = await updateProfile(params);
      if(res.status === 200){
        Toast.show('Profile updated successfully', Toast.SHORT);
        props.navigation.goBack();
      } else {
        Toast.show(res?.data?.error || 'Update failed', Toast.SHORT);
      }
    } catch (error) {
      Toast.show('Something went wrong', Toast.SHORT);
    } finally {
      setLoading(false);
    }
  }
  
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
              setProfileImage(response.assets[0].uri || null);
            }
          });
    } catch (error) {
      console.log("Gallery Error: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        <Loader visible={loading} />

      <View style={styles.parentView}>
        <View style={[styles.mainCardView]}>
          <View
            style={[
              styles.cardView,
              styles.cardpaddingHolder,
              styles.shadowView,
              { marginTop: 25, paddingBottom: 10, paddingTop: 10 },
            ]}>
            <KeyboardAwareScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}>
              
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
                  <TouchableOpacity style={styles.editPhotoButton} onPress={selectImage}>
                    <Image
                      source={images.profile.icEdit}
                      style={styles.cameraIcon}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.changePhotoButton} onPress={selectImage}>
                  <Text style={styles.changePhotoText}>Change Photo</Text>
                </TouchableOpacity>
              </View>

              {/* User Info Section */}
              <View style={styles.userInfoSection}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Full Name</Text>
                  <View style={styles.inputWrapper}>
                    <View style={styles.inputIconContainer}>
                      <Image
                        source={images.profile.icEdit}
                        style={styles.inputIcon}
                      />
                    </View>
                    <TextInput
                      style={styles.inputText}
                      value={userName}
                      onChangeText={setUserName}
                      placeholder="Enter your full name"
                      placeholderTextColor="#999"
                    />
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Email Address</Text>
                  <View style={styles.inputWrapper}>
                    <View style={styles.inputIconContainer}>
                      <Image
                        source={images.profile.icEdit}
                        style={styles.inputIcon}
                      />
                    </View>
                    <TextInput
                      style={styles.inputText}
                      value={userEmail}
                      onChangeText={setUserEmail}
                      placeholder="Enter your email"
                      placeholderTextColor="#999"
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                </View>
                <TouchableOpacity style={styles.btnContainer} onPress={onSavePress}>
                <Text style={styles.logoutText}>Save</Text>
              </TouchableOpacity>
              </View>

            </KeyboardAwareScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
