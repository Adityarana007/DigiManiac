import { Alert, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import styles from '../styles';
import VectorIcon from '../../../../utils/VectorIcon';
import { IconsType } from '../../../../utils/constants';
import images from '../../../../assets/images';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../../../navigation/types';
import { register, updatePassword } from '../../../../api/auth';
import Loader from '../../../../components/common/Loader';
import Toast from 'react-native-simple-toast';
import {Strings} from '../../../../assets/strings';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;
const ChangePassword = (props: any) => {
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
        if (!password.trim() || !confirmPassword.trim()) {
          setErrorMsg(Strings.validation.required);
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
            email: props?.route?.params?.emailId,
            password: password,
            confirmPassword: confirmPassword
        }
        console.log('paramss', params)
        const res = await updatePassword(params);
        console.log('resultChange', res)
        if(res.status === 200){
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
      <Text style={styles.welcome}>{Strings.auth.changePassword.title}</Text>

      <View style={styles.inputBox}>
        <VectorIcon
              type={IconsType.MaterialIcons}
              name={'lock'}
              color={'#555'}
              size={24}
            />
        <TextInput 
         placeholder={Strings.auth.changePassword.newPasswordPlaceholder} 
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
         placeholder={Strings.auth.changePassword.confirmNewPasswordPlaceholder} 
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
        <Text style={styles.signupTextDescription}>By clicking forgot password, your password will be changed directly*</Text>
        </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>{Strings.auth.changePassword.changeButton}</Text>
      </TouchableOpacity>




     


    </View>

</SafeAreaView>
  )
}

export default ChangePassword;
