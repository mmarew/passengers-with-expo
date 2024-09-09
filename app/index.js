import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import SignInScreen from "../Screens/SignInScreen";
import SignUpScreen from "../Screens/SignUpScreen";
import VerifyOTPScreen from "../Screens/OTPScreen";
const Index = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Manrope-Regular": require("../assets/Fonts/Manrope-Regular.ttf"),
        "Manrope-Bold": require("../assets/Fonts/Manrope-Bold.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Or show a loading spinner while fonts are being loaded
  }
  return (
    <View>
      <ScrollView>
        {/* <SignUpScreen /> */}
        {/* <SignInScreen /> */}
        <VerifyOTPScreen />
      </ScrollView>
      <Toast />
    </View>
  );
};

export default Index;
