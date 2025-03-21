import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { AuthProvider } from '@/contexts/authContext';
import { Presentation } from 'phosphor-react-native';
import { spacingY } from '@/constants/theme';

const StackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="(modals)/profileModal"
        options={{ 
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="(modals)/walletModal"
        options={{ 
          presentation: "modal",
        }}
      />
    </Stack>
  );
  
};

export default function RootLayout(){
  return(
    <AuthProvider>
      <StackLayout/>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({

})