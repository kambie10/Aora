import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-pblack">Aora!</Text>
      <Link href="/profile">
        <Text>Go to profile </Text>
      </Link>
    </View>
  );
}
