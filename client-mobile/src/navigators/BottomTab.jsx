import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/HomeScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dimensions } from 'react-native';
import StackNavigator from './StackNavigation';


const height = Dimensions.get("window").height
const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator screenOptions={{ 
      headerShown: false,
      tabBarActiveTintColor: 'red',
      tabBarStyle: {
        height: height * 0.1
      }
      }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name='home' size={30} color={color}/>
        )
      }} />
      <Tab.Screen name="StackNavigator" component={StackNavigator} options={{
        tabBarLabel: 'Products',
        tabBarIcon: ({size, color}) => (
          <MaterialCommunityIcons name='shopping' size={size} color={color}/>
        )
      }} />
    </Tab.Navigator>
  );
}