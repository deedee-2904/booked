import { Image } from "@/components/ui/image";
import { EventCardProps } from "@/data/eventData";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { Card } from "./ui/card";
import { HStack } from "./ui/hstack";
import { VStack } from "./ui/vstack";

export default function EventCard({ book, event }: EventCardProps) {
	const thumbnail = book?.volumeInfo?.imageLinks?.thumbnail || event.book_thumbnail;
	return (
		<Link
			href={{ pathname: "/events/[event_id]", params: { event_id: event.event_id } }}
			push
			asChild
		>
			<Pressable>
				<Card
					style={{ alignSelf: "center", backgroundColor: "#332e2eff" }}
					key={event.event_id}
					className="p-5 rounded-lg max-w-[360px] m-3"
					variant={"filled"}
				>
					<HStack reversed={true} className="items-center w-full space-x-4" space="lg">
						<VStack className="items-left" style={{ flexGrow:1 }}>
					
							<Text style={{ fontSize: 25, fontWeight: "bold", color: "#fff" }}>
								{event.event_title}
							</Text>
							<Text style={styles.datetime}>
								{event.event_date_time.toLocaleDateString([], {
									day: "numeric",
									month: "short",
									year: "numeric",
								})}{" "}
								at{" "}
								{event.event_date_time.toLocaleTimeString([], {
									hour: "2-digit",
									minute: "2-digit",
								})}
							</Text>
						</VStack>

						{book && book.volumeInfo?.imageLinks?.thumbnail && (
							<Image
								source={{ uri: thumbnail }}
								className=" h-[150px] w-[100px] rounded-md aspect-[150/240]"
								alt={`Book Cover for ${book.volumeInfo.title} by ${book.volumeInfo.authors}`}
							/>
						)}
					</HStack>
				</Card>
			</Pressable>
		</Link>
	);
}

//seperate styles into stylesheet
const styles = StyleSheet.create({
	datetime: { fontSize: 15, fontStyle: "italic", color: "#fff", fontWeight: "bold" },
});
