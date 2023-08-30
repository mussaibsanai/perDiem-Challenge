import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native';
import {
  GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
  import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { userLoggedIn, userSelector } from '../../../store/reducers/user';

interface LoginScreenProps {
  navigation: any; // You can replace 'any' with the appropriate navigation type
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('jane.doe@example.com');
  const [password, setPassword] = useState<string>('SuperSecretPassword!');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useSelector(userSelector);

  useEffect(() => {
    GoogleSignin.configure({})
  }, []);

  useEffect(() => {
    console.log("userr logged in", user)
  }, [user])
  
  const handleEmailLogin = () => {
    setIsLoading(true)
    auth()
  .createUserWithEmailAndPassword(email, password)
  .then(() => {
    console.log('User account created & signed in!');
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      auth().signInWithEmailAndPassword(email, password).then((res) => {
        console.log('User signed in!');
        dispatch(userLoggedIn(res as any));
        setIsLoading(false)
      }).catch((error) => {
        console.log(error);
        Alert.alert('Error');
        setIsLoading(false)
      }); 
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
      Alert.alert('Invalid Email');
    }

    console.error(error);
  });
  };

  const handleGoogleLogin = async () => {
    // try {
    //   await GoogleSignin.hasPlayServices();
    //   await GoogleSignin.signIn();
    //   const userInfo = await GoogleSignin.getTokens();
    //   return userInfo;
    // } catch (error : any) {
    //   Alert.alert('Error');
    //   if (error?.code === statusCodes.SIGN_IN_CANCELLED) {
    //     // user cancelled the login flow
    //   } else if (error?.code === statusCodes.IN_PROGRESS) {
    //     // operation (e.g. sign in) is in progress already
    //   } else if (error?.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //     // play services not available or outdated
    //   } else {
    //     // some other error happened
    //   }
    // }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        style={styles.input}
      />
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleEmailLogin}
        disabled={isLoading}
      >
        {isLoading ? <ActivityIndicator size={"large"} color={"#aeaeae"} /> : <Text style={{fontSize : 18, color : "#fff"}}>Login</Text>}
      </TouchableOpacity>
      <GoogleSigninButton
        style={styles.googleButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={handleGoogleLogin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width : '100%'
  },
  input: {
    width: '100%',
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',  
  },
  loginButton: {
    width: '70%',
    marginBottom: 15,
    alignItems : 'center',
    padding: 10,
    backgroundColor: '#1e5fc7',
    borderRadius : 5,
    marginVertical : 10,
  },
  googleButton: {
    width: 192,
    height: 48,
  },
});

export default LoginScreen;
