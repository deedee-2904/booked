import { Button, ButtonText } from "@/components/ui/button";
import {
	FormControl,
	FormControlError,
	FormControlErrorIcon,
	FormControlErrorText,
	FormControlLabel,
	FormControlLabelText,
} from "@/components/ui/form-control";
import { AlertCircleIcon, CloseIcon, Icon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { VStack } from "@/components/ui/vstack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	Alert,
	Image,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import { events } from "../../data/eventData";

export default function AddEventScreen() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [bookQuery, setBookQuery] = useState("");
	const [bookResults, setBookResults] = useState<any[]>([]);
	const [selectedBook, setSelectedBook] = useState<any>(null);
	const [dateTime, setDate] = useState(new Date());
	const [showPicker, setShowPicker] = useState(false);
	const [isInvalid, setIsInvalid] = useState(false);
	const [success, setSuccess] = useState(false);

	const nextEventId = events.length + 1;

	// Fix URL issue
	const fixURL = (url?: string) => (url ? url.replace(/^http:\/\//, "https://") : undefined);

	// Google Books search
	useEffect(() => {
		const fetchBooks = async () => {
			if (bookQuery.length < 3) return;
			try {
				const res = await fetch(
					`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(bookQuery)}`
				);
				const data = await res.json();
				setBookResults(data.items || []);
			} catch (err) {
				console.error("Failed to fetch books:", err);
			}
		};
		const timeout = setTimeout(fetchBooks, 400);
		return () => clearTimeout(timeout);
	}, [bookQuery]);

	// Add event
	const handleAddEvent = async () => {
		if (!title || !description || !selectedBook) {
			setIsInvalid(true);
			return;
		}

		// Create fresh unique copy for the book thumbnails
		const thumbnail = fixURL(selectedBook.volumeInfo?.imageLinks?.thumbnail);

		const newEvent = {
			event_id: nextEventId,
			event_title: title,
			event_description: description,
			event_date_time: dateTime.toISOString(),
			book_id: selectedBook.id,
			book_thumbnail: thumbnail,
			attendees: [],
		};

		try {
			const storedEvents = await AsyncStorage.getItem("customEvents");
			const parsed = storedEvents ? JSON.parse(storedEvents) : [];

			// Deep copy previous events to avoid shared references
			const updated = parsed.map((e: any) => ({ ...e }));
			updated.push({ ...newEvent });

			await AsyncStorage.setItem("customEvents", JSON.stringify(updated));

			// Resets form
			setSuccess(true);
			Alert.alert("Event Added", "Your event has been created successfuly! ", [
				{ text: "Dismiss" },
			]);
			setTitle("");
			setDescription("");
			setBookQuery("");
			setSelectedBook(null);
			setDate(new Date());

			setTimeout(() => router.replace("/(tabs)/events"), 500);
		} catch (e) {
			console.error("Failed to save event:", e);
		}
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.container}
			>
				<Text style={styles.heading}>Add a New Event</Text>
				<VStack space="xl">
					{/* Event Title */}
					<FormControl isRequired isInvalid={isInvalid && !title}>
						<FormControlLabel>
							<FormControlLabelText>Event Title</FormControlLabelText>
						</FormControlLabel>
						<Input variant="outline" style={styles.input}>
							<InputField
								placeholder="Enter event title"
								value={title}
								onChangeText={setTitle}
								placeholderTextColor="#888"
							/>
						</Input>
						{isInvalid && !title && (
							<FormControlError>
								<FormControlErrorIcon as={AlertCircleIcon} />
								<FormControlErrorText>Title is required.</FormControlErrorText>
							</FormControlError>
						)}
					</FormControl>

					{/* Date Picker */}
					<FormControl isRequired>
						<FormControlLabel>
							<FormControlLabelText>Date & Time</FormControlLabelText>
						</FormControlLabel>
						<Button onPress={() => setShowPicker(true)}>
							<ButtonText>
								{dateTime.toLocaleDateString()} —{" "}
								{dateTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
							</ButtonText>
						</Button>
						{showPicker && (
							<DateTimePicker
								minimumDate={new Date()}
								value={dateTime}
								mode="datetime"
								display="default"
								onChange={(event, selectedDate) => {
									setShowPicker(false);
									if (selectedDate) setDate(selectedDate);
								}}
							/>
						)}
					</FormControl>

					{/* Description */}
					<FormControl isRequired isInvalid={isInvalid && !description}>
						<FormControlLabel>
							<FormControlLabelText>Description</FormControlLabelText>
						</FormControlLabel>
						<Textarea variant="default" style={styles.textarea}>
							<TextareaInput
								placeholder="Describe your event"
								value={description}
								onChangeText={setDescription}
								placeholderTextColor="#888"
							/>
						</Textarea>
						{isInvalid && !description && (
							<FormControlError>
								<FormControlErrorIcon as={AlertCircleIcon} />
								<FormControlErrorText>Description is required.</FormControlErrorText>
							</FormControlError>
						)}
					</FormControl>

					{/* Related Book */}
					<FormControl isRequired>
						<FormControlLabel>
							<FormControlLabelText>Related Book</FormControlLabelText>
						</FormControlLabel>
						<Input variant="outline" style={styles.input}>
							<InputField
								placeholder="Search Google Books... E.g. Book Title, Author"
								value={bookQuery}
								onChangeText={(text) => {
									setBookQuery(text);
									setSelectedBook(null);
								}}
								placeholderTextColor="#888"
							/>
						</Input>

						{/* Book Results */}
						{bookResults.length > 0 && !selectedBook && (
							<View style={styles.resultsContainer}>
								{bookResults.slice(0, 5).map((book, index) => (
									<TouchableOpacity
										key={`${book.id}-${index}`}
										style={styles.resultItem}
										onPress={() => {
											setSelectedBook(book);
											setBookQuery(book.volumeInfo.title);
											setBookResults([]);
										}}
									>
										<Text style={styles.resultTitle}>{book.volumeInfo.title}</Text>
										<Text style={styles.resultAuthor}>
											{book.volumeInfo.authors?.join(", ") || "Unknown Author"}
										</Text>
									</TouchableOpacity>
								))}
							</View>
						)}

						{/* Selected Book */}
						{selectedBook && (
							<View style={styles.selectedBook}>
								{fixURL(selectedBook.volumeInfo?.imageLinks?.thumbnail) && (
									<Image
										source={{ uri: fixURL(selectedBook.volumeInfo.imageLinks.thumbnail) }}
										style={styles.bookThumbnail}
									/>
								)}
								<View style={{ flex: 1 }}>
									<Text style={styles.bookTitle}>{selectedBook.volumeInfo.title}</Text>
									<Text style={styles.bookAuthor}>
										{selectedBook.volumeInfo.authors?.join(", ") || "Unknown Author"}
									</Text>
								</View>
								<TouchableOpacity onPress={() => setSelectedBook(null)}>
									<Icon as={CloseIcon} />
								</TouchableOpacity>
							</View>
						)}
					</FormControl>

					<Button onPress={handleAddEvent}>
						<ButtonText>Add Event</ButtonText>
					</Button>
				</VStack>

				{success && <Text style={styles.success}>✅ Event added successfully!</Text>}
			</KeyboardAvoidingView>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: { padding: 10, backgroundColor: "#fff", flexGrow: 1 },
	heading: { fontSize: 24, fontWeight: "700", marginBottom: 20, textAlign: "center" },
	input: { backgroundColor: "#f2f2f2", borderRadius: 8 },
	textarea: { backgroundColor: "#f2f2f2", borderRadius: 8 },
	resultsContainer: { marginTop: 10, backgroundColor: "#fafafa", borderRadius: 8 },
	resultItem: { padding: 10, borderBottomWidth: 1, borderColor: "#ddd" },
	resultTitle: { fontWeight: "600", color: "black" },
	resultAuthor: { color: "black" },
	selectedBook: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#eee",
		padding: 10,
		borderRadius: 8,
		marginTop: 8,
	},
	bookTitle: { color: "black", fontWeight: "bold", fontSize: 16 },
	bookAuthor: { color: "black", fontSize: 14 },
	bookThumbnail: { width: 40, height: 60, marginRight: 10, borderRadius: 4 },
	success: { marginTop: 10, color: "green", textAlign: "center" },
});
