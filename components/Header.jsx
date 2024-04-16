import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'

const Header = () => {
  return (
    <View style={style.Header}>
      <Text style={style.Primary}>Watches Store</Text>
      <Text style={style.Secondary}>Bring the best quality</Text>
    </View>
  )
}

export default Header

const style= StyleSheet.create({
    Header:{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        paddingBottom: 15,
    },
    Primary:{
        fontSize: 20,
        fontWeight: "bold",
    },
    Secondary:{
        fontSize: 15,
        color: "gray",
        fontWeight: "500",
    }
})