import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'




const App = () => {

  const [demo, setdemo] = useState({ title: 'demo dem', val: 0 });


  return (
    <View>
      <Text>App</Text>
      <Text>Title : {demo.title}</Text>
      <Text>Value: {demo.val}</Text>


      <Button title='Tang gia tri' onPress={() => {
        setdemo({ title: 'Đã bấm nút', val: demo.val + 1 });

      }}></Button>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})