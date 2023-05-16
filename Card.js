import React from "react";
import { View, Text, StyleSheet, Image } from 'react-native';
import normalize from "./FontDynam";
import { Pressable } from "react-native";

export default function Card({ image, title, duration }) {
    return (
        <Pressable style={styles.card} >
            <Image
                source={{ uri: image }}
                style={styles.cardImage}
            />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>Duration: {duration}</Text>
        </Pressable>
    )
}

    const styles = StyleSheet.create({
        card: {
            backgroundColor: 'white',
            borderRadius: 8,
            padding: 16,
            margin: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 2,
            maxWidth: '90%',
        },
        cardImage: {
            width: normalize(200),
            height: normalize(200),
            alignSelf: 'center',
            borderRadius: 3,
        },
        title: {
            fontSize: normalize(16),
            fontWeight: 'bold',
            marginBottom: 8,
            textAlign: "center",
        },
        description: {
            fontSize: 14,
            textAlign: 'center',
        },
    });
