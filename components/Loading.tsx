import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

interface LoadingProps {
	width?: number | string;
	height?: number;
	borderRadius?: number;
	style?: object;
}

export const LoadingSkeleton: React.FC<LoadingProps> = ({
	width = "100%",
	height = 150,
	borderRadius = 8,
	style = {},
}) => {
	return (
		<View style={[styles.skeleton, { width, height, borderRadius }, style]}>
			<ActivityIndicator size="large" color="#71a261" />
		</View>
	);
};

const styles = StyleSheet.create({
	skeleton: {
		backgroundColor: "#e0e0e0",
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 5,
	},
});
