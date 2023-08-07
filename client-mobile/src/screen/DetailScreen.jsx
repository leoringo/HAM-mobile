import { gql, useQuery } from "@apollo/client";
import { Text, StyleSheet, Dimensions, ScrollView, View, ImageBackground, ActivityIndicator, Image } from "react-native";
const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height


export default function DetailScreen({ route }) {
    const GET_DETAIL_PRODUCTS = gql`
    query Query($id: ID!) {
        getProductById(id: $id) {
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
          User {
            _id
            username
            email
            password
            phoneNumber
            address
          }
        }
      }  
    `
    const { loading, error, data } = useQuery(GET_DETAIL_PRODUCTS, {
        variables: {id: route.params.id}
    })

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

    const images = data.getProductById.Images.map((image, index) => {
        return <Image key={index} source={{uri: image.imgUrl}} style={{height: 100, width: 100}}/>
    })


    return (
        <ScrollView style={{backgroundColor: 'white'}} overScrollMode='never' showsVerticalScrollIndicator={false}>
            <View style={styles.detailContainer}>
                <View style={styles.detailImage}>
                    <ImageBackground source={{uri: data.getProductById.mainImg}} resizeMode="contain" style={styles.backGroudImage} />
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', paddingTop: 1, gap: 2}}>
                    {images}
                </View>
                <View style={styles.titleUnderline}>
                    <Text style={styles.detailTitle}>{route.params.title}</Text>
                </View>
                <Text style={{fontSize: 24, marginTop: 10}}>
                    { 
                        Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        })
                        .format(data.getProductById.price )
                    }
                </Text>
                <View style={{flex: 1, width: '100%', marginTop: 30, paddingHorizontal: 20}}>
                    <View>
                        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 20}}>Category: <Text style={{fontWeight: '500'}}>{data.getProductById.Category.name}</Text></Text>
                        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>Description:</Text>
                        <Text style={{fontSize: 16, textAlign: 'justify'}}>{data.getProductById.description}</Text>
                        <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 20}}>Author: <Text style={{fontWeight: '500'}}>{data.getProductById.User.email}</Text></Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}



const styles = StyleSheet.create({
    detailContainer: {
        flex: 1,
        alignItems: 'center',
        height: '100%'
    },
    backGroudImage: {
        flex: 1,
        backgroundColor: 'white',
        borderBottomWidth: 0.5,
        borderBottomColor: 'grey'
    },
    detailImage: {
        height: windowHeight * 0.3,
        width: windowWidth,
    },
    detailTitle: {
        fontSize: 24,
        textAlign: 'center',
        marginTop: windowHeight * 0.03,
    },
    titleUnderline: {
        borderBottomWidth: 7,
        borderBottomColor: 'red'
    }
})