import { View, Text, Image } from 'react-native'
import React from 'react'
import st from './style'


const index = ( { uri_img, title } ) => {
 return (
   <View style={st.khung}>
       <Image style={st.img} source={ {uri: uri_img }} />
       <Text style={st.title }>{title}</Text>
   </View>
 )
}
export default index
