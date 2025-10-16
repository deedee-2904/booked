import { Image } from "@/components/ui/image";
import { EventCardProps } from "@/data/eventData";
import { Link } from "expo-router";
import { Pressable, Text } from "react-native";
import { Card } from "./ui/card";

export default function EventCard({ book, event }: EventCardProps) {
	return (
		<Link href={{pathname:"/events/[event_id]",params:{event_id:event.event_id}}} push asChild>
			<Pressable>
				<Card
					style={{ alignSelf: "center" }}
					key={event.event_id}
					className="p-5 rounded-lg max-w-[360px] m-3"
					variant={"filled"}
				>
					<Text style={{ fontSize: 25, fontWeight: "bold", color: "#fff" }}>
						{event.event_title}{" "}
					</Text>
					<Text style={{ fontSize: 15, fontStyle: "italic", color: "#fff" }}>
						{event.event_date_time}{" "}
					</Text>
					{book && book.volumeInfo?.imageLinks?.thumbnail && (
						<Image
							source={{ uri: book.volumeInfo.imageLinks.thumbnail }}
							className=" h-[150px] w-[100px] rounded-md aspect-[150/240]"
							alt={`Book Cover for ${book.volumeInfo.title} by ${book.volumeInfo.authors}`}
						/>
					)}
				</Card>
			</Pressable>
		</Link>
	);
}

//seperate styles into stylesheet