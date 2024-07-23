import { StyleSheet, Text, View , TextInput, Button  } from 'react-native'
import React from 'react'
import Banner from './Component/Banner'
import CustomHeader from './Component/Header/CustomHeader'
import Section from './Component/Section/Section'

const App = () => {
  return (


    <View>
      <View>
        <Banner uri_img="https://i.imgur.com/gowMz8A.jpeg" title="ANh 1" />
        <Banner uri_img="https://i.imgur.com/m1cwuPa.jpeg" title="ANh 2" />
        <Banner uri_img="https://i.imgur.com/rWSUcdc.jpeg" title="ANh 3" />

      </View>

      <View>
        <CustomHeader title="My Title" onBackPress={() => console.log('Back clicked!')} />
        <CustomHeader title="My Title" onBackPress={() => console.log('Back clicked!')} />
        <CustomHeader title="My Title" onBackPress={() => console.log('Back clicked!')} />
        {/* Nội dung khác của Screen */}
      </View>


      
      
    </View>

  )
}

export default App

const styles = StyleSheet.create({

 });
 