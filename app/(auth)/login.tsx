import * as React from 'react';
import { View, Image, Dimensions, ScrollView, TextInput, Platform } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Eye, EyeOff } from 'lucide-react-native';
import { iconWithClassName } from '~/lib/icons/iconWithClassName';
import Animated, { FadeInDown, FadeInUp, FadeOut } from 'react-native-reanimated';
import { Label } from '@rn-primitives/select';
import { cn } from '~/lib/utils';
import { useColorScheme } from '~/lib/useColorScheme';
import { Separator } from '~/components/ui/separator';
import { Loading } from '~/components/Loading';
import { useAuth } from '~/hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '~/types/NavigationProps';

[Eye, EyeOff].forEach((e) => iconWithClassName(e));

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const navigator = useNavigation<NavigationProps>();
  const [loginId, setLoginId] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loginIdError, setLoginIdError] = React.useState<(err: string | null) => void>();
  const [passwordError, setPasswordError] = React.useState<(err: string | null) => void>();
  const { login, isLoading } = useAuth();
  const { colorScheme } = useColorScheme();
  const [loading, setIsLoading] = React.useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      let valid = true;
      if (!loginId) {
        valid = false;
        loginIdError?.('Please fill in the username or email');
      }
      if (!password) {
        valid = false;
        passwordError?.('Please fill in the password');
      }
      if (!valid) return;

      let success = await login(loginId, password);
      if (!success) {
        loginIdError?.('Wrong username or password');
        return;
      }

      if (navigator.canGoBack()) {
        navigator.goBack();
      } else {
        navigator.navigate('HomeScreen');
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonStyle = 'flex-1 native:h-[4rem] rounded-xl';

  return (
    <View className="justify-center">
      <FormInput
        label="Username or email address"
        placeholder="Your username or email"
        setError={(register) => setLoginIdError(() => register)}
        onChange={(text) => setLoginId(text)}
      />
      <FormInput
        label="Password"
        placeholder="Password"
        setError={(register) => setPasswordError(() => register)}
        onChange={(text) => setPassword(text)}
        isPassword={true}
      />

      <View className="h-1" />

      <Button className="self-end m-0 p-0" variant="ghost">
        <Text>Forgot password?</Text>
      </Button>

      <View className="h-8" />

      <Button
        className={cn('rounded-xl native:h-[4rem]', loading ? 'bg-muted native:pb-5' : 'bg-primary')}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? <Loading /> : <Text className="font-[800]">Sign in</Text>}
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
          Or Login with
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

interface FormInputProps {
  label: string;
  placeholder?: string;
  isPassword?: boolean;
  setError?: (fn: (error: string | null) => void) => void;
  onChange?: (text: string) => void;
}

export function FormInput({
  label,
  placeholder,
  isPassword = false,
  onChange,
  setError,
}: FormInputProps) {
  const inputRef = React.useRef<TextInput>(null);
  const [value, setValue] = React.useState<string>('');
  const [err, setErr] = React.useState<string | null>(null);
  const [showPassword, setShowPassword] = React.useState(false);

  React.useEffect(() => {
    if (setError) {
      setError(setErr);
    }
  }, [setError]);

  function handleOnLabelPress() {
    if (!inputRef.current) {
      return;
    }
    if (inputRef.current.isFocused()) {
      inputRef.current?.blur();
    } else {
      inputRef.current?.focus();
    }
  }

  function onChangeText(text: string) {
    if (err) {
      setErr(null);
    }
    onChange && onChange(text);
    setValue(text);
  }

  return (
    <ScrollView>
      <View className="h-5" />
      <Label
        className={cn(
          err ? 'text-destructive' : 'text-primary',
          'pb-2 native:pb-1 pl-0.5',
          'font-[600]'
        )}
        nativeID="inputLabel"
        onPress={handleOnLabelPress}
      >
        {label}
      </Label>
      <View className="relative">
        <Input
          className={cn(
            'native:h-[4rem] pl-4 mt-1',
            isPassword ? 'pr-12' : '' // Add padding for password icon
          )}
          ref={inputRef}
          placeholder={placeholder ?? ''}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPassword && !showPassword}
          aria-labelledby="inputLabel"
          aria-errormessage="inputError"
        />
        {isPassword && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff size={20} className="text-muted-foreground" />
            ) : (
              <Eye size={20} className="text-muted-foreground" />
            )}
          </Button>
        )}
      </View>
      {err && <ErrorMessage msg={err} />}
      <View className="h-2" />
    </ScrollView>
  );
}

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