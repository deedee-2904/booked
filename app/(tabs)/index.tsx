import EventList from "@/components/EventList";
import { Image, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
	return (
		<SafeAreaView style={styles.container}>
			<Image style={styles.smallLogo} source={require("../../assets/images/booked-icon.png")} />
			<Text style={styles.heading}>booked.</Text>
			<EventList />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	heading: {
		color: "#fff",
		fontSize: 40,
		marginBottom:-50
	},
	subheading: {
		color: "#fff",
		fontSize: 30,
	},
	container: {
		flex: 1,
		paddingTop: 40,
		backgroundColor: "#71a261ff",
		alignItems: "center",
		justifyContent: "center",
	},
	smallLogo: {
		width: 70,
		height: 70,
		marginTop:60,
		marginBottom:10,
	},
});
