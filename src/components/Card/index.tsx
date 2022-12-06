import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

interface ICard {
  text: String,
  img: any,
  onClick?: any 
}

export default function Card({text, img, onClick }: ICard) {
  return (
    <TouchableOpacity style={styles.card} onPress={onClick}>
        <Image style={styles.cardImg} source={img}/>
        <Text style={[styles.cardText]}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#493d8a",
        width: 370,
        height: 70,
        borderRadius: 15,
        margin: 10,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
      },
      cardText: {
          color: "#fff",
          fontSize: 20,  
      },
      cardImg: {
        aspectRatio: 1,
        width: 50,
    }
  });