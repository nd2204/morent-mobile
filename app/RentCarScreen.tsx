import { View, Text } from 'react-native';
import { useState } from 'react';
import LocationLayout from '~/components/LocationLayout';

const RentCarScreen = () => {
  const [ snapPoints, setSnapPoints ] = useState([]);

  return (
    <LocationLayout
      title="Rent Detail"
      onLocationChange={() => {

      }}>
      <Text>Hello</Text>
    </LocationLayout>
  )
}

export default RentCarScreen;