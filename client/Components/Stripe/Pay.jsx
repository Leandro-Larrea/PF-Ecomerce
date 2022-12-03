import { useStripe } from '@stripe/stripe-react-native'
import React, { useState } from 'react'
import { View, TextInput, Button, Alert } from 'react-native'

export const Pay = () => {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const stripe = useStripe();
  /* 192.168.100.32 */
  const subscribe = async () => {
    try {
      const response = await fetch('http://192.168.100.32:3001/payments/pay',{
        method: 'POST',
        body: JSON.stringify({name, lastname}), 
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      console.log("response", response);
      if (!response.ok) return Alert.alert(data.message + ' aca');
      const clientSecret = data.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'Papitas',
      });
      if (initSheet.error) return Alert.alert(initSheet.error.message + 'aca')
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret
      })
      if (presentSheet.error) return Alert.alert(presentSheet.error.message + ' aca si')
      Alert.alert('Payment Complete, thank you!');
    } catch (err) {
      console.log("data");
      console.error(err + 'fail aca');
      Alert.alert("Fail, try again")
    }
  }


  return (
    <View>
      <TextInput value={name} onChangeText={text => setName(text)} placeholder="Name..."
       style={{ width: 300, fontSize: 20, padding: 10, borderWidth: 1 }}
       /> 
       <TextInput value={lastname} onChangeText={text => setLastname(text)} placeholder="LastName..."
       style={{ width: 300, fontSize: 20, padding: 10, borderWidth: 1 }}
       /> 
       <Button title="Pay Now" onPress={subscribe} ></Button>
    </View>
  )
}