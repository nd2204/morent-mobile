import { CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./RootStackParamList";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabParamList } from "./TabParamList";


export type NavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList>,
  BottomTabNavigationProp<TabParamList>
>;