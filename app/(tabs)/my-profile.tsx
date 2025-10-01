import { Text, View, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>User Profile Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    text: {
        color: "#fff",
        fontSize: 40,
    },
    container: {
        flex: 1,
        backgroundColor: "#71a261ff",
        alignItems: "center",
        justifyContent: "center",
    }
});