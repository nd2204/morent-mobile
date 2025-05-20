import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePicker, { DateType, useDefaultClassNames } from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { cn } from '~/lib/utils'; // Assuming a utility for classNames similar to the CarList component

// Define prop types
interface DateRangePickerProps {
  initialStartDate?: Date | null;
  initialEndDate?: Date | null;
  onChange?: (range: { startDate: DateType | null; endDate: DateType | null }) => void;
  minDate?: Date;
  maxDate?: Date;
  dateFormat?: string;
  containerClassName?: string;
  labelClassName?: string;
  buttonClassName?: string;
  disabled?: boolean;
}

// Reusable DateRangePicker component
export function DateRangePicker({
  initialStartDate = null,
  initialEndDate = null,
  onChange,
  minDate,
  maxDate,
  dateFormat = 'MM/DD/YYYY',
  containerClassName,
  labelClassName,
  buttonClassName,
  disabled = false,
}: DateRangePickerProps) {
  const [range, setRange] = useState<{
    startDate: DateType | null;
    endDate: DateType | null;
  }>({
    startDate: initialStartDate,
    endDate: initialEndDate,
  });
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  // Use default classNames from react-native-ui-datepicker and customize
  const defaultClassNames = useDefaultClassNames();
  const customClassNames = {
    ...defaultClassNames,
    container: cn(defaultClassNames.outside, 'bg-white rounded-lg p-4'),
    today: 'border-blue-500 border-2',
    selected: 'bg-blue-500 border-blue-500',
    selected_label: 'text-white',
    day: cn(defaultClassNames.day, 'hover:bg-blue-100'),
    disabled: 'opacity-50',
    range: 'bg-blue-100',
    rangeStart: 'bg-blue-500 border-blue-500',
    rangeEnd: 'bg-blue-500 border-blue-500',
  };

  // Handle date range changes
  const handleChange = useCallback(
    (params: { startDate: DateType; endDate: DateType}) => {
      const newRange = {
        startDate: params.startDate,
        endDate: params.endDate,
      };
      setRange(newRange);
      if (onChange) {
        onChange(newRange);
      }
    },
    [onChange]
  );

  // Toggle picker visibility
  const togglePicker = useCallback(() => {
    if (!disabled) {
      setIsPickerVisible(prev => !prev);
    }
  }, [disabled]);

  // Format date for display
  const formatDate = (date: DateType | null) => {
    if (!date) return 'Select date';
    return dayjs(date).format(dateFormat);
  };

  return (
    <View className={cn('w-full', containerClassName)}>
      {/* Display selected dates and trigger picker */}
      <TouchableOpacity
        onPress={togglePicker}
        disabled={disabled}
        className={cn(
          'flex-row justify-between items-center p-4 bg-gray-100 rounded-lg',
          disabled && 'opacity-50',
          buttonClassName
        )}
      >
        <View>
          <Text className={cn('text-sm text-gray-500', labelClassName)}>Start Date</Text>
          <Text className="text-base font-medium">
            {formatDate(range.startDate)}
          </Text>
        </View>
        <View>
          <Text className={cn('text-sm text-gray-500', labelClassName)}>End Date</Text>
          <Text className="text-base font-medium">
            {formatDate(range.endDate)}
          </Text>
        </View>

      </TouchableOpacity>

      {/* Date picker modal */}
      {isPickerVisible && (
        <View className="mt-2 bg-white rounded-lg shadow-md">
          <DateTimePicker
            mode="range"
            startDate={range.startDate}
            endDate={range.endDate}
            onChange={handleChange}
            minDate={minDate}
            maxDate={maxDate}
            classNames={customClassNames}
            timeZone="UTC"
            // calendarTextStyle={{ fontSize: 16 }}
            // headerButtonStyle={{ padding: 8 }}
            // selectedItemStyle={{ borderRadius: 8 }}
          />
          <TouchableOpacity
            onPress={togglePicker}
            className="p-4 bg-blue-500 rounded-b-lg"
          >
            <Text className="text-white text-center font-semibold">Done</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}