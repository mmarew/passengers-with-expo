import React, { useState } from "react";
import { View } from "react-native";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { otpInput, bottomContainer } from "./Style";
import TopSection from "../../components/TopSections/index";
import CommonStyles from "../../components/CommonStyles/CommonStyles";
const VerifyOTPScreen = () => {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  console.log("bottomContainer", bottomContainer);
  console.log("otpInput", otpInput);
  // Handle OTP input
  const handleOtpChange = (value, index) => {
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  return (
    <View style={{ ...CommonStyles.container }}>
      {/* Header */}
      <TopSection
        title="Verify OTP"
        descriptions={"check your phone to verify OTP"}
      />

      <View style={{ ...bottomContainer }}>
        <Text
          style={{ ...CommonStyles.label }}
          className="text-black text-lg mb-4"
        >
          Code has been sent to{" "}
          <Text style={{ ...CommonStyles.textLinks }} className="text-primary">
            +2519********
          </Text>
        </Text>

        {/* OTP Input Boxes */}
        <View style={{ flexDirection: "row", gap: 10 }}>
          {otp.map((value, index) => (
            <Input
              key={index}
              style={{ ...otpInput }}
              keyboardType="number-pad"
              maxLength={1}
              value={value}
              onChangeText={(val) => handleOtpChange(val, index)}
            />
          ))}
        </View>

        {/* Resend Code */}
        <Text style={{ ...CommonStyles.label }}>
          Didn’t receive a code?{" "}
          <Text style={{ ...CommonStyles.textLinks }}>Resend Code</Text>
        </Text>

        {/* Login Button */}
        <Button
          style={{ ...CommonStyles.button }}
          className="w-full bg-secondary h-12 rounded-lg justify-center items-center"
        >
          <Text
            style={{ ...CommonStyles.buttonText }}
            className="text-white text-lg"
          >
            Login
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default VerifyOTPScreen;
