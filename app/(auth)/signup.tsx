import * as React from 'react';
import { View, Image, ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { Mail, Lock, Eye, EyeOff, ChevronLeft, User } from 'lucide-react-native';
import { iconWithClassName } from '~/lib/icons/iconWithClassName';
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';
import { FormInput } from './login'; // Assumed to be the same as in LoginScreen
import { Separator } from '~/components/ui/separator';
import { useColorScheme } from '~/lib/useColorScheme';
import { cn } from '~/lib/utils';
import { Label } from '~/components/ui/label';
import { Checkbox } from '~/components/ui/checkbox';
import { Loading } from '~/components/Loading';
import { useAuth } from '~/hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '~/types/NavigationProps';

// Register icons with NativeWind
[Mail, Lock, Eye, EyeOff, ChevronLeft, User].forEach(iconWithClassName);

export default function SignupScreen() {
  const navigator = useNavigation<NavigationProps>();
  const { register } = useAuth();

  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [usernameError, setUsernameError] = React.useState<(err: string | null) => void>();
  const [emailError, setEmailError] = React.useState<(err: string | null) => void>();
  const [passwordError, setPasswordError] = React.useState<(err: string | null) => void>();
  const [termsError, setTermsError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const { colorScheme } = useColorScheme();

  const validateInputs = () => {
    let valid = true;

    // Username validation
    if (!username) {
      usernameError?.('Username is required');
      valid = false;
    } else if (username.length < 3) {
      usernameError?.('Username must be at least 3 characters');
      valid = false;
    } else if (username.length > 20) {
      usernameError?.('Username cannot exceed 20 characters');
      valid = false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      usernameError?.('Username can only contain letters, numbers, and underscores');
      valid = false;
    } else {
      usernameError?.(null);
    }

    // Email validation
    if (!email) {
      emailError?.('Email is required');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailError?.('Please enter a valid email address');
      valid = false;
    } else {
      emailError?.(null);
    }

    // Password validation
    if (!password) {
      passwordError?.('Password is required');
      valid = false;
    } else if (password.length < 8) {
      passwordError?.('Password must be at least 8 characters');
      valid = false;
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
      passwordError?.(
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      );
      valid = false;
    } else {
      passwordError?.(null);
    }

    // Terms checkbox validation
    if (!checked) {
      setTermsError('You must accept the terms and privacy policy');
      valid = false;
    } else {
      setTermsError(null);
    }

    return valid;
  };

  const handleSignup = async () => {
    try {
      setIsLoading(true);

      // Validate inputs
      if (!validateInputs()) {
        return;
      }

      // Call register API
      await register({ name: null, username, email, password });

      // Navigate on success
      if (navigator.canGoBack()) {
        navigator.goBack();
      } else {
        navigator.navigate('HomeScreen');
      }
    } catch (error) {
      console.error('Signup failed:', error);
      // Optionally set a general error
      Alert.alert('Signup Failed', 'An error occurred during signup. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const buttonStyle = 'flex-1 native:h-[4rem] rounded-xl';

  return (
    <View className="justify-center">
      <FormInput
        label="Username"
        placeholder="Your username"
        setError={(register) => setUsernameError(() => register)}
        onChange={(text) => setUsername(text)}
      />
      <FormInput
        label="Email"
        placeholder="example@gmail.com"
        setError={(register) => setEmailError(() => register)}
        onChange={(text) => setEmail(text)}
      />
      <FormInput
        label="Create a password"
        placeholder="must be 8 characters"
        setError={(register) => setPasswordError(() => register)}
        onChange={(text) => setPassword(text)}
        isPassword={true}
      />

      <View className="h-5" />

      <View className="flex-row ml-3 gap-3 items-center">
        <Checkbox aria-labelledby="terms" checked={checked} onCheckedChange={setChecked} />
        <Label
          className="font-[800]"
          nativeID="terms"
          onPress={() => setChecked((prev) => !prev)}
        >
          I accept the terms and privacy policy
        </Label>
      </View>
      {termsError && <ErrorMessage msg={termsError} />}

      <View className="h-8" />

      <Button
        className={cn('rounded-xl native:h-[4rem]', isLoading ? 'bg-muted native:pb-5' : 'bg-primary')}
        onPress={handleSignup}
        disabled={isLoading}
      >
        {isLoading ? <Loading /> : <Text className="font-[800]">Register</Text>}
      </Button>

      <View className="h-10" />

      <View className="relative justify-center">
        <Separator className="h-[1.5px]" />
        <Text
          className={cn(
            'absolute px-2 self-center',
            colorScheme === 'dark' ? 'bg-black' : 'bg-white'
          )}
        >
          Or Register with
        </Text>
      </View>

      <View className="h-10" />

      <View className="flex-row gap-x-3">
        <Button className={buttonStyle} variant="outline">
          <Image
            source={require('~/assets/images/facebook.png')}
            style={{
              width: 20,
              height: 20,
            }}
          />
        </Button>

        <Button className={buttonStyle} variant="outline">
          <Image
            source={require('~/assets/images/google.png')}
            style={{
              width: 20,
              height: 20,
            }}
          />
        </Button>

        <Button className={buttonStyle} variant="outline">
          <Image
            source={require('~/assets/images/apple.png')}
            style={{
              width: 20,
              height: 20,
              tintColor: colorScheme === 'dark' ? '#fff' : '#000',
            }}
          />
        </Button>
      </View>
    </View>
  );
}

// Reusing ErrorMessage from LoginScreen
export function ErrorMessage({ msg }: { msg: string }) {
  return (
    <Animated.Text
      entering={FadeInDown}
      exiting={FadeOut.duration(275)}
      className="text-destructive text-sm native:px-1 py-1.5"
      aria-invalid="true"
      id="inputError"
    >
      {msg}
    </Animated.Text>
  );
}