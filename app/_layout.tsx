import { Stack } from "expo-router";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";

export default function RootLayout() {
	return (
		<GluestackUIProvider mode="dark">
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="(tabs)" options={{title:"Home"}}  />
				<Stack.Screen name="events/[event_id]" options={{ headerShown: true}} />
			</Stack>
		</GluestackUIProvider>
	);
}

