import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: "#44da55ff",
				headerShown:false,
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
			<Tabs.Screen
				name="add"
				options={{
					title: "Add",
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							name={focused ? "add-circle-sharp" : "add-circle-outline"}
							color={color}
							size={24}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="my-profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							name={focused ? "person-sharp" : "person-outline"}
							color={color}
							size={24}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
