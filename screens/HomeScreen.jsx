import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import WatchCard from "../components/WatchCard";
import watchesData from "../db.json";
import { Dimensions } from "react-native";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const HomeScreen= () => {
  const navigation = useNavigation();
  const watches = watchesData;
  return (
    <SafeAreaView style={styles.container   }>
      <Header />
      <FlatList
        data={watches}
        numColumns={2}
        style={styles.watchList}
        renderItem={(item) => (
          <TouchableOpacity
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

                  <TouchableOpacity>
                    <MaterialIcons name="favorite" size={24} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
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
        height: height - 200,
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
