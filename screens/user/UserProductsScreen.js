import React, { useEffect } from "react";

import { Alert, Platform, Button, FlatList } from "react-native";
import ProductItem from "../../components/shop/ProductItem";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "../../store/actions/products";
import Colors from "../../constants/colors";

const UserProductsScreen = ({ route, navigation }) => {
  //se creaza functia dispatch
  const dispatch = useDispatch();

  const userProducts = useSelector((state) => state.products.userProducts);

  const editProductHandler = (id) => {
    navigation.navigate("EditProductScreen", {
      productId: id,
    });
  };

  //cand se focuseaza acest screen
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", (e) => {
      console.log("s-a focusat ecranul Admin");
    });

    return unsubscribe;
  }, [navigation]);

  const deleteProductHandler = (id) => {
    Alert.alert("Are you sure?", "Do you really want to delete this product?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(productActions.deleteProduct(id));
        },
      },
    ]);
  };

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}
        >
          <Button
            title="Edit"
            color={Colors.accentColor}
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          />
          <Button
            title="Delete"
            color={Colors.accentColor}
            onPress={() => deleteProductHandler(itemData.item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

export default UserProductsScreen;
