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

[Eye, EyeOff].forEach(e => iconWithClassName(e))

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const loading = false
  const { colorScheme } = useColorScheme();
  // const [password, setPassword] = React.useState('');
  // const [showPassword, setShowPassword] = React.useState(false);
  // const [isLoading, setIsLoading] = React.useState(false);

  // const handleLogin = async () => {
  //   try {
  //     setIsLoading(true);
  //     // TODO: Implement actual login logic here
  //     await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
  //     router.replace('/');
  //   } catch (error) {
  //     console.error('Login failed:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const buttonStyle = 'flex-1 native:h-[4rem] rounded-xl';

  return (
    <View className="justify-center">
      <FormInput
        label='Username or email address'
        placeholder='Your username or email'
        onChange={(text) => setEmail(text)}
      />
      <FormInput
        label='Password'
        placeholder='Password'
        isPassword={true}
      />

      <View className='h-1'/>

      <Button className='self-end m-0 p-0' variant="ghost">
        <Text>Forgot password?</Text>
      </Button>

      <View className='h-8'/>

      <Button className={cn('rounded-xl native:h-[4rem]', loading ? 'bg-muted native:pb-5': 'bg-primary')}>
        {loading
          ? <Loading/>
          : <Text className='font-[600]'>Register</Text>
        }
      </Button>

      <View className='h-10'/>

      <View className='relative justify-center'>
        <Separator className='h-[1.5px]'/>
        <Text className={cn('absolute px-2 self-center',
          colorScheme === 'dark' ? "bg-black" : "bg-white"
        )}>Or Login with</Text>
      </View>

      <View className='h-10'/>

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
              tintColor: colorScheme === "dark" ? "#fff": "#000"
            }}
          />
        </Button>
      </View>

      {/* <Animated.View entering={FadeInDown.delay(400).springify()}>
        <Card className="p-6 gap-y-6 bg-card/50">
          <View className="gap-y-4">
            <View className="gap-y-2">
              <Text className="text-sm font-medium">Username</Text>
              <View className="relative flex-row">
                <View className="relative justify-center border border-muted border-r-0 pl-2 pr-[-2]">
                  <Mail size={20} className="text-muted-foreground " />
                </View>
                <Input
                  placeholder="Enter your username or email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  className="h-12 border-l-0 flex-1"
                />
              </View>
            </View>

            <View className="gap-y-2">
              <Text className="text-sm font-medium">Password</Text>
              <View className="relative">
                <View className="absolute left-3 h-full justify-center">
                  <Lock size={20} className="text-muted-foreground" />
                </View>
                <Input
                  placeholder="Enter your password"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  className="h-12"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 h-full"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={20} className="text-muted-foreground" />
                  ) : (
                    <Eye size={20} className="text-muted-foreground" />
                  )}
                </Button>
              </View>
              <Button variant="link" className="p-0 self-end">
                <Text className="text-sm text-primary">Forgot Password?</Text>
              </Button>
            </View>
          </View>

          <Button
            className="w-full h-12 mt-2"
            onPress={handleLogin}
            disabled={isLoading || !email || !password}
          >
            <Text className="text-primary-foreground font-semibold text-base">
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Text>
          </Button>
        </Card>
      </Animated.View>

      <Animated.View
        className="flex-row justify-center mt-8"
        entering={FadeInUp.delay(600).springify()}
      >
        <Text className="text-muted-foreground">Don't have an account? </Text>
        <Link href="/signup" asChild>
          <Button variant="link" className="p-0">
            <Text className="text-primary font-semibold">Sign Up</Text>
          </Button>
        </Link>
      </Animated.View> */}
    </View>
  );
}

interface FormInputProps {
  label: string,
  placeholder?: string,
  isPassword?: boolean
  onChange?: (text: string) => void
}

export function FormInput({ label, placeholder, isPassword = false, onChange }: FormInputProps) {
  const inputRef = React.useRef<TextInput>(null);
  const [value, setValue] = React.useState<string>('');
  const [err, setErr] = React.useState<string | null>(null);

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

  // function onSubmitEditing() {
  //   setErr(errorMsg);
  // }

  return (
    <>
      <View className='h-5' />
      <Label
        className={cn(err ? 'text-destructive' : 'text-primary', 'pb-2 native:pb-1 pl-0.5', 'font-[600]')}
        nativeID='inputLabel'
        onPress={handleOnLabelPress}
      >
        {label}
      </Label>
      <Input
        className='native:h-[4rem] pl-4 mt-1'
        ref={inputRef}
        placeholder={placeholder ?? ""}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPassword}
        // onSubmitEditing={onSubmitEditing}
        aria-labelledby='inputLabel'
        aria-errormessage='inputError'
      />
      {err && <ErrorMessage msg={err} />}
      <View className='h-2' />
    </>
  )
}

export function ErrorMessage({ msg }: { msg: string }) {
  return (
    <Animated.Text
      entering={FadeInDown}
      exiting={FadeOut.duration(275)}
      className='text-destructive text-sm native:px-1 py-1.5'
      aria-invalid='true'
      id='inputError'
    >
      {msg}
    </Animated.Text>
  );
}