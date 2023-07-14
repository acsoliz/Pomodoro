import React from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity,  } from 'react-native';

export default function Timer ({time, endTimer}) {
    console.log(endTimer)
    const formattedTime = `${Math.floor(time/60)
    .toString()
    .padStart(2, "0")}:${(time%60)
    .toString()
    .padStart(2, "0")}`

    return (
    <View style={[styles.container,
        endTimer && {backgroundColor:'black'}
        ]}>
        <Text style={styles.time}>{formattedTime}</Text>
    </View>
);
}

const styles = StyleSheet.create({
    container: {
        flex:0.3,
        backgroundColor: "#F2F2F2",
        // alignItems: 'center',
        justifyContent:'center',
        padding:15,
        borderRadius:15
    },
    time: {
        fontSize:80,
        fontWeight:'bold',
        textAlign:'center',
        color:'#333333'
    }
})

