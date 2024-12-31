import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/goat_outline.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText>
          This is{" "}
          <ThemedText type="defaultSemiBold">
            Producery notifications
          </ThemedText>{" "}
          . Since You are using
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: "an iOS device, you need this application to receive notifications.",
              android:
                "an android device, you dont actually need this application. Just use the web browser or install the PWA. But keep using it if you want to.",
              web: "a web browser, you dont actually need this application. Just use the web browser or install the PWA. But keep using it if you want to.",
            })}
          </ThemedText>
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText>
          Navigate to{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: "Notify",
              android: "Notify",
              web: "Notify",
            })}
          </ThemedText>{" "}
          to enable app notifications.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 512,
    width: 512,
    bottom: 0,
    left: -230,
    top: -70,
    position: "absolute",
  },
});
