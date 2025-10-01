import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>booked.</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	text: {
		color: "#fff",
		fontSize: 40,
	},
	container: {
		flex: 1,
		backgroundColor: "#71a261ff",
		alignItems: "center",
		justifyContent: "center",
	},
	button: {
		fontSize: 20,
		textDecorationLine: "underline",
    color:"#fff"
	},
});
