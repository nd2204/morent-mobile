import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { CarList } from '~/components/CarList';
import { Select, SelectTrigger, SelectContent, SelectItem, type Option } from '~/components/ui/select';
import { Text } from '~/components/ui/text';
import { useRouter } from 'expo-router';
import { useCars, UseCarsOptions } from '~/hooks/useCars';
import { Loading } from '~/components/Loading';
import { SearchBar } from '@rneui/themed';
import { useColorScheme } from '~/lib/useColorScheme';

// Car categories
const CATEGORIES: Option[] = [
  { value: '', label: 'All' },
  { value: 'sport', label: 'Sport' },
  { value: 'suv', label: 'SUV' },
  { value: 'mpv', label: 'MPV' },
  { value: 'sedan', label: 'Sedan' },
  { value: 'coupe', label: 'Coupe' },
  { value: 'hatchback', label: 'Hatchback' },
];

const SORT_OPTIONS: Option[] = [
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
];

export default function CategoryScreen() {
  const [selectedCategory, setSelectedCategory] = React.useState<Option>(CATEGORIES[0]);
  const [favorites, setFavorites] = React.useState<string[]>([]);
  const [sortBy, setSortBy] = React.useState<Option>(SORT_OPTIONS[0]);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const { isDarkColorScheme } = useColorScheme();
  const { cars, loading, setOptions } = useCars();

  const options: UseCarsOptions = {
    sort: sortBy?.value,
    search: searchQuery,
    type: selectedCategory?.value,
  }

  const handleCategoryChange = React.useCallback((value: any) => {
    const category = CATEGORIES.find(c => c!.value === value);
    if (category) {
      setSelectedCategory(category);
      setOptions(options => options = {
        ...options,
        type: category.value
      });
    }
  }, []);

  const handleSortChange = React.useCallback((value: any) => {
    const sortOption = SORT_OPTIONS.find(o => o!.value === value);
    if (sortOption) {
      setSortBy(sortOption);
      setOptions(options => options = {
        ...options,
        sort: sortOption.value
      });
    }
  }, []);

  const handleSearchChange = React.useCallback((value: any) => {
    setSearchQuery(value);
    setOptions(options => options = {
      ...options,
      search: value
    });
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  return (
    <View className="flex-1 bg-background">
      <SearchBar
        key={null}
        containerStyle={{ backgroundColor: undefined, borderWidth: 0 }}
        inputContainerStyle={{ backgroundColor: undefined, borderWidth: 0 }}
        lightTheme={!isDarkColorScheme}
        placeholder="Search something"
        onChangeText={(text) => { handleSearchChange(text) }}
        value={searchQuery}
        showLoading={loading}
      />
      <View className="flex-row items-center justify-between px-4 py-3 bg-muted/50">
        <View className="flex-1 mr-2">
          <Select>
            <SelectTrigger>
              <Text className="text-foreground">{selectedCategory!.label}</Text>
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((category) => (
                <SelectItem
                  key={category!.value}
                  value={category!.value}
                  label={category!.label}
                  onPress={() => handleCategoryChange(category!.value)}
                >
                  <Text>
                    {category!.label}
                  </Text>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </View>
        <View className="flex-1 ml-2">
          <Select>
            <SelectTrigger>
              <Text className="text-foreground">{sortBy!.label}</Text>
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem
                  key={option!.value}
                  value={option!.value}
                  label={option!.label}
                  onPress={() => handleSortChange(option!.value)}
                >
                  <Text>
                    {option!.label}
                  </Text>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </View>
      </View>

      (
      <CarList
        layout="vertical"
        options={options}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        showViewAll={false}
        containerClassName="px-4 mb-20"
      />
      )
    </View>
  );
}