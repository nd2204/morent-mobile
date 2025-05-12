import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage, getInitials } from '~/components/ui/avatar';
import { ChevronLeft, ChevronRight, User, Bell, Moon, LogOut, Shield, HelpCircle, Sun } from 'lucide-react-native';
import { iconWithClassName } from '~/lib/icons/iconWithClassName';
import { ThemeToggle } from '~/components/ThemeToggle';
import { useAuth } from '~/hooks/useAuth';
import { NavigationProps } from '~/types/NavigationProps';
import { useColorScheme } from '~/lib/useColorScheme';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import { Loading } from '~/components/Loading';

// Register icons with NativeWind
[ChevronLeft, ChevronRight, User, Bell, Moon, LogOut, Shield, HelpCircle].forEach(iconWithClassName);

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  onPress?: () => void;
  endElement?: React.ReactNode;
}

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProps>();
  const [loggingOut, setLoggingOut] = React.useState(false);
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const { isDarkColorScheme, setColorScheme } = useColorScheme();

  function toggleColorScheme() {
    const newTheme = isDarkColorScheme ? 'light' : 'dark';
    setColorScheme(newTheme);
    setAndroidNavigationBar(newTheme);
  }


  const handleSignOut = async () => {
    setLoggingOut(true);
    try {
      await logout();
      navigation.navigate("HomeScreen");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <View className="flex-1 bg-background mt-3">
      <ScrollView>
        {/* Profile Card */}
        <Card className="m-4 p-4">
          <View className="flex-row items-center">
            <Avatar className="h-16 w-16 mr-4" alt="User avatar">
              <AvatarImage source={{ uri: user?.imageUrl }} />
              <AvatarFallback>
                <Text className="text-lg">{getInitials(user?.name!)}</Text>
              </AvatarFallback>
            </Avatar>
            <View>
              <Text className="text-lg font-semibold">{user?.name}</Text>
              <Text className="text-muted-foreground">{user?.email}</Text>
            </View>
          </View>
        </Card>

        {/* Settings Sections */}
        <View className="px-4">
          {/* Account Settings */}
          <View className="mb-6">
            <Text className="text-base font-semibold mb-2 text-muted-foreground">Account Settings</Text>
            <Card className="divide-y divide-border">
              <SettingItem
                icon={<User size={20} className="text-foreground" />}
                title="Edit Profile"
                onPress={() => { }}
              />
              <SettingItem
                icon={<Bell size={20} className="text-foreground" />}
                title="Notifications"
                onPress={() => { }}
              />
              <SettingItem
                icon={
                  isDarkColorScheme ?
                    <Moon size={20} className="text-foreground" />
                    :
                    <Sun size={20} className="text-foreground" />
                }
                title={!isDarkColorScheme ? "Dark Mode" : "Light Mode"}
                onPress={() => toggleColorScheme()}
              />
            </Card>
          </View>

          {/* Support & About */}
          <View className="mb-6">
            <Text className="text-base font-semibold mb-2 text-muted-foreground">Support & About</Text>
            <Card className="divide-y divide-border">
              <SettingItem
                icon={<Shield size={20} className="text-foreground" />}
                title="Privacy Policy"
                onPress={() => { }}
              />
              <SettingItem
                icon={<HelpCircle size={20} className="text-foreground" />}
                title="Help & Support"
                onPress={() => { }}
              />
            </Card>
          </View>

          {/* Sign Out */}
          {isAuthenticated &&
            <Button
              variant="outline"
              className="w-full mb-8 native:h-[50px] flex-row"
              onPress={handleSignOut}
            >
              {loggingOut ?
                <Loading />
              :
                <>
                  <LogOut size={20} className="mr-2 text-destructive" />
                  <Text className="text-destructive font-semibold">Sign Out</Text>
                </>
              }
            </Button>
          }
        </View>
      </ScrollView>
    </View>
  );
}

function SettingItem({ icon, title, onPress, endElement }: SettingItemProps) {
  return (
    <Button
      variant="ghost"
      className="flex-row items-center justify-between py-4 px-0"
      onPress={onPress}
    >
      <View className="flex-row items-center">
        {icon}
        <Text className="ml-3 text-base">{title}</Text>
      </View>
      {endElement || <ChevronRight size={20} className="text-muted-foreground" />}
    </Button>
  );
}
