import React from 'react';
import { KeyboardAvoidingView, Platform, StatusBar, StyleSheet, View } from 'react-native';
// KeyboardAvoidingView: sử dụng để tránh bị bàn phím che khuất giao diện
// disableAvoidStatusBar: sử dụng tránh bị statusbar đè lên nội dung
const Wrapper = ({ children, style, disableAvoidStatusBar = false, ...props }) => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.wrapper, style]}
            {...props}
        >
            {!disableAvoidStatusBar && <StatusBar barStyle="dark-content" backgroundColor="#61dafb" />}
            {children}
        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        padding: 10,
        margin: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        // Thêm các style mặc định khác nếu cần
    },
});
export default Wrapper;