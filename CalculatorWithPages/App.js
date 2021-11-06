import React from 'react';
import CalculatorScreen  from './CalculatorScreen';
import HistoryScreen from './HistoryScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from'@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Calculator" component={CalculatorScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}