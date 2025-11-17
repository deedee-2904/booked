import { Image } from "@/components/ui/image";
import { EventCardProps } from "@/data/eventData";
import { Link } from "expo-router";
import { Pressable } from "react-native";
import { Card } from "./ui/card";
import { HStack } from "./ui/hstack";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";
import { LoadingSkeleton } from "./Loading";

export default function EventCard({ book, event }: EventCardProps) {
	const rawThumb = book?.volumeInfo?.imageLinks?.thumbnail || event.book_thumbnail;
	const thumbnail = event.book_thumbnail
		? event.book_thumbnail.replace(/^http:\/\//, "https://")
		: book?.volumeInfo?.imageLinks?.thumbnail
		? book.volumeInfo.imageLinks.thumbnail.replace(/^http:\/\//, "https://")
		: undefined;

	return (
		<Link
			href={{ pathname: "/events/[event_id]", params: { event_id: event.event_id } }}
			push
			asChild
		>
			<Pressable>
				<Card
					style={{ alignSelf: "center", backgroundColor: "#ffffffff" }}
					key={event.event_id}
					className="p-5 rounded-lg max-w-[360px] m-3"
					variant={"filled"}
				>
					<HStack reversed={true} className="items-center w-full" space="lg">
						<VStack className="flex-col mb-6" style={{ flexGrow: 1, flexShrink: 1 }}>
							<Text
								bold="true"
								size={"3xl"}
								style={{ flexShrink: 1 }}
								numberOfLines={3}
								ellipsizeMode="tail"
							>
								{event.event_title}
							</Text>
							<Text italic="true" bold="true" size={"lg"}>
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
						{/* Render thumbnail or loading skeleton */}
						{thumbnail ? (
							<Image
								source={{ uri: thumbnail }}
								className="h-[150px] w-[100px] rounded-md aspect-[150/240]"
								alt={`Book Cover for ${book?.volumeInfo?.title}`}
							/>
						) : (
							<LoadingSkeleton width={100} height={150} />
						)}
					</HStack>
				</Card>
			</Pressable>
		</Link>
	);
}

