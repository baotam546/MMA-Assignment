import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import watchesData from "../db.json";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WatchCard from "../components/WatchCard";
import FavoriteCard from "../components/FavoriteCard";

const { width, height } = Dimensions.get("window");
const FavoriteScreen= () => {
  const [favoriteList, setFavoriteList] = useState([]);
  const focus = useIsFocused();
  const checkFavoriteList = async () => {
    try {
      const favoriteStorage = await AsyncStorage.getItem('favorList');
      if (favoriteStorage !== null) {
        const favorListArray = JSON.parse(favoriteStorage);
        const watchList = watchesData.filter((watch) => favorListArray.includes(watch.id));
        setFavoriteList(watchList);
      } else {
        setFavoriteList([]);
      }
    } catch (error) {
      console.error("Error checking favorite:", error);
    }
  };
  useEffect(() => {
    checkFavoriteList();
  }, [focus]);
  return (
    <SafeAreaView style={styles.container}>
      {favoriteList.length > 0 ? (
        <>
        <View style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",

        paddingVertical: 20,
      }}>
        <Text style={{
          fontSize: 24,
          fontWeight: "bold",
        }}>

          This is your favorite item list.
        </Text>
      </View>
      <FlatList
          data={favoriteList}
          numColumns={2}
          style={styles.watchList}
          renderItem={(item) => (
            <FavoriteCard item={item} setFavoriteList={setFavoriteList} favoriteList={favoriteList}/>
          )}
        />
        </>
      ):
      <View>
        <View style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",

        paddingVertical: 20,
      }}>
        <Text style={{
          fontSize: 24,
          fontWeight: "bold",
        }}>

          This is your favorite item list.
        </Text>
      </View>
        <Text>
          You have no favorite items.
        </Text>
      </View>
      }
    </SafeAreaView>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
    container:{
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    watchList:{
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
