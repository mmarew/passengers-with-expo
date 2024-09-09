import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { ProgressBar } from "react-native-paper";
import { sendAxiosDataToserver } from "../../service/index";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
// custom styles
import {
  textSignUP,
  buttonStyle,
  topViewStyle,
  textWelcome,
  longText,
  bottomView,
  textDetail,
} from "./Style";
import { getErrorMessage } from "~/Utils/ErrorHandler";
import { showErrorToast } from "~/Utils/ErrorDisplayer";

const SignInScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Validation function for phone number
  const validatePhoneNumber = () => {
    console.log("phoneNumber", phoneNumber);
    const phoneRegex = /^\+\d{1,3}\d{9,14}$/; // More flexible regex for international numbers
    if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
      showErrorToast("Please enter a valid phone number");
      return false;
    }
    return true;
  };

  // Simulate an API call with progress
  const handleLogin = async () => {
    if (!validatePhoneNumber()) return;

    try {
      setIsLoading(true);
      setProgress(0.3); // Start progress

      const data = { phoneNumber };
      const response = await sendAxiosDataToserver({
        data,
        url: "/api/user/login",
      });

      setProgress(1); // Complete progress
      console.log("Login Successful:", response);
      // Navigate or show success message
    } catch (error) {
      showErrorToast(getErrorMessage(error));
    } finally {
      setIsLoading(false);
      setProgress(0); // Reset progress
    }
  };

  return (
    <ScrollView>
      {/* Top Section */}
      <View
        style={{ ...topViewStyle }}
        className="mt-10 w-full items-center  p-4"
      >
        <Text style={{ ...textWelcome }} className=" font-manrope ">
          Welcome To X ✨
        </Text>
        <Text
          style={{ ...longText }}
          className=" font-manrope text-2xl font-bold text-black mb-1 text-center"
        >
          Let’s get you all up and running
        </Text>
        <Text
          style={{ ...textDetail }}
          className="text-sm text-gray-500 mb-6 font-manrope"
        >
          Please enter your details
        </Text>
      </View>

      {/* Phone Number Input */}
      <View style={{ ...bottomView }} className="w-full">
        <View>
          <Text className="text-gray-700 font-medium mb-2 font-manrope">
            Phone Number
          </Text>
          <Input
            style={{
              borderColor: "black",
              padding: 10,
              borderWidth: 1,
              borderRadius: 5,
            }}
            placeholder="+251 - xxx - xxx - xxx"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </View>
        {/* Login Button */}
        <Button
          style={{ ...buttonStyle }}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text
            style={{ color: "white", textAlign: "center", fontWeight: "bold" }}
          >
            {isLoading ? "Loading..." : "Login"}
          </Text>
        </Button>
      </View>

      {/* Progress Bar */}
      {isLoading && (
        <View className="w-full mb-4">
          <ProgressBar progress={progress} color="#005f73" />
        </View>
      )}

      {/* Sign-in Link */}
      <View
        className="mt-4 p-4"
        style={{ backgroundColor: "white", paddingLeft: 20 }}
      >
        <Text className="text-sm text-gray-600">
          Already have an account?
          <Text style={{ ...textSignUP }}> Sign up</Text>
        </Text>
      </View>

      {/* Toast for Error Handling */}
    </ScrollView>
  );
};

export default SignInScreen;
