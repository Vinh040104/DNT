import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
//bước 1: import
import { MyTheme, useTheme } from './Component/MyTheme/MyTheme'


const App = () => {
 //B2: return cấu trúc theme
 return (
   <MyTheme>
     {/* Khu vực này là nội dung của ứng dụng */}
     <BodyApp/>
   </MyTheme>
 )
}


const BodyApp = ()=>{
 // sử dụng hook để thao tác với theme
 const {theme, toggleTheme } = useTheme();
 return(
     <View style={[st.khung, {backgroundColor: theme==='light'?'#fff':'#000'}]}>
         <Text style={{color: theme==='light'?'#000':'#fff'}}>
           Demo theme</Text>


         <Button title='Đổi giao diện' onPress={toggleTheme} />
     </View>
 );
}




export default App


const st = StyleSheet.create({
 khung:{
   height: 100,
   borderWidth: 1,
   borderColor: 'red'
 }
})
