import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { AddIcon, CheckIcon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import {
	Modal,
	ModalBackdrop,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@/components/ui/modal";
import { events } from "@/data/eventData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useAuth } from "@/providers/AuthProvider";

export default function SingleEventScreen() {
	const params = useLocalSearchParams<{ event_id: string }>();

	const [allEvents, setAllEvents] = useState(events);
	const [book, setBook] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [signedUp, setSignedUp] = useState(false);
	const [showSignUpModal, setShowSignUpModal] = useState(false);
	const [showCancelModal, setShowCancelModal] = useState(false);

	const {currentUser}= useAuth()

	// Load custom events from AsyncStorage
	useEffect(() => {
		const loadCustomEvents = async () => {
			try {
				const saved = await AsyncStorage.getItem("customEvents");
				if (saved) {
					setAllEvents([...events, ...JSON.parse(saved)]);
				}
			} catch (err) {
				console.error("Failed to load custom events:", err);
			}
		};
		loadCustomEvents();
	}, []);

	const event = allEvents.find((e) => e.event_id === +params.event_id);
	const eventDate = event ? new Date(event.event_date_time) : null;

	// Load book info if book_id exists
	useEffect(() => {
		const fetchBook = async () => {
			if (!event?.book_id) {
				setLoading(false);
				return;
			}
			try {
				const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${event.book_id}`);
				const data = await res.json();
				setBook(data);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		fetchBook();
	}, [event]);

	// Load sign-up status
	useEffect(() => {
		if (!event) return;
		const loadSignUpStatus = async () => {
			try {
				const saved = await AsyncStorage.getItem(`signedUp-${event.event_id}`);
				if (saved === "true") setSignedUp(true);
			} catch (e) {
				console.error("Failed to load sign-up:", e);
			}
		};
		loadSignUpStatus();
	}, [event]);

	const handleSignUp = async () => {
		if (!event) return;
		try {
			await AsyncStorage.setItem(`signedUp-${event.event_id}`, "true");
			setSignedUp(true);
		} catch (e) {
			console.error("Failed to sign up:", e);
		}
	};

	const handleCancelSignUp = async () => {
		if (!event) return;
		try {
			await AsyncStorage.removeItem(`signedUp-${event.event_id}`);
			setSignedUp(false);
		} catch (e) {
			console.error("Failed to cancel sign-up:", e);
		}
	};

	if (!event) {
		return (
			<View style={styles.center}>
				<Text style={styles.text}>Event Not Found</Text>
			</View>
		);
	}

	const fixURL = (url?: string) => (url ? url.replace(/^http:\/\//, "https://") : undefined);
	const thumbnail = fixURL(book?.volumeInfo?.imageLinks?.thumbnail);

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: event.event_title }} />
			<Text style={styles.heading}>{event.event_title}</Text>
			{eventDate && (
				<Text style={styles.datetime}>
					{eventDate.toLocaleDateString([], { day: "numeric", month: "short", year: "numeric" })} at{" "}
					{eventDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
				</Text>
			)}
			<Text style={styles.description}>{event.event_description}</Text>

			{loading ? (
				<ActivityIndicator size="large" color="#fff" style={{ marginVertical: 20 }} />
			) : (
				thumbnail && (
					<Image
						source={{ uri: thumbnail }}
						className="h-[250px] w-[100px] rounded-md aspect-[150/240]"
						alt={`Book Cover for ${book.volumeInfo.title} by ${book.volumeInfo.authors}`}
					/>
				)
			)}

			{!signedUp && !currentUser?.isAdmin? (
				<>
					<Button style={styles.signupbutton} onPress={() => setShowSignUpModal(true)}>
						<ButtonText style={styles.text} size={"xl"}>
							Sign Up
						</ButtonText>
						<ButtonIcon as={AddIcon} className="text-typography-black" />
					</Button>

					<Modal isOpen={showSignUpModal} onClose={() => setShowSignUpModal(false)} size="md">
						<ModalBackdrop />
						<ModalContent style={{ backgroundColor: "white" }}>
							<ModalHeader />
							<ModalBody>
								<Text style={styles.text}>Are you sure you want to sign up for this event?</Text>
							</ModalBody>
							<ModalFooter>
								<Button onPress={() => setShowSignUpModal(false)}>
									<ButtonText>No</ButtonText>
								</Button>
								<Button
									onPress={() => {
										handleSignUp();
										setShowSignUpModal(false);
									}}
								>
									<ButtonText>Yes!</ButtonText>
								</Button>
							</ModalFooter>
						</ModalContent>
					</Modal>
				</>
			) : (
				<>
					<Button style={styles.goingbutton} size={"xl"} onPress={() => setShowCancelModal(true)}>
						<ButtonText>You're going!</ButtonText>
						<ButtonIcon as={CheckIcon} />
					</Button>

					<Modal isOpen={showCancelModal} onClose={() => setShowCancelModal(false)} size="md">
						<ModalBackdrop />
						<ModalContent style={{ backgroundColor: "white" }}>
							<ModalHeader />
							<ModalBody>
								<Text style={styles.text}>
									Are you sure you want to cancel your sign-up for this event?
								</Text>
							</ModalBody>
							<ModalFooter>
								<Button onPress={() => setShowCancelModal(false)}>
									<ButtonText>No</ButtonText>
								</Button>
								<Button
									onPress={() => {
										handleCancelSignUp();
										setShowCancelModal(false);
									}}
								>
									<ButtonText>Yes, Cancel</ButtonText>
								</Button>
							</ModalFooter>
						</ModalContent>
					</Modal>
				</>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#71a261ff",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 20,
	},
	heading: {
		color: "#fff",
		fontSize: 40,
		marginTop: -10,
		textAlign: "center",
		fontWeight: "bold",
	},
	datetime: { fontSize: 30, fontStyle: "italic", color: "#fff", fontWeight: "bold", margin: 5 },
	description: {
		color: "#fff",
		fontSize: 20,
		fontStyle:"italic",
		textAlign: "center",
		marginTop: 10,
		marginBottom: 25,
	},
	text: { color: "black" },
	center: { flex: 1, justifyContent: "center", alignItems: "center" },
	signupbutton: {
		marginTop: 40,
		backgroundColor: "white",
	},
	goingbutton: {
		marginTop: 40,
		backgroundColor: "green",
	},
});
