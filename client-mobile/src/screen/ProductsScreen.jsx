import { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet, Image, SafeAreaView, ActivityIndicator } from "react-native";
import { useQuery, gql } from '@apollo/client';
import ProductCard from "../components/ProductCard";


export default function ProductsScreen() {
    let apolloProducts = [];

    const GET_PRODUCTS = gql`
    query GetProducts {
        getProducts {
          id
          name
          slug
          description
          price
          mainImg
          categoryId
          mongoUserId
          Category {
            name
          }
          Images {
            imgUrl
          }
        }
      }
    `
    const { loading, error, data } = useQuery(GET_PRODUCTS)
    
    if (loading) {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    if(error) {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <Text>ERROR!</Text>
            </View>
        )
    }

    apolloProducts = data.getProducts.map(product => {
        return <ProductCard key={product.id} product={product} />
    })

    return (
        <SafeAreaView style={{ backgroundColor: 'red', flex: 1 }}>
            {/* <View style={styles.mainContainer}> */}
            <View style={styles.imageContainer}>
                <Image source={{ uri: 'https://pbs.twimg.com/media/Du2FBqOX4AALUoa.jpg' }} style={styles.imageStyle} />
            </View>
            <ScrollView style={styles.cardContainer} >
                {apolloProducts}
            </ScrollView>
            {/* </View> */}
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },

    cardContainer: {
        // flex: 1,
        // flexWrap: 'wrap',
        // flexDirection: 'row',
        // marginHorizontal: 50,
        backgroundColor: 'white',
        gap: 20,
        paddingHorizontal: 20,
        // marginHorizontal: 20,
        paddingTop: 10
    },

    imageStyle: {
        width: 50,
        height: 50,
    },

    imageContainer: {
        backgroundColor: 'white',
        justifyContent: 'center',
        flexDirection: 'row'
    },

    container: {
        flex: 1,
        justifyContent: 'center',
    },

    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
})