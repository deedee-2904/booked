import EventList from "@/components/EventList";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
	return (

			<View style={styles.container}>
				<Text style={styles.heading}>booked.</Text>
				<Text style={styles.subheading}>Here are your events!</Text> 
				<EventList />
			</View>

	);
}

const styles = StyleSheet.create({
	heading: {
		color: "#fff",
		fontSize: 40,
	},
	subheading: {
		color: "#fff",
		fontSize: 30,
	},
	container: {
		flex: 1,
		backgroundColor: "#71a261ff",
		alignItems: "center",
		justifyContent: "center",
	},
});
