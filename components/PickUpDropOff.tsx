import * as React from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { Text } from './ui/text';
import { Card } from './ui/card';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  type Option,
} from './ui/select';
import { MapPin, Calendar, Clock, ArrowRightCircle } from 'lucide-react-native';
import { cn } from '~/lib/utils';

const LOCATIONS: Option[] = [
  { value: "jakarta", label: "Jakarta" },
  { value: "bandung", label: "Bandung" },
  { value: "surabaya", label: "Surabaya" },
  { value: "yogyakarta", label: "Yogyakarta" },
  { value: "semarang", label: "Semarang" }
];

const TIMES: Option[] = [
  { value: "07:00", label: "07:00" },
  { value: "08:00", label: "08:00" },
  { value: "09:00", label: "09:00" },
  { value: "10:00", label: "10:00" },
  { value: "11:00", label: "11:00" },
  { value: "12:00", label: "12:00" },
  { value: "13:00", label: "13:00" },
  { value: "14:00", label: "14:00" },
  { value: "15:00", label: "15:00" },
  { value: "16:00", label: "16:00" },
  { value: "17:00", label: "17:00" },
  { value: "18:00", label: "18:00" },
];

interface RentalSectionProps {
  title: string;
  isPickup?: boolean;
  location?: Option;
  date?: Option;
  time?: Option;
  onLocationChange?: (option: Option) => void;
  onDateChange?: (option: Option) => void;
  onTimeChange?: (option: Option) => void;
}

interface pick {
  title: string;
  isPickup?: boolean;
  location?: Option;
  date?: Option;
  time?: Option;
  onLocationChange?: (option: Option) => void;
  onDateChange?: (option: Option) => void;
  onTimeChange?: (option: Option) => void;
}

function RentalSection({ 
  title,
  isPickup = false,
  location,
  date,
  time,
  onLocationChange,
  onDateChange,
  onTimeChange
}: RentalSectionProps) {
  const accentColor = isPickup ? "#2563eb" : "#7c3aed";
  const borderColor = "border-border";
  
  // Format the selected date nicely if available
  const formatSelectedDate = () => {
    if (!date?.value) return null;
    const selectedDate = new Date(date.value);
    return selectedDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className={cn("p-4 border rounded-xl", borderColor)}>
      <View className="flex-row items-center mb-4">
        <View className={cn("h-10 w-10 rounded-full items-center justify-center mr-3", "")}>
          {isPickup ? 
            <MapPin size={18} color={accentColor} /> :
            <MapPin size={18} color={accentColor} />
          }
        </View>
        <Text className="text-lg font-semibold">{title}</Text>
      </View>
      
      <View className="gap-y-5">
        {/* Location Selector */}
        <View className="space-y-2">
          <View className="flex-row items-center mb-1">
            <MapPin size={16} color="#64748b" />
            <Text className="text-sm text-gray-500 ml-2">Location</Text>
          </View>
          <Select 
            value={location}
            onValueChange={onLocationChange}
          >
            <SelectTrigger className="border bg-accent rounded-lg p-3">
              {location ? (
                <Text className="font-medium">{location.label}</Text>
              ) : (
                <Text className="text-gray-400">Select city</Text>
              )}
            </SelectTrigger>
            <SelectContent className="rounded-lg w-[250px]">
              <ScrollView>
                {LOCATIONS.map((loc) => (
                  <SelectItem
                    key={loc!.value}
                    value={loc!.value}
                    label={loc!.label}
                    className="p-3"
                  >
                    <Text>{loc!.label}</Text>
                  </SelectItem>
                ))}
              </ScrollView>
            </SelectContent>
          </Select>
        </View>

        {/* Date Selector */}
        <View className="space-y-2">
          <View className="flex-row items-center mb-1">
            <Calendar size={16} color="#64748b" />
            <Text className="text-sm text-gray-500 ml-2">Date</Text>
          </View>
          <Select
            value={date}
            onValueChange={onDateChange}
          >
            <SelectTrigger className="border bg-accent rounded-lg p-3">
              {date ? (
                <Text className="font-medium">{formatSelectedDate()}</Text>
              ) : (
                <Text className="text-gray-400">Select date</Text>
              )}
            </SelectTrigger>
            <ScrollView>
              <SelectContent className="rounded-lg max-h-64">
                {[...Array(7)].map((_, i) => {
                  const currentDate = new Date();
                  currentDate.setDate(currentDate.getDate() + i);
                  const value = currentDate.toISOString().split('T')[0];
                  const label = currentDate.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  });
                  return (
                    <SelectItem
                      key={value}
                      value={value}
                      label={label}
                      className="p-3"
                    >
                      <Text>{label}</Text>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </ScrollView>
          </Select>
        </View>

        {/* Time Selector */}
        <View className="space-y-2">
          <View className="flex-row items-center mb-1">
            <Clock size={16} color="#64748b" />
            <Text className="text-sm text-gray-500 ml-2">Time</Text>
          </View>
          <Select
            value={time}
            onValueChange={onTimeChange}>
            <SelectTrigger className="border bg-accent rounded-lg p-3">
              {time ? (
                <Text className="font-medium">{time.label}</Text>
              ) : (
                <Text className="text-gray-400">Select time</Text>
              )}
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              {TIMES.map((timeOption) => (
                <SelectItem
                  key={timeOption!.value}
                  value={timeOption!.value}
                  label={timeOption!.label}
                  className="p-3"
                >
                  <Text>{timeOption!.label}</Text>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </View>
        <View className='h-1'/>
      </View>


      {/* Summary section - shows when all options are selected */}
      {location && date && time && (
        <View className={cn("px-3 rounded-lg", "")}>
          <Text className="font-medium" style={{ color: accentColor }}>
            {location.label}, {formatSelectedDate()} at {time.label}
          </Text>
        </View>
      )}
    </Card>
  );
}

export function PickUpDropOff({containerClassName} : {containerClassName?: string}) {
  const [pickUpLocation, setPickUpLocation] = React.useState<Option>();
  const [pickUpDate, setPickUpDate] = React.useState<Option>();
  const [pickUpTime, setPickUpTime] = React.useState<Option>();
  const [dropOffLocation, setDropOffLocation] = React.useState<Option>();
  const [dropOffDate, setDropOffDate] = React.useState<Option>();
  const [dropOffTime, setDropOffTime] = React.useState<Option>();

  // Function to swap pickup and dropoff locations
  const swapLocations = () => {
    const tempLocation = pickUpLocation;
    const tempDate = pickUpDate;
    const tempTime = pickUpTime;

    setPickUpLocation(dropOffLocation);
    setPickUpDate(dropOffDate);
    setPickUpTime(dropOffTime);

    setDropOffLocation(tempLocation);
    setDropOffDate(tempDate);
    setDropOffTime(tempTime);
  };

  // Check if all selections are made
  const isFormComplete = pickUpLocation && pickUpDate && pickUpTime &&
    dropOffLocation && dropOffDate && dropOffTime;

  return (
    <View className={cn("gap-y-4", containerClassName)}>
      <View className="gap-y-4">
        <RentalSection
          title="Pick-Up"
          isPickup={true}
          location={pickUpLocation}
          date={pickUpDate}
          time={pickUpTime}
          onLocationChange={setPickUpLocation}
          onDateChange={setPickUpDate}
          onTimeChange={setPickUpTime}
        />

        {/* Only show the swap button once some selections are made */}
        {(pickUpLocation || dropOffLocation) && (
          <View className="flex-row items-center justify-center content-center">
            <TouchableOpacity
              onPress={swapLocations}
              className="flex-row flex-1 items-center px-3 py-6 rounded-lg border border-gray-200"
            >
              <ArrowRightCircle size={18} color="#2563eb" />
              <Text className="text-primary font-medium ml-1 text-center">Swap</Text>
            </TouchableOpacity>
          </View>
        )}

        <RentalSection
          title="Drop-Off"
          isPickup={false}
          location={dropOffLocation}
          date={dropOffDate}
          time={dropOffTime}
          onLocationChange={setDropOffLocation}
          onDateChange={setDropOffDate}
          onTimeChange={setDropOffTime}
        />
      </View>
    </View>
  );
}