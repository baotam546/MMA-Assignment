  import {
    FlatList,
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
  import { Image } from "react-native";
  import { useNavigation } from "@react-navigation/native";
import WatchCard from "../components/WatchCard";
import storage from "../utils/storage";

  const { width, height } = Dimensions.get("window");
  const HomeScreen= () => {
    const navigation = useNavigation();
    const [isFavorite, setIsFavorite] = useState(false);
    const watches = watchesData; 

    const toggleFavorite = (watch) => {
      
    }

    return (
      <SafeAreaView style={styles.container   }>
        <Header />
        <FlatList
          data={watches}
          numColumns={2}
          style={styles.watchList}
          renderItem={(item) => (
            <WatchCard item={item}/>
          )}
        />
      </SafeAreaView>
    );
  };

  export default HomeScreen;

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
