import React, { useState } from "react";
import { View } from "react-native";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { sendAxiosDataToserver } from "../../service/index";
import { showErrorToast } from "../../Utils/ErrorDisplayer";
import { getErrorMessage } from "../../Utils/ErrorHandler";
import styles from "./Style.css";
import TopSection from "../../components/TopSections/index";
import commonStyles from "../../components/CommonStyles/CommonStyles.js";
import { Checkbox } from "~/components/ui/checkbox";
const SignUpScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const validateForm = () => {
    if (fullName.trim() === "") {
      showErrorToast("Full name is required");
      return false;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      showErrorToast("Invalid email address");
      return false;
    }

    if (phoneNumber.trim() === "") {
      showErrorToast("Phone number is required");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!termsAccepted) {
      alert("Please accept the terms and services.");
      return;
    }

    if (!validateForm()) return;

    try {
      setIsLoading(true);
      const data = { fullName, email, phoneNumber, roleId: 1, statusId: 1 };
      const registerResponse = await sendAxiosDataToserver({
        data,
        url: "/api/user/createUser",
      });
      setIsLoading(false);
      console.log("registerResponse", registerResponse);
    } catch (error) {
      setIsLoading(false);
      const errorMessage = getErrorMessage(error);
      showErrorToast(errorMessage);
    }
  };

  return (
    <View style={commonStyles.container}>
      {/* Top Section */}
      <TopSection descriptions=" Create your account. " title="Register" />
      {/* Full Name Input */}
      <View style={styles.bottomSection}>
        <Text style={commonStyles.label}>Full Name</Text>
        <Input
          style={commonStyles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />

        {/* Email Input */}
        <Text style={commonStyles.label}>Email</Text>
        <Input
          style={commonStyles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        {/* Phone Number Input */}
        <Text style={commonStyles.label}>Phone Number</Text>
        <Input
          style={commonStyles.input}
          placeholder="+251 - xxx - xxx - xxx"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        {/* Terms & Conditions */}
        <View style={styles.termsContainer}>
          <Checkbox
            style={
              termsAccepted
                ? { ...commonStyles.checkBox, backgroundColor: "#075985" }
                : { ...commonStyles.checkBox }
            }
            checked={termsAccepted}
            onCheckedChange={() => setTermsAccepted(!termsAccepted)}
          />
          <Text style={styles.termsText}>
            By tapping Sign Up, you have read and agree to the
            <Text style={commonStyles.textLinks}> Terms and Services</Text>
          </Text>
        </View>

        {/* Sign Up Button */}
        <Button
          style={
            termsAccepted ? commonStyles.button : commonStyles.buttonDisabled
          }
          onPress={termsAccepted ? handleSignUp : null}
          disabled={!termsAccepted || isLoading}
        >
          <Text style={commonStyles.buttonText}>
            {isLoading ? "Loading..." : "Sign Up"}
          </Text>
        </Button>

        {/* Sign In Link */}
        <Button style={styles.signInLink}>
          <Text>
            Do you have an account?{" "}
            <Text style={commonStyles.textLinks}>Sign in</Text>
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default SignUpScreen;
