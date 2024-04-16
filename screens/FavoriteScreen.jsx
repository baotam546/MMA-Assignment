import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import watchesData from "../db.json";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const FavoriteScreen= () => {
  const navigation = useNavigation();
  const watches = watchesData;
  return (
    <SafeAreaView style={styles.container}>
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
        data={watches}
        numColumns={2}
        style={styles.watchList}
        renderItem={(item) => (
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
