// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Button, ScrollView, Text, ActivityIndicator, View } from 'react-native';
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
            />
            <TextInput
                style={styles.input}
                placeholder="Enter Villain"
                value={villain}
                onChangeText={(text) => setVillain(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter Plot"
                value={plot}
                onChangeText={(text) => setPlot(text)}
            />
            <Button title="Generate Tale" onPress={fetchStory} />

            {loading ? (
                <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
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
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#73639F',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 8,
    },
    storyContainer: {
        marginTop: 20,
    },
    storyText: {
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'left',
    },
    loader: {
        marginTop: 20,
    }
});