import * as React from 'react';
import { View } from 'react-native';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Text } from '~/components/ui/text';
import LoginScreen from './login';
import SignupScreen from './signup';

export default function AuthLayout() {
  const [value, setValue] = React.useState('signin');
  return (
    <View className='flex-1 justify-center p-6'>
      <Tabs
        value={value}
        onValueChange={setValue}
        className='w-full max-w-[400px] mx-auto flex-col gap-10'
      >
        <Text className="text-[3rem] font-black text-center">MORENT</Text>
        <TabsList className='flex-row w-full rounded-2xl'>
          <TabsTrigger value='signin' className='flex-1 h-full rounded-xl'>
            <Text className="font-black">Sign In</Text>
          </TabsTrigger>
          <TabsTrigger value='register' className='flex-1 h-full rounded-xl'>
            <Text className="font-black">Register</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value='signin'>
          <LoginScreen/>
        </TabsContent>
        <TabsContent value='register'>
          <SignupScreen/>
        </TabsContent>
      </Tabs>
    </View>
  );
}