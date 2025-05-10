import * as React from 'react';
import { View, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Card } from '~/components/ui/card';
import { Mail, Lock, Eye, EyeOff, ChevronLeft, User, Activity } from 'lucide-react-native';
import { iconWithClassName } from '~/lib/icons/iconWithClassName';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { FormInput } from './login';
import { Separator } from '~/components/ui/separator';
import { useColorScheme } from '~/lib/useColorScheme';
import { cn } from '~/lib/utils';
import { Label } from '~/components/ui/label';
import { Checkbox } from '~/components/ui/checkbox';
import { Loading } from '~/components/Loading';

// Register icons with NativeWind
[Mail, Lock, Eye, EyeOff, ChevronLeft, User].forEach(iconWithClassName);

export default function SignupScreen() {
  const router = useRouter();
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const { colorScheme } = useColorScheme();

  const handleSignup = async () => {
    try {
      setIsLoading(true);
      // TODO: Implement actual signup logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      router.replace('/');
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = 
    email.length > 0 && 
    password.length > 0;

  const buttonStyle = 'flex-1 native:h-[4rem] rounded-xl';

  return (
    <View className="justify-center">
      <FormInput
        label='Username'
        placeholder='Your username'
        onChange={(text) => (text)}
      />
      <FormInput
        label='Email'
        placeholder='example@gmail.com'
        onChange={(text) => setEmail(text)}
      />
      <FormInput
        label='Create a password'
        placeholder='must be 8 characters'
        isPassword={true}
      />

      <View className='h-5'/>

      <View className='flex-row ml-3 gap-3 items-center'>
        <Checkbox aria-labelledby='terms' checked={checked} onCheckedChange={setChecked} />
        <Label className='font-[800]' nativeID='terms' onPress={() => setChecked((prev) => !prev)}>
          I accept the terms and privacy policy
        </Label>
      </View>

      <View className='h-8' />

      <Button className={cn('rounded-xl native:h-[4rem]', isLoading ? 'bg-muted native:pb-5': 'bg-primary')}>
        {isLoading
          ? <Loading/>
          : <Text className='font-[600]'>Register</Text>
        }
      </Button>

      <View className='h-10' />

      <View className='relative justify-center'>
        <Separator className='h-[1.5px]' />
        <Text className={cn('absolute px-2 self-center',
          colorScheme === 'dark' ? "bg-black" : "bg-white"
        )}>Or Register with</Text>
      </View>

      <View className='h-10' />

      <View className='flex-row gap-x-3'>
        <Button className={buttonStyle} variant="outline">
          <Image
            source={require("~/assets/images/facebook.png")}
            style={{
              width: 20,
              height: 20,
            }}
          />
        </Button>

        <Button className={buttonStyle} variant="outline">
          <Image
            source={require("~/assets/images/google.png")}
            style={{
              width: 20,
              height: 20,
            }}
          />
        </Button>

        <Button className={buttonStyle} variant="outline">
          <Image
            source={require("~/assets/images/apple.png")}
            style={{
              width: 20,
              height: 20,
              tintColor: colorScheme === "dark" ? "#fff" : "#000"
            }}
          />
        </Button>
      </View>
    </View>
  );
}