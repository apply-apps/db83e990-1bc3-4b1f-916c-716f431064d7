// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Button, ScrollView, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';

const API_URL = 'http://apihub.p.appply.xyz:3300/chatgpt';

export default function App() {
    const [hero, setHero] = useState('');
    const [villain, setVillain] = useState('');
    const [plot, setPlot] = useState('');
    const [story, setStory] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchStory = async () => {
        setLoading(true);
        try {
            const response = await axios.post(API_URL, {
                messages: [
                    { role: "system", content: "You are a helpful assistant. Please provide answers for given requests." },
                    {
                        role: "user",
                        content: `Generate a fairy tale with the hero ${hero}, the villain ${villain}, and the plot ${plot}.`
                    }
                ],
                model: "gpt-4o"
            });
            const { data } = response;
            setStory(data.response);
        } catch (error) {
            console.error("Error fetching story:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Fairy Tale Generator</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Hero"
                value={hero}
                onChangeText={(text) => setHero(text)}
                placeholderTextColor="#BFA2DB"
            />
            <TextInput
                style={styles.input}
                placeholder="Enter Villain"
                value={villain}
                onChangeText={(text) => setVillain(text)}
                placeholderTextColor="#BFA2DB"
            />
            <TextInput
                style={styles.input}
                placeholder="Enter Plot"
                value={plot}
                onChangeText={(text) => setPlot(text)}
                placeholderTextColor="#BFA2DB"
            />
            <Button
                title="Generate Tale"
                onPress={fetchStory}
                color="#6A0572"
            />

            {loading ? (
                <ActivityIndicator style={styles.loader} size="large" color="#6A0572" />
            ) : (
                <ScrollView style={styles.storyContainer}>
                    <Text style={styles.storyText}>{story}</Text>
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 16,
        backgroundColor: '#1D1B27',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#E0B0FF',
    },
    input: {
        height: 40,
        borderColor: '#6A0572',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 8,
        color: '#E0B0FF',
    },
    storyContainer: {
        marginTop: 20,
    },
    storyText: {
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'left',
        color: '#E0B0FF',
    },
    loader: {
        marginTop: 20,
    }
});