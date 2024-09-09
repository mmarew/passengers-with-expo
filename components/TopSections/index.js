import React from "react";
import { View } from "react-native";
import { Text } from "~/components/ui/text";

import { topSection, backArrow, registerTitle, subtitle } from "./Style";
const Index = ({ descriptions, title }) => {
  return (
    <View style={{ ...topSection }}>
      <Text style={{ ...backArrow }}>{"<"}</Text>
      <Text style={{ ...registerTitle }}>{title}</Text>
      <Text style={{ ...subtitle }}>{descriptions}</Text>
    </View>
  );
};

export default Index;
