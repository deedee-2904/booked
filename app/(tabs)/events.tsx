import EventList from "@/components/EventList";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { EditIcon } from "@/components/ui/icon";
import { useAuth } from "@/providers/AuthProvider";
import { router } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EventScreen() {
	const {currentUser} = useAuth()
	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.heading}>All Events</Text>
			<EventList />
			{currentUser?.isAdmin&&(<Button
				style={styles.button}
				size="xl"
				className="rounded-full"
				onPress={() => router.push("/events/add")}
			>
				<ButtonIcon as={EditIcon} className="text-typography-black" />
				<ButtonText style={styles.buttontext}>Create a New Event</ButtonText>
			</Button>)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	heading: {
		color: "#fff",
		fontSize: 40,
		fontWeight:"bold",
		marginBottom:-40,
	},
	container: {
		flex: 1,
		paddingTop: 30,
		backgroundColor: "#71a261ff",
		alignItems: "center",
		justifyContent: "center",
	},
	button: {
		marginTop: -10,
		backgroundColor: "white",
	},
	buttontext: {
		color: "black",
	},
});
