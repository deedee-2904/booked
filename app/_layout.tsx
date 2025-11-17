import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function RootLayout() {
	const colourScheme = useColorScheme();
	const isLight = colourScheme === "light";

	return (
		<GluestackUIProvider mode={isLight ? "light" : "dark"}>
			<Stack
				screenOptions={{
					headerShown: false,
					headerStyle: { backgroundColor: isLight ? "#fff" : "#000" },
					headerTintColor: isLight ? "#000" : "#fff",
					headerTitleStyle: { color: isLight ? "#000" : "#fff" },
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
