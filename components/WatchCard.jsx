import {
  Dimensions,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Card } from "@rneui/themed";
import { Image } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const WatchCard = ({
  id,
  name,
  price,
  image,
  watchDescription,
  brandName,
  feedback,
}) => {
  const navigation = useNavigation();
  const watchDetails = {
    id: id,
    name: name,
    price: price,
    image: image,   
    watchDescription: watchDescription,
    brandName: brandName,
    feedback: feedback,

  };
  

  return (
    <TouchableOpacity
        onPress={() => {
            navigation.navigate("details-screen", watchDetails);
        }}
    >
      <View style={styles.Card} key={id}>
        <View style={{ position: "relative", alignItems: "center" }}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{ uri: image }}
          />
        </View>
        <Card.Divider />
        <View style={styles.info}>
          <Text style={styles.brandName}>{brandName}</Text>
          <Card.Title>{name}</Card.Title>
          <Text style={styles.price}>${price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WatchCard;

const styles = StyleSheet.create({
  Card: {
    display: "flex",
    gap: 10,
    width: width - 30,
    height: 320,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 5,
  },
  info: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    alignItems: "center",
    marginBottom: 20,
  },
  brandName: {
    color: "gray",
    fontSize: 13,
    fontWeight: "500",
  },
  price: {
    fontSize: 16,
    fontWeight: "500",
  },
  image: {
    width: "50%",
    height: "auto",
    objectFit: "contain",
    aspectRatio: 1, // Maintain aspect ratio
  },
});
