import { NavigationContainer } from '@react-navigation/native';
import AppStack from './appStack';
import AuthStack from './authStack';
import { useSelector } from 'react-redux';
import { userSelector } from '../store/reducers/user';



export default function MainStack() {
    const user = useSelector(userSelector)

    return (
        <NavigationContainer>
           {user?.user?.uid ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
}