import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Card } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import storage from "../utils/storage";


const { width, height } = Dimensions.get("window");
const WatchCard = ({item}) => {
  const navigation = useNavigation();
  const onToggleFavorite = (watch) => {
    c
    storage.save({
      key: 'favorList',
      data: {
        watchList: watch,
      },
    })
  }

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

                    <TouchableOpacity onPress={() =>{
                      onToggleFavorite(item.item)
                    }}>
                      <MaterialIcons name="favorite" size={24} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
  );
};

export default WatchCard;

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
