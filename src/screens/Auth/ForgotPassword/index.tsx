import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import VectorIcon from '../../../utils/VectorIcon';
import {IconsType} from '../../../utils/constants';
import images from '../../../assets/images';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {AuthStackParamList} from '../../../navigation/types';
import {register, verifyEmail} from '../../../api/auth';
import Loader from '../../../components/common/Loader';
import Toast from 'react-native-simple-toast';
import {Strings} from '../../../assets/strings';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntryConfirm, setSecureTextEntryConfirm] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  const checkValidation = () => {
    // Reset error
    setErrorMsg('');

    // Basic empty checks
    if (!email.trim()) {
      setErrorMsg(Strings.validation.required);
      return true;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMsg(Strings.validation.validEmailRequired);
      return true;
    }

    // If all checks pass
    setErrorMsg('');
    // proceed with registration API
  };

  const handleForgot = async () => {
    checkValidation();
    if (!checkValidation()) {
      setLoading(true);
      const params = {
        email: email,
      };
      const res = await verifyEmail(params);
      console.log('resultVerifyEmail', res);
      if (res.status === 200) {
        navigation.navigate('ChangePassword', {
            emailId: email
        });
        Toast.show(res?.data?.message, Toast.LONG)

        setLoading(false);
      } else {
        setLoading(false);
        Toast.show(res?.data?.error, Toast.LONG)
        // setErrorMsg(res?.data?.error)
        // Alert.alert(res?.data?.error);
      }
    }
    return;

    // Success action (e.g., API call)
  };

  const onBackPress = () => {
    navigation.goBack();
  }


  return (
    <SafeAreaView style={styles.container}>
         <TouchableOpacity style={styles.backView} onPress={onBackPress}>
        <VectorIcon
              type={IconsType.Ionicons}
              name={'chevron-back'}
              color={'#555'}
              size={28}
            />
        </TouchableOpacity>
      <View style={styles.container}>
        <Loader visible={loading} />
       
        <Text style={styles.welcome}>{Strings.auth.forgotPassword.title}</Text>

        <View style={styles.inputBox}>
          <VectorIcon
            type={IconsType.FontAwesome6}
            name={'user-large'}
            color={'#555'}
            size={20}
          />
          <TextInput
            placeholder={Strings.auth.forgotPassword.emailPlaceholder}
            style={styles.input}
            onChangeText={val => setEmail(val)}
          />
        </View>

        {errorMsg !== '' && (
          <Text style={{color: 'red', marginBottom: 10}}>{errorMsg}</Text>
        )}

        <View>
          <Text style={styles.signupTextDescription}>
            By clicking forgot password, your password will be changed directly*
          </Text>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleForgot}>
          <Text style={styles.loginText}>{Strings.auth.forgotPassword.submitButton}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
