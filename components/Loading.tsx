import { View } from "lucide-react-native";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { useColorScheme } from "~/lib/useColorScheme";
import { Text } from "react-native";

interface LoadingProps
{
  inverted?: boolean,
  withLogo?: boolean
}

export function Loading({
  inverted = false,
  withLogo = false
} : LoadingProps) {
  const { colorScheme } = useColorScheme();

  return (
    <>
      {withLogo &&
        <Text
          className="text-[3rem] text-foreground font-black text-center mb-20"
          numberOfLines={1}
        >
          MORENT
        </Text>
      }
      <View className="flex-1 flex-col w-full justify-center self-center bg-background px-4">
        {inverted
          ? <ActivityIndicator className="fg-background" size="large" color={colorScheme == "dark" ? "#000" : "#fff"} />
          : <ActivityIndicator className="fg-background" size="large" color={colorScheme == "dark" ? "#fff" : "#000"} />
        }
      </View>
    </>
  );
}