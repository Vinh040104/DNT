import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, Button, TextInput, Alert, Modal, TouchableOpacity, Image, StatusBar } from 'react-native';

const Lab2 = () => {
    const [todos, setTodos] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [updateModalVisible, setUpdateModalVisible] = useState(false);

    const completedCount = todos.filter(todo => todo.completed).length;
    const uncompletedCount = todos.length - completedCount;

    useEffect(() => {
        const getDataToDo = async () => {
            try {
                const res = await axios.get('https://6686dc6783c983911b03e4b3.mockapi.io/Todo');
                setTodos(res.data);
                setIsLoading(false);
            } catch (err) {
                console.log('error', err);
                setIsLoading(false);
            }
        };
        getDataToDo();
    }, []);

    const addTodo = async () => {
        if (newTitle.trim() === '' || newContent.trim() === '') {
            alert('Tiêu đề và nội dung không được để trống.');
            return;
        }
        const newTodo = {
            title: newTitle,
            content: newContent,
            completed: false
        };
        const res = await axios.post('https://6686dc6783c983911b03e4b3.mockapi.io/Todo', newTodo);
        setTodos([...todos, res.data]);
        setNewTitle('');
        setNewContent('');
        setAddModalVisible(false);
    };

    const deleteTodo = async (task) => {
        Alert.alert('Confirm Dialog', `Bạn có muốn xóa Task ${task.title} không ?`, [
            {
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'OK',
                onPress: async () => {
                    try {
                        await axios.delete(`https://6686dc6783c983911b03e4b3.mockapi.io/Todo/${task.id}`);
                        Alert.alert('Success', 'Task deleted successfully');
                        setTodos(todos.filter(todo => todo.id !== task.id));
                        setModalVisible(false)
                    } catch (err) {
                        console.log('Error deleting task: ', err);
                    }
                }
            }
        ]);
    };

    // const editTodo = (id) => {
    //     const todo = todos.find(todo => todo.id === id);
    //     setNewTitle(todo.title);
    //     setNewContent(todo.content);
    //     setEditingId(id);
    // };

    const updateTodo = async () => {
        const updatedTodo = {
            title: newTitle,
            content: newContent,
        };
        const res = await axios.put(`https://6686dc6783c983911b03e4b3.mockapi.io/Todo/${editingId}`, updatedTodo);
        setTodos(todos.map(todo => (todo.id === editingId ? res.data : todo)));
        setNewTitle('');
        setNewContent('');
        setEditingId(null);
        setUpdateModalVisible(false);
    };

    const toggleTodo = async (id) => {
        const todo = todos.find(todo => todo.id === id);
        const updatedTodo = { ...todo, completed: !todo.completed };
        const res = await axios.put(`https://6686dc6783c983911b03e4b3.mockapi.io/Todo/${id}`, updatedTodo);
        setTodos(todos.map(todo => (todo.id === id ? res.data : todo)));
    };

    const openModal = (item) => {
        setSelectedTodo(item);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedTodo(null);
    };

    const handleLongPress = (item) => {
        setNewTitle(item.title);
        setNewContent(item.content);
        setEditingId(item.id);
        setUpdateModalVisible(true);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={{ marginTop: 10 }} onPress={() => openModal(item)} onLongPress={() => handleLongPress(item)}>
            <View style={styles.todoItem}>
                <Text style={styles.todoId}>{item.id}</Text>
                <Text style={[styles.todoTitle, item.completed && styles.completed]}>{item.title}</Text>
                <TouchableOpacity onPress={() => toggleTodo(item.id)}>
                    <Image source={item.completed ? require('../icon/checked.png') : require('../icon/dry-clean.png')} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
            <Text style={styles.header}>Todo List</Text>
            <Text style={styles.counter}>Completed: {completedCount} / Uncompleted: {uncompletedCount}</Text>
            <FlatList
                data={todos}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setAddModalVisible(true)}
            >
                <Text style={{ fontSize: 40 }}>+</Text>
            </TouchableOpacity>
            {selectedTodo && (
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalView}>
                        <View style={styles.modalBlock}>
                            <Text style={styles.modalTitle}>{selectedTodo.title}</Text>
                            <View style={{ backgroundColor: 'rgba(239, 210, 156, 0.55)', borderRadius: 20, borderWidth: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                                <Text style={styles.modalContent}>Content: {selectedTodo.content}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                <TouchableOpacity style={styles.btnTask} onPress={closeModal} >
                                    <Text style={styles.btnText}>Close</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btnTask} onPress={() => deleteTodo(selectedTodo)} >
                                    <Text style={styles.btnText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
            <Modal
                animationType="slide"
                transparent={true}
                visible={addModalVisible}
                onRequestClose={() => setAddModalVisible(false)}
            >
                <View style={styles.modalViewAdd}>
                    <View style={styles.modalBlockAdd}>
                        <Text style={styles.modalTitle}>Add New Task</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            value={newTitle}
                            onChangeText={setNewTitle}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Content"
                            value={newContent}
                            onChangeText={setNewContent}
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={addTodo} style={styles.btnTask}>
                                <Text style={styles.btnText}>Add Task</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnTask} onPress={() => setAddModalVisible(false)} >
                                <Text style={styles.btnText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={updateModalVisible}
                onRequestClose={() => setUpdateModalVisible(false)}
            >
                <View style={styles.modalViewAdd}>
                    <View style={styles.modalBlockAdd}>
                        <Text style={styles.modalTitle}>Update Task</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            value={newTitle}
                            onChangeText={setNewTitle}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Content"
                            value={newContent}
                            onChangeText={setNewContent}
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={updateTodo} style={styles.btnTask}>
                                <Text style={styles.btnText}>Update Task</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnTask} onPress={() => setUpdateModalVisible(false)} >
                                <Text style={styles.btnText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default Lab2;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FEEFDD',
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    counter: {
        color: 'white',
        fontWeight: '700',
        padding: 5,
        backgroundColor: '#50b2c0',
        borderRadius: 10,
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        fontSize: 18,
        width: '100%',
        elevation: 7
    },
    todoItem: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 15,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 10,
        marginBottom: 10,
    },
    todoTitle: {
        flex: 2,
        fontSize: 18,
        fontWeight: 'bold',
    },
    todoId: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginEnd: 10,
        backgroundColor: 'coral',
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
    },
    completed: {
        textDecorationLine: 'line-through',
        color: 'red',
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalViewAdd: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    modalBlock: {
        width: '70%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalBlockAdd: {
        borderWidth: 1,
        width: '100%',
        backgroundColor: '#d7f9fa',
        padding: 20,
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
    },
    modalContent: {
        fontWeight: '700',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    addButton: {
        width: 50,
        borderRadius: 20,
        alignItems: 'center',
        backgroundColor: '#FAAA8D',
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    btnTask: {
        backgroundColor: '#fff',
        padding: 10,
        marginEnd: 10,
        elevation: 7,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
    },
    btnText: {
        fontWeight: '700'
    }
});
