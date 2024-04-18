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
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");
const WatchCard = ({ item }) => {
  const focus = useIsFocused();
  const [isFavorite, setIsFavorite] = useState(false);
  const navigation = useNavigation();

  const checkIfFavorite = async () => {
    try {
      const favoriteStorage = await AsyncStorage.getItem('favorList');
      console.log(favoriteStorage)
      if (favoriteStorage !== null) {
        const favorListArray = JSON.parse(favoriteStorage);
        const isFavor = favorListArray.some((watch) => watch === item.item.id);
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
  }, [focus]);

  const toggleFavorite = async () => {
    try {
      const favoriteStorage = await AsyncStorage.getItem('favorList');
      let favorListArray = [];
      if (favoriteStorage !== null) {
        favorListArray = JSON.parse(favoriteStorage);
      }
      
      if (!isFavorite) {
        favorListArray.push(item.item.id);

      } else {
        const index = favorListArray.indexOf(item.item.id);
        if (index !== -1) {
          favorListArray.splice(index, 1);
        }
      }
      
      await AsyncStorage.setItem('favorList', JSON.stringify(favorListArray));
      setIsFavorite(!isFavorite);
      console.log(await AsyncStorage.getItem('favorList'))
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
          <Text style={styles.watchName} numberOfLines={2}>{item.item.watchName}</Text>
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
    marginBottom: 15
  },

  watchPrice: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "700",
    color: "grey",
  },
});
