import * as React from 'react';
import { View, TextInput, Pressable } from 'react-native';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage, getInitials } from '~/components/ui/avatar';
import { Menu, Search, Filter, LogIn } from 'lucide-react-native';
import { iconWithClassName } from '~/lib/icons/iconWithClassName';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '~/hooks/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '~/types/RootStackParamList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TabParamList } from '~/types/TabParamList';

// Register icons with NativeWind
[Menu, Search, Filter, LogIn].forEach(iconWithClassName);

interface HeaderProps {
  showMenu?: boolean;
  showSearchBar?: boolean;
  searchBarShouldRedirect?: boolean;
  onPressMenu?: () => void;
  onPressAvatar?: () => void;
  onSearch?: (query: string) => void;
  onPressSearch?: () => void
  onFilterPress?: () => void;
  isAuthenticated?: boolean;
}

export function Header({
  showMenu = false,
  showSearchBar = false,
  searchBarShouldRedirect = false,
  onPressMenu,
  onPressAvatar,
  onSearch,
  onPressSearch,
  onFilterPress,
}: HeaderProps) {
  const { navigate: navigateTab } = useNavigation<NativeStackNavigationProp<TabParamList>>();
  const { navigate: navigateStack } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { isAuthenticated, user } = useAuth();
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <SafeAreaView className="bg-background border-b border-border">
      {/* First Row: Menu, Brand, Avatar, Theme Toggle */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <View className="flex-row items-center gap-3">
          {showMenu && (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onPress={onPressMenu}
            >
              <Menu size={24} className="text-foreground" />
            </Button>
          )}
          {!showSearchBar && (

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onPress={onPressSearch}
            >
              <Search size={20} className="text-foreground" />
            </Button>
          )}
          <Text className="text-[1.5rem] font-black text-primary">MORENT</Text>
        </View>

        <View className="flex-row items-center gap-2">
          <ThemeToggle />
          {isAuthenticated ? (
            <Pressable
              className="pr-2 rounded-full"
              onPress={() => navigateTab('ProfileScreen', {userId: user?.userId! })}
            >
              <Avatar className="h-9 w-9" alt="user avatar">
                <AvatarImage
                  source={{ uri: user?.imageUrl }}
                  className="bg-muted"
                />
                <AvatarFallback>
                  <Text className="text-xs">{getInitials(user?.name)}</Text>
                </AvatarFallback>
              </Avatar>
            </Pressable>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onPress={() => navigateStack('AuthScreen')}
            >
              <LogIn size={24} className="text-foreground" />
            </Button>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
