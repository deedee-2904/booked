import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { AuthProvider, useAuth } from "@/providers/AuthProvider";
import { Redirect, Stack, useSegments } from "expo-router";
import { useColorScheme } from "react-native";

export default function RootLayout() {
	const colourScheme = useColorScheme();
	const isLight = colourScheme === "light";

	return (
		<AuthProvider>
			<GluestackUIProvider mode={isLight ? "light" : "dark"}>
				<AuthGate>
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
							options={{ title: "Create a New Event", headerShown: true }}
						/>
					</Stack>
				</AuthGate>
			</GluestackUIProvider>
		</AuthProvider>
	);
}

function AuthGate({ children }: { children: React.ReactNode }) {
	const { isLoggedIn } = useAuth();
	const segments = useSegments();
	const inAuthGroup = segments[0] === "(auth)";


	if (!isLoggedIn && !inAuthGroup) {
		return <Redirect href="/(auth)/login" />;
	}


	return <>{children}</>;
}
