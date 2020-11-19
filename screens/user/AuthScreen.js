import React from "react";
import {
  Button,
  View,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from "react-native";
import Colors from "../../constants/colors";

import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";

const AuthScreen = () => {
  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior="padding"
      keyboardVerticalOffset={50}
    >
      <Card style={styles.authContainer}>
        <ScrollView>
          <Input
            id="email"
            label="Email"
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            errorMessage="Invalid email address"
            onInputChange={() => {}}
            initialValue=""
          />
          <Input
            id="password"
            label="Password"
            keyboardType="default"
            secureTextEntry
            required
            minLength={5}
            autoCapitalize="none"
            errorMessage="Invalid password"
            onInputChange={() => {}}
            initialValue=""
          />
          <Button
            title="Login"
            color={Colors.primaryColor}
            onPress={() => {}}
          />
          <Button
            title="Switch to signup"
            color={Colors.accentColor}
            onPress={() => {}}
          />
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  autoContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
});

export default AuthScreen;
