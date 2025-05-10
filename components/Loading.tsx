import { View } from "lucide-react-native";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { useColorScheme } from "~/lib/useColorScheme";

export function Loading({inverted = false} : {inverted?: boolean})
{
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex-1 justify-center align-center bg-background">
      {inverted
        ?  <ActivityIndicator className="fg-background" size="large" color={colorScheme == "dark" ? "#000" : "#fff"} />
        :  <ActivityIndicator className="fg-background" size="large" color={colorScheme == "dark" ? "#fff" : "#000"} />
      }
    </View>
  );
}