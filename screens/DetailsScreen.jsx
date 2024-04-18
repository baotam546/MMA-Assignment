import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { useNavigation, useRoute } from "@react-navigation/native";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import storage from "../utils/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WatchDetailsScreen = ({ navigation }) => {
  const route = useRoute();
  const watch = route.params;
  const navigate = useNavigation();
  const [numberOfFeedbacks, setNumberOfFeedbacks] = useState(0);
  const [averageRate, setAverageRate] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const feedback = watch.feedbacks;
  const checkIfFavorite = async () => {
    try {
      const favoriteStorage = await AsyncStorage.getItem('favorList');
      if (favoriteStorage !== null) {
        const favorListArray = JSON.parse(favoriteStorage);
        const isFavor = favorListArray.some((watchItem) => watchItem === watch.id);
        setIsFavorite(isFavor);
      } else {
        setIsFavorite(false);
      }
    } catch (error) {
      console.error("Error checking favorite:", error);
    }
  };
  useEffect(() => {
    checkIfFavorite();
  }, []);

  const toggleFavorite = async () => {
    try {
      const favoriteStorage = await AsyncStorage.getItem('favorList');
      let favorListArray = [];
      if (favoriteStorage !== null) {
        favorListArray = JSON.parse(favoriteStorage);
      }
      
      if (!isFavorite) {
        favorListArray.push(watch.id);

      } else {
        const index = favorListArray.indexOf(watch.id);
        if (index !== -1) {
          favorListArray.splice(index, 1);
        }
      }
      
      await AsyncStorage.setItem('favorList', JSON.stringify(favorListArray));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  useEffect(() => {
    if (feedback != null && feedback.length > 0) {
      const sum = feedback.reduce((acc, item) => acc + item.rating, 0);
      const averageRate = sum / feedback.length;
      console.log('ave',averageRate);
      const formattedAverageRate = averageRate.toFixed(1);
      setAverageRate(formattedAverageRate);
      setNumberOfFeedbacks(feedback.length);
    }
  }, [feedback]);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.goBackButton}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              paddingTop: 15,
            }}
          >
            <MaterialIcons name="arrow-back" size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image source={{ uri: watch.image }} style={styles.coverImage} />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                gap: 10,
              }}
            >
              <Text style={styles.fontText}>{watch.watchName}</Text>
              <TouchableOpacity onPress={toggleFavorite}>
              {isFavorite ? (
                <MaterialIcons name="favorite" size={24} color="#ef0505" />
              ) : (
                <MaterialIcons name="favorite-outline" size={24} />
              )}
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "700",
                color: "#444444",
              }}
            >
              {watch.brandName}
            </Text>
            <Text style={styles.fontDescription}>{watch.description}</Text>
            <Text style={styles.fontText}>${watch.price}</Text>
          </View>
          {/* feedback */}
          <View style={styles.feedbackContainer}>
            <Text style={styles.feedbackText}>Feedback</Text>
            <View style={styles.feedbackDetails}>
              <View style={styles.secondaryfeedbackDetails}>
                <Text style={styles.feedbackRating}>{averageRate}/5.0</Text>
                <Text style={styles.secondaryFeedbackRating}>
                  ({numberOfFeedbacks} reviews)
                </Text>
              </View>
              <StarRatingDisplay rating={averageRate} />
            </View>
            <Pressable onPress={() => navigate.navigate("Feedback", watch)}>
              <View>
                <Text style={{ fontSize: 15, fontWeight: "500" }}>
                  View all feedbacks
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default WatchDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 15,
    fontSize: 30,
    fontWeight: "700",
  },
  imageContainer: {
    height: 400,
    borderRadius: 15,
    width: "100%",
  },
  goBackButton: {
    position: "absolute",
    top: 50,
    marginHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    zIndex: 50,
  },
  feedbackContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  coverImage: {
    resizeMode: "cover",
    borderRadius: 20,
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 20,
    marginTop: -20,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    justifyContent: "space-between",
  },
  fontText: {
    fontSize: 20,
    width: "75%",
    fontWeight: "700",
    color: "#444444",
  },
  feedbackDetails: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
  },
  secondaryfeedbackDetails: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 5,
  },
  feedbackText: {
    fontSize: 20,
    paddingVertical: 10,
    fontWeight: "700",
    color: "#444444",
  },
  feedbackRating: {
    color: "#efcb15",
    fontSize: 20,
    fontWeight: "bold",
  },
  secondaryFeedbackRating: {
    color: "#000000",
    fontSize: 10,
    fontWeight: "700",
  },
  fontDescription: {
    fontSize: 12,
    fontWeight: "700",
    color: "#7a7474",
  },
  sizeText: {
    marginTop: 20,
  },
  sizeContainer: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
  },
  sizeValueContainer: {
    backgroundColor: "#FFFFFF",
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  sizeValueText: {
    fontSize: 18,
    // fontFamily: fonts.regular,
    fontWeight: "700",
  },
  selectedText: {
    color: "#E55B5B",
  },
  colorContainer: {
    flexDirection: "row",
  },
  borderColorCircle: {
    height: 48,
    width: 48,
    padding: 5,
    marginHorizontal: 5,
  },
  colorCircle: {
    flex: 1,
    borderRadius: 18,
  },
  button: {
    backgroundColor: "#E96E6E",
    height: 62,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "700",
    // fontFamily: fonts.regular,
  },
});
