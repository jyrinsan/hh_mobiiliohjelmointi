import React from 'react';
import { StyleSheet} from 'react-native';
import { Header } from 'react-native-elements';
import ResultsScreen  from './ResultsScreen';
import ProductScreen  from './ProductScreen';
import ProductWebView  from './ProductWebView';
import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import FavoriteScreen from './FavoriteScreen';
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
        <Stack.Screen name="Search" component={SearchScreen} options={{
          headerStyle: {
            backgroundColor: "pink",
          },

        }}/>
        <Stack.Screen name="Results" component={ResultsScreen} options={{
          headerStyle: {
            backgroundColor: "pink",
          },
        }}/>
        <Stack.Screen name="Product" component={ProductScreen} options={{
          headerStyle: {
            backgroundColor: "pink",
          },
        }}/>
        <Stack.Screen name="ProductWebView" component={ProductWebView} options={{
          headerStyle: {
            backgroundColor: "pink",
          },
        }}/>
      </Stack.Navigator>
  );
}

function FavoriteStackScreen() {
  return (
      <Stack2.Navigator>
        <Stack2.Screen name="Favorites" component={FavoriteScreen} options={{
          headerStyle: {
            backgroundColor: "pink",
          },
        }}/>
        <Stack2.Screen name="Product" component={ProductScreen} options={{
          headerStyle: {
            backgroundColor: "pink",
          },
        }}/>
        <Stack.Screen name="ProductWebView" component={ProductWebView} options={{
          headerStyle: {
            backgroundColor: "pink",
          },
        }}/>
      </Stack2.Navigator>
  );
}

export default function App() {

  return (
    <NavigationContainer>
      <Header
        backgroundColor="violet"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fieldcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textinput: {
    width:200 , 
    borderColor: 'gray', 
    borderWidth: 1,
  },
  buttoncontainer: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'center',
  },
});

