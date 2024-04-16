import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import WatchDetailsScreen from '../screens/DetailsScreen';
const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen
        options={
          {
            headerShown: false
          }
        }
        name="home-screen" component={HomeScreen} />
      <Stack.Screen name="Watch Details" component={WatchDetailsScreen} />
    </Stack.Navigator>
  )
}

const SearchStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="search-screen" component={SearchScreen} />
    </Stack.Navigator>
  )
}

// const DetailsStackNavigator = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="details-screen" component={WatchDetailsScreen} />
//     </Stack.Navigator>
//   )
// }




export { MainStackNavigator, SearchStackNavigator }