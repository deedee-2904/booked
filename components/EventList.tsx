import { events } from "@/data/eventData";
import { useEffect, useState } from "react";
import { ScrollView, Text, View, Image } from "react-native";

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
		<View>
			<ScrollView>
				{events.map((event) => {
					const book = books[event.event_id];
					return (
						<View key={event.event_id}>
							<Text style={{fontSize:15, fontStyle:"italic"}} >{event.event_title}</Text>
							<Text>{event.event_date_time}</Text>
							<Text>{event.event_description}</Text>
							{book && book.volumeInfo?.imageLinks?.thumbnail && (
								<Image
									source={{ uri: book.volumeInfo.imageLinks.thumbnail}}
									style={{ width: 100, height: 150, marginTop: 6 }} 
                                    // seperate into style sheet
								/>
							)}
						</View>
					);
				})}
			</ScrollView>
		</View>
	);
}
