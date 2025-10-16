import EventList from '@/components/EventList';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function EventScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>All Events</Text>
	  <EventList/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
	heading: {
		color: "#fff",
		fontSize: 40,
		marginBottom:-50
	},
	container: {
		flex: 1,
		marginBottom:-100,
		backgroundColor: "#71a261ff",
		alignItems: "center",
		justifyContent: "center",
	}
});
