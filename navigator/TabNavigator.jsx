import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MainStackNavigator, SearchStackNavigator } from "./StackNavigator";
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
      }}
    >
        <Tab.Screen 
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons  name="home" size={24} color={color} />
          ), 
        }}
         name="home" component={MainStackNavigator} />
        <Tab.Screen 
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="favorite" size={24} color={color} />
          ),
        }}
        name="search" component={SearchStackNavigator} />
    </Tab.Navigator>
  )
}

export default TabNavigator
