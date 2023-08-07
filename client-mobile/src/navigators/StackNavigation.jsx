import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailScreen from '../screen/DetailScreen'
import ProductsScreen from '../screen/ProductsScreen';
const Stack = createNativeStackNavigator()

export default function StackNavigator() {
    return(
        <Stack.Navigator>
            <Stack.Screen name='Products' component={ProductsScreen} options={{headerShown: false}}/>
            <Stack.Screen name='Detail' component={DetailScreen}/>
        </Stack.Navigator>
    )
}