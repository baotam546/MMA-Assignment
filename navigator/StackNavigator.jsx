import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import HomeScreen from '../screens/HomeScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import WatchDetailsScreen from '../screens/DetailsScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
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
      <Stack.Screen
      options={
        {
          headerShown: false
        }
      }
      name="Watch Details" component={WatchDetailsScreen} />
      <Stack.Screen
      name='Feedback' component={FeedbackScreen}
      />
    </Stack.Navigator>
  )
}

const FavoriteStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
      options={
        {
          headerShown: false
        }
      }
      name="Favorite" component={FavoriteScreen} />
      <Stack.Screen
      options={
        {
          headerShown: false
        }
      }
      name="Watch Details" component={WatchDetailsScreen} />
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




export { MainStackNavigator, FavoriteStackNavigator }