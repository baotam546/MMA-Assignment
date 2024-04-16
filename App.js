import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./navigator/TabNavigator";

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
    </SafeAreaProvider>
  );
}


export default App;
