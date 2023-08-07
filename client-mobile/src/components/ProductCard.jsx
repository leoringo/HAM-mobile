import { ScrollView, Text, StyleSheet, View, Image, Button, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from '@react-navigation/native'

export default function ProductCard({ product }) {
    const navigation = useNavigation()
    const detailProduct = () => {
        navigation.navigate('StackNavigator', {
            screen: 'Detail',
            params: {
                id: product.id,
                title: product.name
            }
        })
    }

    return (
        <TouchableWithoutFeedback onPress={detailProduct}>
            <View style={styles.cardContainer}>
                <Image source={{ uri: product.mainImg }} style={styles.cardImage} />
                <View style={styles.cardBodyContainer}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>{product.name}</Text>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Price: ${product.price}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    cardBodyContainer: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 20,
        justifyContent: 'space-between'
    },

    cardContainer: {
        // width: 500,
        height: 350,
        backgroundColor: 'white',
        flex: 1,
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 20,
    },

    cardImage: {
        height: "50%",
        width: "100%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    }
})