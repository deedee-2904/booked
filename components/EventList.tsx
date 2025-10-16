import { events } from "@/data/eventData";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EventCard from "./EventCard";

export default function EventList() {
	const [books, setBooks] = useState<{ [key: number]: any }>({});

	useEffect(() => {
		events.forEach(async (event) => {
			const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${event.book_id}`);
			const data = await res.json();
			setBooks((prev) => ({ ...prev, [event.event_id]: data }));
		});
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				{events.map((event) => {
					const book = books[event.event_id];
					return <EventCard key={event.event_id} book={book} event={event} />;
				})}
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom:50,
	},
});
