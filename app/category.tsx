import * as React from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '~/components/Header';
import { CarList } from '~/components/CarList';
import { Select, SelectTrigger, SelectContent, SelectItem, type Option } from '~/components/ui/select';
import { Text } from '~/components/ui/text';
import { useRouter } from 'expo-router';
import { useCars, UseCarsOptions } from '~/hooks/useCars';
import { useColorScheme } from '~/lib/useColorScheme';
import { Loading } from '~/components/Loading';
import { CarCardProps } from '~/components/CarCard';

interface OptionType {
  value: string;
  label: string;
}

// Car categories
const CATEGORIES: OptionType[] = [
  { value: 'all', label: 'All' },
  { value: 'sport', label: 'Sport' },
  { value: 'suv', label: 'SUV' },
  { value: 'mpv', label: 'MPV' },
  { value: 'sedan', label: 'Sedan' },
  { value: 'coupe', label: 'Coupe' },
  { value: 'hatchback', label: 'Hatchback' },
];

const SORT_OPTIONS: OptionType[] = [
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'year_desc', label: 'Most recent' },
  { value: 'year_asc', label: 'Oldest' },
];

export default function CategoryScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = React.useState<OptionType>(CATEGORIES[0]);
  const [favorites, setFavorites] = React.useState<string[]>([]);
  const [sortBy, setSortBy] = React.useState<OptionType>(SORT_OPTIONS[0]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const { cars, loading, setOptions } = useCars();

  if (loading) return <Loading/>;

  if (!cars || cars.length < 1) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center">
          <Text>No available cars</Text>
        </View>
      </SafeAreaView>
    );
  }
  

  const filteredCars = React.useMemo(() => {
    let filteredCars = [...cars];
    
    let options: UseCarsOptions = {};
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      options.search = query;
    }
    
    // Filter by category
    if (selectedCategory.value !== 'all') {
      options.type = selectedCategory.value;
    }

    options.sort = sortBy.value;

    setOptions(options);
  }, [selectedCategory.value, sortBy.value, searchQuery]);

  const handleCategoryChange = React.useCallback((value: any) => {
    const category = CATEGORIES.find(c => c.value === value);
    if (category) {
      setSelectedCategory(category);
    }
  }, []);

  const handleSortChange = React.useCallback((value: any) => {
    const sortOption = SORT_OPTIONS.find(o => o.value === value);
    if (sortOption) {
      setSortBy(sortOption);
    }
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header 
        showSearchBar
        onPressMenu={() => router.back()}
        onSearch={setSearchQuery}
        onFilterPress={() => {}}
      />

      <View className="flex-row items-center justify-between px-4 py-3 bg-muted/50">
        <View className="flex-1 mr-2">
          <Select>
            <SelectTrigger>
              <Text className="text-foreground">{selectedCategory.label}</Text>
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((category) => (
                <SelectItem
                  key={category.value}
                  value={category.value}
                  label={category.label}
                  onPress={() => handleCategoryChange(category.value)}
                >
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </View>
        <View className="flex-1 ml-2">
          <Select>
            <SelectTrigger>
              <Text className="text-foreground">{sortBy.label}</Text>
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  label={option.label}
                  onPress={() => handleSortChange(option.value)}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>r
        </View>
      </View>

      <CarList
        cars={cars}
        layout="vertical"
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        showViewAll={false}
        containerClassName="px-4 py-4 mb-20 pb-20"
      />
    </SafeAreaView>
  );
}