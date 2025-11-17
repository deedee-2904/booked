import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { users } from "@/data/userData";
import { useAuth } from "@/providers/AuthProvider";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";

export default function UserLogin() {
	const { isLoggedIn, setIsLoggedIn, setCurrentUser } = useAuth();
	const [showPassword, setShowPassword] = useState(false);
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const handleTogglePassword = () => setShowPassword((prev) => !prev);

	useEffect(() => {
		if (isLoggedIn) {
			router.replace("/(tabs)");
		}
	}, [isLoggedIn]);

	const handleLogin = () => {
		const found = users.find((user) => user.username === username && user.password === password);

		if (found) {
			setIsLoggedIn(true);
			setCurrentUser(found);
		} else {
			alert("Invalid username or password");
		}
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1 }}
		>
			<ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
				<Image
					className="rounded-md aspect-[50/50]"
					source={require("../../assets/images/booked-icon.png")}
					alt="booked. logo - a green book with a white letter b on the cover"
					size={"xl"}
				/>
				<Text style={styles.heading}>booked.</Text>
				<FormControl
					className="p-4 border border-outline-200 rounded-lg w-full"
					style={styles.form}
				>
					<VStack className="gap-4">
						<Heading className="text-typography-black">Login</Heading>
						<VStack space="xs">
							<Text className="text-typography-black">Username</Text>
							<Input>
								<InputField
									type="text"
									value={username}
									onChangeText={setUsername}
									autoCapitalize="none"
								/>
							</Input>
						</VStack>
						<VStack space="xs">
							<Text className="text-typography-black">Password</Text>
							<Input>
								<InputField
									type={showPassword ? "text" : "password"}
									value={password}
									onChangeText={setPassword}
								/>
								<InputSlot className="pr-3" onPress={handleTogglePassword}>
									<InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
								</InputSlot>
							</Input>
						</VStack>
						<Button className="ml-auto" onPress={handleLogin}>
							<ButtonText>Login</ButtonText>
						</Button>
					</VStack>
				</FormControl>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	input: { backgroundColor: "white" },
	heading: {
		color: "#fff",
		fontSize: 40,
		fontWeight: "bold",
		lineHeight: 48,
	},
	form: {
		marginTop: 20,
		backgroundColor: "white",
	},
	container: {
		flex: 1,
		padding: 30,
		backgroundColor: "#71a261ff",
		alignItems: "center",
		justifyContent: "center",
	},
});
