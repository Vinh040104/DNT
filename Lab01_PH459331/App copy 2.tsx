import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import Section from './Component/Section/Section';
const App = () => {
 return (
   <View style={styles.container}>
     <Section title="Sản phẩm mới" style={{ backgroundColor: '#ffcccc' }}>
       <Text>Nội dung </Text>
       <TextInput
         placeholder="Nhập văn bản..."
         style={styles.textInput}
       />
       <Button title="Nút 1" onPress={() => {}} />
     </Section>
     <Section title="Sản phẩm bán chạy" style={{ backgroundColor: '#ccffcc' }}>
       <Text>Nội dung</Text>
       <TextInput
         placeholder="Nhập văn bản..."
         style={styles.textInput}
       />
       <Button title="Nút 2" onPress={() => {}} />
     </Section>
   </View>
 );
};


const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   padding: 20,
   backgroundColor: '#f0f0f0',
 },
 textInput: {
   height: 40,
   borderColor: 'gray',
   borderWidth: 1,
   marginBottom: 20,
   paddingHorizontal: 10,
   width: '100%',
 },
});


export default App;
