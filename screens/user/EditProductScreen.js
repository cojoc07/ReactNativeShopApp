import React, { useState, useEffect, useCallback } from "react";

import {
  Alert,
  ActivityIndicator,
  View,
  KeyboardAvoidingView,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "../../store/actions/products";
import { Icon } from "react-native-elements";
import Colors from "../../constants/colors";

const EditProductScreen = ({ route, navigation }) => {
  //daca avem product id in ruta, editam produs existent
  const prodId = route.params?.productId;

  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );
  const dispatch = useDispatch();

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");
  const [titleIsValid, setTitleIsValid] = useState(
    editedProduct ? true : false
  );
  const [imageUrl, setImageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : ""
  );
  const [imageUrlIsValid, setImageUrlIsValid] = useState(
    editedProduct ? true : false
  );
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : ""
  );
  const [descriptionIsValid, setDescriptionIsValid] = useState(
    editedProduct ? true : false
  );
  const [price, setPrice] = useState(editedProduct ? editedProduct.price : "");
  const [priceIsValid, setPriceIsValid] = useState(
    editedProduct ? true : false
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred!", error.message);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!titleIsValid) {
      Alert.alert("Wrong input", "Please check the errors on the form");
      return;
    }
    if (!imageUrlIsValid) {
      Alert.alert("Wrong input", "Image is not valid");
      return;
    }
    if (!descriptionIsValid) {
      Alert.alert("Wrong input", "Description must be longer");
      return;
    }
    if (!priceIsValid) {
      Alert.alert("Wrong input", "Price is invalid");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (editedProduct) {
        await dispatch(
          productActions.updateProduct(
            prodId,
            title,
            description,
            imageUrl,
            +price
          )
        );
      } else {
        await dispatch(
          productActions.createProduct(title, description, imageUrl, +price)
        );
      }
    } catch (err) {
      setError(err);
    }
    setIsLoading(false);
    navigation.goBack();
  }, [dispatch, prodId, title, description, imageUrl, price]);

  //setam functia pe buton de fiecare data cand se schimba proprietatile
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            alignItems: "center",
            width: 40,
            margin: 0,
          }}
          onPress={submitHandler}
        >
          <Icon
            type="ionicon"
            size={42}
            width={40}
            name={Platform.OS === "ios" ? "ios-checkmark" : "md-checkmark"}
          />
        </TouchableOpacity>
      ),
    });
  }, [dispatch, prodId, title, description, imageUrl, price, navigation]);

  const inputChangeHandler = (text, input) => {
    switch (input) {
      case "title": {
        if (text.trim().length < 3) {
          setTitleIsValid(false);
        } else {
          setTitleIsValid(true);
        }
        setTitle(text);
        return;
      }
      case "imageUrl": {
        if (!text.includes(".")) {
          setImageUrlIsValid(false);
        } else {
          setImageUrlIsValid(true);
        }
        setImageUrl(text);
        return;
      }
      case "description": {
        if (text.trim().length < 10) {
          setDescriptionIsValid(false);
        } else {
          setDescriptionIsValid(true);
        }
        setDescription(text);
        return;
      }
      case "price": {
        if (text.trim().length < 1) {
          setPriceIsValid(false);
        } else if (text.trim() * 1 == 0) {
          setPriceIsValid(false);
        } else {
          setPriceIsValid(true);
        }
        setPrice(text.replace(",", "."));
        return;
      }
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS == "android" ? 100 : 0}
    >
      <ScrollView>
        <View style={styles.form}>
          <View style={styles.formControl}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              autoCorrect={false}
              onChangeText={(text) => inputChangeHandler(text, "title")}
              keyboardType="default"
              autoCapitalize="sentences"
            />
            {!titleIsValid && (
              <Text style={{ color: "red" }}>Please enter a longer title.</Text>
            )}
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Image URL</Text>
            <TextInput
              style={styles.input}
              value={imageUrl}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(text) => inputChangeHandler(text, "imageUrl")}
            />
            {!imageUrlIsValid && (
              <Text style={{ color: "red" }}>Image URL is invalid.</Text>
            )}
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price?.toString()}
              onChangeText={(text) => inputChangeHandler(text, "price")}
              keyboardType="decimal-pad"
            />
            {!priceIsValid && (
              <Text style={{ color: "red" }}>Price is incorrect.</Text>
            )}
          </View>
          <View style={(styles.formControl, { marginBottom: 50 })}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              value={description}
              multiline
              autoCorrect
              autoCapitalize="sentences"
              numberOfLines={3}
              onChangeText={(text) => inputChangeHandler(text, "description")}
            />
            {!descriptionIsValid && (
              <View style={styles.errorContainer}>
                <Text style={{ color: "red" }}>Description is invalid.</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditProductScreen;
