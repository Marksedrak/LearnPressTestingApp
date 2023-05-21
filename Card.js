import { useState } from "react";
import { Text, StyleSheet, Image } from 'react-native';
import normalize from "./FontDynam";
import { Pressable } from "react-native";

export default function Card({ image, title, duration }) {
    
    const [isHovered, setIsHovered] = useState(false);

    const handlePressIn = () => {
        setIsHovered(true);
    }
    
    const handlePressOut = () => {
        setIsHovered(false);
    }

    const handleStyle = [
        styles.card,
        isHovered && styles.cardHover
    ]
    
    const titleStyle = [
        styles.title,
        isHovered && styles.titleHovered
    ]
    
    const descrStyle = [
        styles.description,
        isHovered && styles.descriptionHovered
    ]

    const imageStyle = [
        styles.cardImage,
        isHovered && styles.imageHover
    ]

    return (
        <Pressable 
          style={handleStyle}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}>
            <Image
                source={{ uri: image }}
                style={styles.cardImage}
            />
            <Text style={titleStyle}>{title}</Text>
            <Text style={descrStyle}>Duration: {duration}</Text>
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
        cardHover: {
            backgroundColor: '#4B5267',
            
        },
        cardImage: {
            width: normalize(200),
            height: normalize(200),
            alignSelf: 'center',
            borderRadius: 3,
        },
        imageHover: {
            borderColor: '#A0D2DB',
            borderWidth: 2,
        },
        title: {
            fontSize: normalize(16),
            fontWeight: 'bold',
            marginBottom: 8,
            textAlign: "center",
        },
        titleHovered: {
            color: '#BEE7E8',
        },
        description: {
            fontSize: 14,
            textAlign: 'center',
        },
        descriptionHovered: {
            color: '#BA9790',
        },
    });
