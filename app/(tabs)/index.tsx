import EventList from "@/components/EventList";
import { Image } from "@/components/ui/image";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
	return (
		<SafeAreaView style={styles.container}>
			<Image
				className="rounded-md aspect-[50/50]"
				source={require("../../assets/images/booked-icon.png")}
				alt="booked. logo - a green book with a white letter b on the cover"
			/>
			<Text style={styles.heading}>booked.</Text>
			<EventList />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	heading: {
		color: "#fff",
		fontSize: 40,
		marginBottom: -50,
		fontWeight:"bold",
	},
	subheading: {
		color: "#fff",
		fontSize: 30,
	},
	container: {
		flex: 1,
		paddingTop: 40,
		paddingBottom: -100,
		backgroundColor: "#71a261ff",
		alignItems: "center",
		justifyContent: "center",
	},
	smallLogo: {
		width: 70,
		height: 70,
		marginTop: 60,
		marginBottom: 10,
	},
});
