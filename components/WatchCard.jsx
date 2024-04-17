import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");
const WatchCard = ({ item }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigation = useNavigation();

  const checkIfFavorite = async () => {
    try {
      const favorList = await AsyncStorage.getItem("favorList");
      if (favorList !== null && favorList.length > 0) {
        console.log(favorList)
        const favorListArray = JSON.parse(favorList);
        const isFavor = favorListArray.some((watch) => watch.id === item.id);
        setIsFavorite(isFavor);
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
      let favorList = await AsyncStorage.getItem("favorList");
      if (favorList === null) {
        favorList = [];
      } else {
        favorList = JSON.parse(favorList);
      }

      const index = favorList.findIndex((watch) => watch.id === item.id);
      if (index !== -1) {
        favorList.splice(index, 1); // Remove from favorites
        setIsFavorite(false);
      } else {
        favorList.push(item); // Add to favorites
        setIsFavorite(true);
      }

      await AsyncStorage.setItem("favorList", JSON.stringify(favorList));
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        navigation.navigate("Watch Details", item.item);
      }}
      style={{ flex: 1, marginVertical: 10, marginHorizontal: 5 }}
    >
      <View style={styles.watchCard}>
        <Image
          source={{
            uri: item.item.image,
          }}
          width={150}
          height={150}
          resizeMode="cover"
          borderRadius={20}
        />

        <View style={{ flex: 1, marginVertical: 10 }}>
          <Text style={styles.watchName}>{item.item.watchName}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.watchPrice}>${item.item.price}</Text>

            <TouchableOpacity onPress={toggleFavorite}>
              {isFavorite ? (
                <MaterialIcons name="favorite" size={24} color="#ef0505" />
              ) : (
                <MaterialIcons name="favorite-outline" size={24} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WatchCard;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  watchList: {
    paddingTop: 10,
    height: height - 150,
  },
  watchCard: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 30,
    padding: 10,
  },

  watchName: {
    fontSize: 16,
    fontWeight: "500",
  },

  watchPrice: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: "400",
    color: "grey",
  },
});
