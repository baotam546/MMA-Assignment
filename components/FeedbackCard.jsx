import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialIcons } from "@expo/vector-icons";
import { StarRatingDisplay } from 'react-native-star-rating-widget';
const FeedbackCard = ({watch}) => {
  const author = watch.item.author;
  const rating = watch.item.rating;
  const date = watch.item.date;
  const comment = watch.item.comment;
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <MaterialIcons name="face" size={24} color="black" />
        <Text style={{fontWeight:'bold'}}>{author}</Text>
      </View>
      <View>
      <StarRatingDisplay display={5}/>
      </View>
      <View>
        <Text>
          {comment}
        </Text>
      </View>
    </View>
  )
}

export default FeedbackCard

const styles = StyleSheet.create({
  container:{
    display: "flex",
    flexDirection: "column",
    width: "100%",
    paddingHorizontal: 10,
    paddingBottom:20,
    marginBottom:10,
    backgroundColor: "white",
    alignItems: "flex-start",
    gap:20
  },
  nameContainer:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    gap: 10,
  },
  commentContainer:{
    paddingTop:10,
    paddingBottom:100
  }
})
