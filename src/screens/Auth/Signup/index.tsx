import { Alert, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import styles from './styles';
import VectorIcon from '../../../utils/VectorIcon';
import { IconsType } from '../../../utils/constants';
import images from '../../../assets/images';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../../navigation/types';
import { register } from '../../../api/auth';
import Loader from '../../../components/common/Loader';
import Toast from 'react-native-simple-toast';
import {Strings} from '../../../assets/strings';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const SignupScreen = () => {
    const [name, setName] = useState('');
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
        if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
          setErrorMsg(Strings.validation.required);
          return true;
        } 
      
        // Name length validation
        if (name.trim().length < 2) {
          setErrorMsg('Name must be at least 2 characters long');
          return true;
        }
      
        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
          setErrorMsg(Strings.validation.validEmailRequired);
          return true;
        }
      
        // Password length
        if (password.length < 6) {
          setErrorMsg(Strings.validation.password);
          return true;
        }
      
        // Password match
        if (password !== confirmPassword) {
          setErrorMsg(Strings.validation.passwordMatch);
          return true;
        }
        

        // If all checks pass
        setErrorMsg('');
        // proceed with registration API
      };
      

    const handleLogin = async () => {

        checkValidation();
        if(!checkValidation()){
        setLoading(true);
        const params = {
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }
        const res = await register(params);
        console.log('result', res)
        if(res.status === 201){
          Toast.show(res?.data?.message, Toast.LONG)
          navigation.navigate('Login')
          setLoading(false)
        } else {
          setLoading(false)
          Toast.show(res?.data?.error, Toast.LONG)
        }
        }
        return

    
        // Success action (e.g., API call)
      };

      const onSignupPress = () => {
        navigation.navigate('Login')
    }

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
      <Text style={styles.welcome}>{Strings.auth.signup.title}</Text>

      <View style={styles.inputBox}>
        <VectorIcon
              type={IconsType.FontAwesome6}
              name={'user-large'}
              color={'#555'}
              size={20}
            />
        <TextInput 
          placeholder={Strings.auth.signup.usernamePlaceholder} 
          style={styles.input} 
          value={name}
          onChangeText={val => setName(val)} />
      </View>

      <View style={styles.inputBox}>
        <VectorIcon
              type={IconsType.MaterialIcons}
              name={'email'}
              color={'#555'}
              size={20}
            />
        <TextInput 
          placeholder="Email Address" 
          style={styles.input} 
          value={email}
          onChangeText={val => setEmail(val)} />
      </View>

      <View style={styles.inputBox}>
        <VectorIcon
              type={IconsType.MaterialIcons}
              name={'lock'}
              color={'#555'}
              size={24}
            />
        <TextInput 
         placeholder={Strings.auth.signup.passwordPlaceholder} 
         value={password}
         secureTextEntry={secureTextEntry} 
         style={styles.input} onChangeText={val => setPassword(val)} />
            <TouchableOpacity onPress={() => {
                setSecureTextEntry(!secureTextEntry)
            }}>
            <VectorIcon
              type={IconsType.Feather}
              name={secureTextEntry ? 'eye' : 'eye-off'}
              color={'#555'}
              size={20}
            />
            </TouchableOpacity>
        
      </View>

      <View style={styles.inputBox}>
        <VectorIcon
              type={IconsType.MaterialIcons}
              name={'lock'}
              color={'#555'}
              size={24}
            />
        <TextInput 
         placeholder={Strings.auth.signup.confirmPasswordPlaceholder} 
         value={confirmPassword}
         secureTextEntry={secureTextEntryConfirm} 
         style={styles.input} onChangeText={val => setConfirmPassword(val)} />
            <TouchableOpacity onPress={() => {
                setSecureTextEntryConfirm(!secureTextEntryConfirm)
            }}>
            <VectorIcon
              type={IconsType.Feather}
              name={secureTextEntryConfirm ? 'eye' : 'eye-off'}
              color={'#555'}
              size={20}
            />
            </TouchableOpacity>
        
      </View>

      {errorMsg !== '' && (
          <Text style={{ color: 'red', marginBottom: 10 }}>{errorMsg}</Text>
        )}

     <View>
        <Text style={styles.signupTextDescription}>By clicking the Register button, you agree to the public offer</Text>
        </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>{Strings.auth.signup.signupButton}</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>- OR Continue with -</Text>

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialCircle}>
          <Image source={images.auth.google}/>

        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialCircle, {marginHorizontal: 10}]}>
          <Image source={images.auth.apple}/>

        </TouchableOpacity>
        <TouchableOpacity style={styles.socialCircle}>
          <Image source={images.auth.facebook}/>
        </TouchableOpacity>
      </View>

     

      <View style={styles.createAccountView}>

      <Text style={styles.signupText}>
      {Strings.auth.signup.hasAccount}
      </Text>
      <TouchableOpacity onPress={onSignupPress}><Text style={styles.signUp}>{Strings.auth.signup.loginLink}</Text></TouchableOpacity>
</View>
    </View>

</SafeAreaView>
  )
}

export default SignupScreen;
