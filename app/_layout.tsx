import '~/global.css';

import { DarkTheme, DefaultTheme, Theme, ThemeProvider, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, Text, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { PortalHost } from '@rn-primitives/portal';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import { useAuth } from '~/hooks/useAuth';
import { AuthProvider } from '~/services/AuthService';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from './ProfileScreen';
import HomeScreen from './HomeScreen';
import CategoryScreen from './CategoryScreen';
import { Header } from '~/components/Header';
import { ArrowLeft, CarFront, ChevronLeft, HomeIcon, ShoppingCart, User } from 'lucide-react-native';
import { iconWithClassName } from '~/lib/icons/iconWithClassName';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '~/types/RootStackParamList';
import { TabParamList } from '~/types/TabParamList';
import DetailScreen from './DetailScreen';
import PaymentScreen from './PaymentScreen';
import RentalsScreen from './RentalsScreen';
import AuthLayout from './(auth)/_layout';
import { Button } from '~/components/ui/button';
import RentalDetailScreen from './RentalDetailScreen';
import RentCarScreen from './RentCarScreen';
import SelectNearCarScreen from './SelectNearCarScreen';

[CarFront, HomeIcon, ShoppingCart, User].forEach(i => iconWithClassName(i))

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};


const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator<TabParamList>();

function TabsNavigator() {
  const {isAuthenticated} = useAuth();
  return (
    <BottomTab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case "CategoryScreen":
              return <CarFront size={20} color={color} />
            case "HomeScreen":
              return <HomeIcon size={20} color={color} />
            case "RentalsScreen":
              return <ShoppingCart size={20} color={color} />
            case "ProfileScreen":
              return <User size={20} color={color} />
          }
        },
        tabBarLabel: route.name.replace("Screen", ""),
        header: () => {
          if (route.name === "CategoryScreen")
            return <Header showSearchBar />

          return <Header />
        },
      })}
    >
      <BottomTab.Screen
        name="HomeScreen"
        component={HomeScreen}
      />
      <BottomTab.Screen
        name="CategoryScreen"
        component={CategoryScreen}
      />
      {
        isAuthenticated ?
        <>
          <BottomTab.Screen
            name="RentalsScreen"
            component={RentalsScreen}
          />
          <BottomTab.Screen
            name="ProfileScreen"
            component={ProfileScreen}
          />
        </>
        :
        <></>
      }
    </BottomTab.Navigator>
  )
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const hasMounted = React.useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === 'web') {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add('bg-background');
    }
    setAndroidNavigationBar(colorScheme);
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
          <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
          <Stack.Navigator
            screenOptions={({ route, navigation }) => ({

            })}
          >
            <Stack.Screen
              name="Tabs"
              component={TabsNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="DetailScreen" component={DetailScreen} />
            <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
            <Stack.Screen name="RentalDetailScreen" component={RentalDetailScreen} />
            <Stack.Screen name="RentCarScreen" component={RentCarScreen} options={{headerShown: false}}/>
            <Stack.Screen name="SelectNearCarScreen" component={SelectNearCarScreen} options={{headerShown: false}}/>

            <Stack.Screen name="AuthScreen" component={AuthLayout}
              options={{
                // header: ({ navigation }) => (
                //   <SafeAreaView>
                //   </SafeAreaView>
                // )
                headerTitle: undefined,
                headerShadowVisible: false
              }} />
          </Stack.Navigator>
          <PortalHost />
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;
