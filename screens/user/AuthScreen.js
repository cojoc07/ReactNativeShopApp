import React, { useEffect, useState } from "react";
import {
  Alert,
  TextInput,
  View,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { Button } from "react-native-elements";
import { SocialIcon } from "react-native-elements";
import { useDispatch } from "react-redux";
import Colors from "../../constants/colors";

import { LinearGradient } from "expo-linear-gradient";

import Card from "../../components/ui/Card";

import * as authActions from "../../store/actions/auth";

const AuthScreen = ({ route, navigation }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  const dispatch = useDispatch();

  const inputChangeHandler = (text, input) => {
    switch (input) {
      case "email": {
        if (!text.includes("@")) {
          setEmailIsValid(false);
        } else {
          setEmailIsValid(true);
        }
        setEmail(text);

        return;
      }
      case "password": {
        if (text.trim().length < 6) {
          setPasswordIsValid(false);
        } else {
          setPasswordIsValid(true);
        }
        setPassword(text);
        return;
      }
    }
  };

  const authHandler = async () => {
    if (!emailIsValid) {
      Alert.alert("Eroare", "Adresa de email nu este valida.");
    } else if (!passwordIsValid) {
      Alert.alert("Eroare", "Parola este prea scurta.");
    } else {
      let action = isSignup
        ? authActions.signup(email, password)
        : authActions.login(email, password);
      setError(null);
      setIsLoading(true);
      try {
        await dispatch(action);
        //setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert("Eroare", error);
    }
  }, [error]);

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS == "android" ? "height" : "padding"}
      keyboardVerticalOffset={Platform.OS === "android" ? 0 : 0}
    >
      <LinearGradient
        colors={["#dfe0e2", "#f6f6f6"]}
        start={{ x: -0.2, y: 0.5 }}
        end={{ x: 0.5, y: 0.5 }}
        style={styles.gradient}
      >
        <Card style={styles.authContainer}>
          <ScrollView keyboardShouldPersistTaps={"handled"}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(text) => inputChangeHandler(text, "email")}
            />

            {/* {!emailIsValid && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Email invalid.</Text>
              </View>
            )} */}

            <Text style={styles.label}>Parola</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={(text) => inputChangeHandler(text, "password")}
            />

            <View style={styles.buttonContainer}>
              <Button
                title={isSignup ? "Înregistrare" : "Logare"}
                onPress={authHandler}
                loading={isLoading}
                buttonStyle={{
                  backgroundColor: Colors.primaryColor,
                  borderRadius: 20,
                  width: 160,
                  marginBottom: 10,
                }}
              />

              <Button
                title={isSignup ? "Ai deja cont?" : "Nu ai cont?"}
                onPress={() => setIsSignup((prevState) => !prevState)}
                buttonStyle={{
                  backgroundColor: Colors.accentColor,
                  borderRadius: 20,
                  width: 160,
                }}
              />
            </View>
          </ScrollView>
        </Card>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <SocialIcon type="facebook" />
          <SocialIcon type="google" />
          <SocialIcon type="medium" />
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "50%",
    marginTop: 10,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
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

export default AuthScreen;
