import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from "react-native";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import styles from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import images from "../../../assets/images";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../../navigation/types";
import { Colors } from "../../../assets/colors";
import { getProfile } from "../../../api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = (props: {navigation: NativeStackNavigationProp<AuthStackParamList>}) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userName, setUserName] = useState("John Doe");
  const [userEmail, setUserEmail] = useState("john.doe@example.com");

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: () => setHeaderTitle(),
      headerRight: () => setHeaderRight(),
      
    });
  }, []);

  const setHeaderTitle = () => {
    return (
      <Text style={styles.title}>Profile</Text>
    );
  }

  useEffect(() => {
    getProfileApi();
  }, []);

  const getProfileApi = async () => {
    const res = await getProfile();
    console.log("res___", res);
    if(res.status === 200){
      setUserName(res.data?.user?.name);
      setUserEmail(res.data?.user?.email);
    }  else {
    //   Toast.show(res?.data?.error, Toast.LONG);
    }
  }
  const setHeaderRight = () => {
    return (
      <TouchableOpacity onPress={() => {}}>
        {/* <Text>Settings</Text> */}
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
      mediaType: "photo",
      quality: 0.8,
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
            mediaType: "photo",
            quality: 0.8,
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
    AsyncStorage.clear();
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'Root' }],
    });
  }

  return (
    <SafeAreaView style={styles.container}>
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
                    <Image
                    source={images.common.default_user}
                    style={styles.userimage}
                  />
                  )}
                  <TouchableOpacity style={styles.editPhotoButton} onPress={selectImage}>
                    {/* <VectorIcon
                      type="MaterialIcons"
                      name="camera-alt"
                      size={20}
                      color="#fff"
                    /> */}
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
                    {/* <VectorIcon
                      type="MaterialIcons"
                      name="person"
                      size={20}
                      color="#666"
                      style={styles.inputIcon}
                    /> */}
                    <Text style={styles.inputText}>{userName}</Text>
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Email Address</Text>
                  <View style={styles.inputWrapper}>
                    {/* <VectorIcon
                      type="MaterialIcons"
                      name="email"
                      size={20}
                      color="#666"
                      style={styles.inputIcon}
                    /> */}
                    <Text style={styles.inputText}>{userEmail}</Text>
                  </View>
                </View>
              </View>

              {/* Save Button */}
              <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnContainer} onPress={onLogoutPress}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

            </KeyboardAwareScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;