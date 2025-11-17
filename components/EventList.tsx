import { events as defaultEvents } from "@/data/eventData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EventCard from "./EventCard";

export default function EventList() {
	const [allEvents, setAllEvents] = useState<any[]>([]);
	const [books, setBooks] = useState<{ [key: number]: any }>({});

	useEffect(() => {
		const loadEvents = async () => {
			try {
				const saved = await AsyncStorage.getItem("customEvents");
				const customEvents = saved ? JSON.parse(saved) : [];

				const formattedCustomEvents = customEvents.map((e: any) => ({
					...e,
					event_date_time: new Date(e.event_date_time),
				}));

				const combined = [...defaultEvents, ...formattedCustomEvents];

				combined.sort(
					(a, b) => new Date(a.event_date_time).getTime() - new Date(b.event_date_time).getTime()
				);

				setAllEvents(combined);
			} catch (err) {
				console.error("Failed to load events:", err);
				setAllEvents(defaultEvents);
			}
		};

		loadEvents();
	}, []);

	useEffect(() => {
		if (!allEvents.length) return;

		allEvents.forEach(async (event) => {
			if (!event.book_id) return;

			if (books[event.event_id]) return;

			try {
				const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${event.book_id}`);
				const data = await res.json();
				setBooks((prev) => ({ ...prev, [event.event_id]: data }));
			} catch (err) {
				console.error("Error fetching book:", err);
			}
		});
	}, [allEvents]);

	return (
		<SafeAreaView>
			<ScrollView>
				{allEvents.map((event, index) => {
					const book = books[event.event_id];
					return <EventCard key={`event-${event.event_id}-${index}`} book={book} event={event} />;
				})}
			</ScrollView>
		</SafeAreaView>
	);
}
