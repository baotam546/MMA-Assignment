import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";

import Header from "../components/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Rating } from "@rneui/themed";

const WatchDetailsScreen = () => {
  const route = useRoute();
  const watch = route.params;
  const feedback = watch.feedbacks;
  const sum = feedback.reduce((acc, item) => acc + item.rating, 0);
  const averageRate = sum / feedback.length;
  const formattedAverageRate = averageRate.toFixed(1);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: watch.image }} style={styles.coverImage} />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.fontText}>{watch.watchName}</Text>
            <Text style={styles.fontDescription}>{watch.description}</Text>
            <Text style={styles.fontText}>${watch.price}</Text>
          </View>
          {/* cart button */}
          <View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Add to Favorite</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* feedback */}
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackText}>Feedback</Text>
          <View>
            <Text>{formattedAverageRate}/5.0</Text>
            <Rating
            readonly
            fractions={1}
            ratingCount={5}
            startingValue={averageRate}
            />
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
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 15,
    fontSize: 30,
    fontWeight: "700",
  },
  imageContainer: {
    paddingTop: 10,
    height: 320,
    width: "100%",
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
    paddingVertical: 20,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    justifyContent: "space-between",
  },
  fontText: {
    fontSize: 20,
    // fontFamily: fonts.regular,
    fontWeight: "700",
    color: "#444444",
  },
  feedbackText: {
    fontSize: 20,
    paddingVertical: 10,
    fontWeight: "700",
    color: "#444444",
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
