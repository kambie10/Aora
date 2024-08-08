import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'

import { images } from '../../constants'
import FormField from '../../components/FormField'
import CutomeButton from '../../components/CutomeButton'

import { getCurrentUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const { setUser } = useGlobalContext()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async() => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill all the fields')
    }
    setIsSubmitting(true)
    try {
      await signIn(form.email, form.password)
      const currentUser = await getCurrentUser()
      setUser(currentUser)
      setIsLoggedIn(true)

      Alert.alert('Success', 'You are now logged in')
      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />

          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Sign in to your account
          </Text>

          <FormField
            title="Email"
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
            otherStyle="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            onChangeText={(text) => setForm({ ...form, password: text })}
            otherStyle="mt-7"
          />

          <CutomeButton
            title="Sign In"
            handlePress={handleSubmit}
            containerStyle="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Don't have an account?</Text>
            <Link href="/sign-up" className="text-lg font-psemibold text-secondary">Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn