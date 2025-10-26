import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { users } from "@/data/userData";
import { router } from "expo-router";

export default function UserLogin() {
	const [showPassword, setShowPassword] = useState(false);
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const handleState = () => {
		setShowPassword((showState) => {
			return !showState;
		});
	};

    //want the function to check if users[0].username or users[1].username match the input username
    const handleUsername =(username)=>{
        
    }


    //want the function to check if users[0].password or users[1].password match the input username
    const handlePassword = (password) =>{

    }

	return (
		<FormControl className="p-4 border border-outline-200 rounded-lg w-full">
			<VStack className="gap-4">
				<Heading className="text-typography-900">Login</Heading>
				<VStack space="xs">
					<Text className="text-typography-500">Username</Text>
					<Input>
						<InputField
							type="text"
							onChangeText={(enteredUsername) => {
								setUsername(enteredUsername);
                                handleUsername(username)
							}}
						/>
					</Input>
				</VStack>
				<VStack space="xs">
					<Text className="text-typography-500">Password</Text>
					<Input style={styles.input}>
						{/*What is happening here?? style={styles.input}*/}
						<InputField
							type={showPassword ? "text" : "password"}
							onChangeText={(enteredPassword) => {
								setPassword(enteredPassword);
                                handlePassword(password)
                                
							}}
						/>
						<InputSlot className="pr-3" onPress={handleState}>
							<InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
						</InputSlot>
					</Input>
				</VStack>
				<Button className="ml-auto" onPress={router.push("/(tabs)/index")}>
					<ButtonText>Login</ButtonText>
				</Button>
			</VStack>
		</FormControl>
	);
}

const styles = StyleSheet.create({
	input: {},
});
