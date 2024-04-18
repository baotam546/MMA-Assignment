import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import watchesData from "../db.json";
import { Dimensions } from "react-native";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import WatchCard from "../components/WatchCard";

const { width, height } = Dimensions.get("window");
const HomeScreen = () => {
  const navigation = useNavigation();
  const [watches, setWatches] = useState(watchesData);
  const [brands, setBrands] = useState([
    "Citizen",
    "Tissot",
    "Fossil",
    "Seiko",
    "Frederique Constant",
  ]);

  const filterByBrand = (brand) => {
    if (brand == "all") {
      setWatches(watchesData);
    } else {
      const filteredList = watchesData.filter((a) => a.brandName == brand);
      setWatches(filteredList);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.filter}
      >
        <Pressable
          style={styles.filterItem}
          onPress={() => filterByBrand("all")}
        >
          <Text>All</Text>
        </Pressable>
        {brands.length > 0 &&
          brands.map((brand) => (
            <Pressable
              key={brand}
              onPress={() => filterByBrand(brand)}
              style={({ pressed }) => [
                styles.filterItem,
                pressed ? styles.onPress : null,
                
              ]}
            >
              <Text>{brand}</Text>
            </Pressable>
          ))}
      </ScrollView>
      <FlatList
        data={watches}
        numColumns={2}
        style={styles.watchList}
        renderItem={(item) => <WatchCard item={item} />}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
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
  filter: {
    flexDirection: "row",
    display: "flex",
    marginBottom: 10,
  },
  filterItem: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 50,
    marginHorizontal: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  isActive: {
    backgroundColor: "green",
  },
});
