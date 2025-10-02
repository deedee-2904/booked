import { EventCardProps } from "@/data/eventData";
import { Text } from "react-native";
import { Image } from '@/components/ui/image';
import { Card } from "./ui/card";

export default function EventCard({ book, event }: EventCardProps) {
	return (
		<Card
			style={{ alignSelf: "center" }}
			key={event.event_id}
			className="p-5 rounded-lg max-w-[360px] m-3"
			variant={"filled"}
		>
			<Text style={{ fontSize: 25, fontWeight: "bold", color: "#fff" }}>{event.event_title} </Text>
			<Text style={{ fontSize: 15, fontStyle: "italic", color: "#fff" }}>
				{event.event_date_time}{" "}
			</Text>
			<Text style={{ fontSize: 15, color: "#fff" }}>{event.event_description}</Text>
			{book && book.volumeInfo?.imageLinks?.thumbnail && (
				<Image
					source={{ uri: book.volumeInfo.imageLinks.thumbnail }}
					className=" h-[150px] w-[100px] rounded-md aspect-[150/240]"

                    // style={{ width: 100, height: 150, marginTop: 6 }}
                    alt={`Book Cover for ${book.volumeInfo.title} by ${book.volumeInfo.authors}`}
					// seperate into style sheet
				/>
			)}
		</Card>
	);
}
