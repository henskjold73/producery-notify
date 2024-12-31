import React, { useEffect } from "react";
import { StyleSheet, Image, Platform, Button, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function NotifyScreen() {
  useEffect(() => {
    // Request notification permissions on mount
    registerForPushNotificationsAsync();

    // Handle foreground notifications
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        Alert.alert(
          "Notification Received",
          notification.request.content.body ?? "No content"
        );
      }
    );

    return () => subscription.remove(); // Cleanup listener on unmount
  }, []);

  const registerForPushNotificationsAsync = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      const { status: newStatus } =
        await Notifications.requestPermissionsAsync();
      if (newStatus !== "granted") {
        Alert.alert("Permission Denied", "Unable to send notifications.");
        return;
      }
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Expo Push Token:", token);
    // Send the token to your backend for notification targeting
  };

  const triggerLocalNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hello!",
        body: "This is a test notification.",
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 2,
      }, // Trigger in 2 seconds
    });
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Image
          source={require("@/assets/images/ravn.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Notify</ThemedText>
      </ThemedView>
      <ThemedView>
        <Button
          title="Trigger Notification"
          onPress={triggerLocalNotification}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  reactLogo: {
    height: 256,
    width: 256,
    bottom: 0,
    right: -50,
    top: 50,
    position: "absolute",
  },
});
