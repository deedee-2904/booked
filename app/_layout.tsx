import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function RootLayout() {
	const colourScheme = useColorScheme();
	const isDark = colourScheme === "dark";

	return (
		<GluestackUIProvider mode={isDark ? "dark" : "light"}>
			<Stack
				screenOptions={{
					headerShown: false,
					headerStyle: { backgroundColor: isDark ? "#000" : "#fff" },
					headerTintColor: isDark ? "#fff" : "#000",
					headerTitleStyle: { color: isDark ? "#fff" : "#000" },
				}}
			>
				<Stack.Screen name="(tabs)" options={{ title: "Home" }} />
				<Stack.Screen name="events/[event_id]" options={{ headerShown: true }} />
				<Stack.Screen
					name="events/add"
					options={{ title: "Create an New Event", headerShown: true }}
				/>
			</Stack>
		</GluestackUIProvider>
	);
}
