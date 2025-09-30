import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: "#44da55ff",
				headerStyle: {
					backgroundColor: "#25292e",
				},
				headerShadowVisible: false,
				headerTintColor: "#fff",
				tabBarStyle: {
					backgroundColor: "#25292e",
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color, focused }) => (
						<Ionicons name={focused ? "home-sharp" : "home-outline"} color={color} size={24} />
					),
				}}
			/>
			<Tabs.Screen
				name="events"
				options={{
					title: "Events",
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							name={focused ? "calendar-sharp" : "calendar-outline"}
							color={color}
							size={24}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
