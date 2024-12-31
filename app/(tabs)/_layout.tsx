import { Tabs } from "expo-router";
import React from "react";
import { Linking, Platform, Text, TouchableOpacity } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Producery",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notify"
        options={{
          title: "Notify",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="website"
        options={{
          tabBarLabel: "Website",
          tabBarButton: () => (
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("https://admin.horriblemeadery.com")
              }
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconSymbol size={28} name="chevron.right" color={"gray"} />
              <Text
                style={{
                  fontSize: 10,
                  color: "gray",
                }}
              >
                Producery
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}
