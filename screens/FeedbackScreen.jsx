import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native-gesture-handler';
import FeedbackCard from '../components/FeedbackCard';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from "@expo/vector-icons";
const FeedbackScreen = () => {
    const route = useRoute();
  const watch = route.params;
  const navigate = useNavigation();
  const [numberOfFeedbacks, setNumberOfFeedbacks] = useState(0);
  return (
    <FlatList
          data={watch.feedbacks}
          numColumns={1}
          style={styles.container}
          renderItem={(item) => (
            <View>
                <FeedbackCard watch={item}/>
            </View>
            
          )}
        />
      
  )
}

export default FeedbackScreen

const styles = StyleSheet.create({
    container:{
        paddingVertical: 20,
        display: "flex",
        gap:10
    },

    
})