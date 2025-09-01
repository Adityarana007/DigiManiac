import {
  Image,
  NativeModules,
  SafeAreaView,
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
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../../navigation/types';
import fonts from '../../../assets/fonts';
import {Colors} from '../../../assets/colors';
import {login} from '../../../api/auth';
import Loader from '../../../components/common/Loader';
import {setItem, StorageKeys} from '../../../utils/storage';
import Toast from 'react-native-simple-toast';
import {Strings} from '../../../assets/strings';
import { Spacer } from '../../../components/common/Spacer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { actualdeviceSize } from '../../../utils/helpers';
import { setAccessToken } from '../../../api/client';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;
const {LoginModule} = NativeModules;
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  // const { signIn } = useAuth();

  const navigation = useNavigation<NavigationProp>();

  const checkValidation = () => {
    // Reset error
    setErrorMsg('');

    // Validation checks
    if (!email.trim() || !password.trim()) {
      setErrorMsg(Strings.validation.bothFieldsRequired);
      return true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMsg(Strings.validation.validEmailRequired);
      return true;
    }
  };

  const handleLogin = async () => {
    if (!checkValidation()) {
      // Success action (e.g., API call)
      setLoading(true);
      const params = {
        email: email,
        password: password,
      };
      const res = await login(params);
      console.log('result', res);
      if (res.status === 200) {
        console.log('loginToken____', res.data.accessToken);
        await setItem(StorageKeys.TOKEN, res.data.accessToken);
        setLoading(false);
        Toast.show(res?.data?.message, Toast.LONG);

        navigation.reset({
          index: 0,
          routes: [{name: 'Root'}],
        });
      } else {
        setLoading(false);
        if (res?.data == null) {
          Toast.show(Strings.errors.somethingWentWrong, Toast.LONG);
        } else {
          Toast.show(res?.data?.error, Toast.LONG);
        }
      }
    }
  };
  const onSignupPress = () => {
    navigation.navigate('Signup');
  };

  const onPressForgot = () => {
    navigation.navigate('Forgot');
  };

  const onPressNativeiOS = () => {
    LoginModule.openLoginScreen();
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
        <Loader visible={loading} />
        <Spacer margin={10} />
        {/* <Text style={styles.welcome}>{Strings.auth.login.title}</Text> */}
        <Image source={images.common.logo} style={styles.logo} />
        <Spacer margin={30} />

        <View style={styles.inputBox}>
          <VectorIcon
            type={IconsType.FontAwesome6}
            name={'user-large'}
            color={'#555'}
            size={20}
          />
          <TextInput
            placeholder={Strings.auth.login.usernamePlaceholder}
            style={styles.input}
            value={email}
            placeholderTextColor={Colors.grey_C4C4C4}
            onChangeText={val => setEmail(val?.toLowerCase())}
          />
        </View>

        <View style={styles.inputBox}>
          <VectorIcon
            type={IconsType.MaterialIcons}
            name={'lock'}
            color={'#555'}
            size={24}
          />
          <TextInput
            placeholder={Strings.auth.login.passwordPlaceholder}
            secureTextEntry={secureTextEntry}
            style={styles.input}
            placeholderTextColor={Colors.grey_C4C4C4}
            value={password}
            onChangeText={val => setPassword(val)}
          />
          <TouchableOpacity
            onPress={() => {
              setSecureTextEntry(!secureTextEntry);
            }}>
            <VectorIcon
              type={IconsType.Feather}
              name={secureTextEntry ? 'eye' : 'eye-off'}
              color={'#555'}
              size={20}
            />
          </TouchableOpacity>
        </View>

        {errorMsg !== '' && (
          <Text
            style={{
              color: Colors.validation_red,
              marginBottom: 20,
              fontFamily: fonts.montserratRegular,
            }}>
            {errorMsg}
          </Text>
        )}

        <TouchableOpacity onPress={onPressForgot} style={{
          flex: 1,
          alignSelf: 'flex-end',
          alignItems: 'flex-end',
          marginBottom: 25,
          width: actualdeviceSize.width / 2
        }}>
          <Text style={styles.forgot}>{Strings.auth.login.forgotPassword}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>{Strings.auth.login.loginButton}</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>- OR Continue with -</Text>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialCircle}>
            <Image source={images.auth.google} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.socialCircle, {marginHorizontal: 10}]}>
            <Image source={images.auth.apple} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialCircle}>
            <Image source={images.auth.facebook} />
          </TouchableOpacity>
        </View>

        <View style={styles.createAccountView}>
          <Text style={styles.signupText}>{Strings.auth.login.createAccount}</Text>
          <TouchableOpacity onPress={onSignupPress}>
            <Text style={styles.signUp}>{Strings.auth.login.signupLink}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
