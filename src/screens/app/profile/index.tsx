import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { userLoggedOut, userSelector } from '../../../store/reducers/user';

interface ProfileScreenProps {
  navigation: any; // You can replace 'any' with the appropriate navigation type
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const handleLogout = () => {
    auth()
  .signOut()
  .then(() => console.log('User signed out!'));
  dispatch(userLoggedOut())
    // Implement your logout logic here
    // For example: clear user data, navigate to the login screen, etc.
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Profile Screen!</Text>
      <View>
        <Text>Email: {user?.user?.email}</Text>
      </View>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ProfileScreen;