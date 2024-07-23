import React, { createContext, useState, useContext } from 'react'


// b1. khởi tạo context cho theme
const ThemeContext = createContext();
// nơi sử dụng theme sẽ dùng cấu trúc <MyTheme>......</MyTheme>
// phần ...... là thuộc tính children
// có export:
export const MyTheme = ({ children }) => {
    // b2. Tạo state để lưu trạng thái đang sử dụng mẫu theme nào
    const [theme, setTheme] = useState('light'); //VD 2 dạng: sáng/tối  (light/dark)
    // Viết hàm chuyển mẫu giao diện
    const toggleTheme = () => {
        console.log(" theme đang dùng: " + theme);
        setTheme(theme === 'light' ? 'dark' : 'light');
        console.log(" Đã chuyển sang theme: " + theme);
    }
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
// định nghĩa một hàm hook
export const useTheme = () => useContext(ThemeContext);
