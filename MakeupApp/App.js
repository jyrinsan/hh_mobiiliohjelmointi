import React from 'react';
import { StyleSheet} from 'react-native';
import { Header } from 'react-native-elements';
import ResultsScreen  from './components/ResultsScreen';
import ProductScreen  from './components/ProductScreen';
import ProductWebView  from './components/ProductWebView';
import HomeScreen from './components/HomeScreen';
import SearchScreen from './components/SearchScreen';
import FavoriteScreen from './components/FavoriteScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator} from'@react-navigation/bottom-tabs';
import { createStackNavigator} from'@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Stack2 = createStackNavigator();

function SearchStackScreen() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
        <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen name="ProductWebView" component={ProductWebView} />
      </Stack.Navigator>
  );
}

function FavoriteStackScreen() {
  return (
      <Stack2.Navigator>
        <Stack2.Screen name="Favorites" component={FavoriteScreen} />
        <Stack2.Screen name="Product" component={ProductScreen} />
        <Stack.Screen name="ProductWebView" component={ProductWebView} />
      </Stack2.Navigator>
  );
}

export default function App() {

  return (
    <NavigationContainer>
      <Header
        backgroundColor="pink"
        placement="center"
        centerComponent={{ text: 'MakeUp App', style: { fontSize: 30 } }}
      />
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-home" color={color} size={size} />
          ),
          headerShown: false
        }}
        />
        <Tab.Screen name="SearchStack" component={SearchStackScreen} options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-search" color={color} size={size} />
          ),
          headerShown: false
        }}/>
        <Tab.Screen name="FavoriteStack" component={FavoriteStackScreen} options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-heart" color={color} size={size} />
          ),
          headerShown: false
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
    );
}

