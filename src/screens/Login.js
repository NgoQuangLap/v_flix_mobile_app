import {useState, React} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../constants/colors';
import {AppInputText} from '../components/app-inut-text';
import {AppButton} from '../components/app-button';
import {useDispatch} from 'react-redux';
import { loginApp } from '../redux/authen/authSlice';
import {loginUser } from '../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { DATA_USER, ROUTER } from '../constants/key';
import { useNavigation } from '@react-navigation/native';

export function LoginScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [account, setAccount] = useState({
    userEmail: 'loitest@gmail.com',
    userPassword: 'Aa12345',
  });

  const hanldeLogin = async () => {
    try {
      const data = await loginUser(account);
      if (data) {
        console.log(data.toString());
        await AsyncStorage.setItem(DATA_USER, JSON.stringify(data));
        dispatch(loginApp(data));
        navigation.navigate(ROUTER.HOME);
      }
    } catch (error) {
      dispatch(loginError({}));
    }
  };

  const loginGG = async () => {
    console.log(123123);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      // this.setState({ userInfo });
    } catch (error) {
      console.log(error?.code);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <View style={styles.containner}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.formLogin}>
        <View style={{marginBottom: 24}}>
          <AppInputText
            value={account.userEmail}
            lable="Email"
            onChange={value => setAccount({...account, userEmail: value})}
            bgColorInput={'rgb(229 231 235)'}
            colorText={COLORS.black}
          />
        </View>
        <View style={{marginBottom: 24}}>
          <AppInputText
            value={account.userPassword}
            lable="Password"
            onChange={value => setAccount({...account, userPassword: value})}
            bgColorInput={'rgb(229 231 235)'}
            colorText={COLORS.black}
            maxLength={24}
            secureTextEntry={true}
          />
        </View>
        <View style={{marginTop: 12}}>
          <AppButton label="Login" onPress={() => hanldeLogin()} />
          <GoogleSigninButton
            style={[styles.BtnLoginGG]}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={loginGG}
            disabled={false}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containner: {
    backgroundColor: COLORS.backgroundThemeDark,
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 32,
    color: COLORS.white,
    textAlign: 'center',
    marginTop: 120,
    marginBottom: 32,
  },
  formLogin: {
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 32,
    marginRight: 32,
    borderRadius: 12,
    backgroundColor: COLORS.white,
  },
  BtnLoginGG: {
    width: "100%",
    height: 48,
    marginTop: 12,
  }
});