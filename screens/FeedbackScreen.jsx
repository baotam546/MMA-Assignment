import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import FeedbackCard from "../components/FeedbackCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
const FeedbackScreen = () => {
  const route = useRoute();
  const watch = route.params;
  const [feedbackList, setFeedbackList] = useState(watch.feedbacks);
  const stars = [5, 4, 3, 2, 1];

  const filterByStar = (star) => {
    if (star === "all") {
      setFeedbackList(watch.feedbacks);
    } else {
      const filteredList = watch.feedbacks.filter((a) => a.rating == star);
      setFeedbackList(filteredList);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.filter}
      >
        <Pressable
          style={styles.filterItem}
          onPress={() => filterByStar("all")}
        >
          <Text>All</Text>
        </Pressable>
        {stars.map((star) => (
          <Pressable
            key={star}
            onPress={() => filterByStar(star)}
            style={({ pressed }) => [
              styles.filterItem,
              pressed ? styles.onPress : null,
            ]}
          >
            <Text>{star}</Text>
            <MaterialIcons name="star" size={14} color="yellow" />
          </Pressable>
        ))}
      </ScrollView>

      <FlatList
        data={feedbackList}
        numColumns={1}
        style={styles.feedbackList}
        renderItem={(item) => (
          <View>
            <FeedbackCard watch={item} />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default FeedbackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filter: {
    flexDirection: "row",
    display: "flex",
    marginBottom: 20,
    height: "auto",
  },
  feedbackList: {
    height: "auto",
    display: "flex",
    flexDirection: "column",
  },
  filterItem: {
    padding: 10,
    width: 50,
    height: 40,
    backgroundColor: "white",
    borderRadius: 50,
    marginHorizontal: 5,
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
});
