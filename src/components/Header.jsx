import React from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity } from 'react-native';

const options = ["Pomodoro", "Short Break", "Long Break"]

export default function Header({setTime, setCurrentTime, currentTime}) {  
  
    const handlePress = (index)=>{
        const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
        setCurrentTime(index)
        setTime(newTime * 60)
    } 
  
    return (
    <View style={{flexDirection: "row"}}>
        {options.map((item, index)=>(
            <TouchableOpacity  
                onPress={()=>handlePress(index)} 
                key={(index)}
                style={[style.itemStyle,
                currentTime !== index && {borderColor:'transparent'}
                ]}
            >

                <Text style={{fontWeight:'bold'}}>{item}</Text>
            </TouchableOpacity>
        ))}
    </View>
  )
}
const style = StyleSheet.create({
    itemStyle:{
        width:"33%",
        alignItems:'center',
        borderWidth:3,
        padding:5,
        borderRadius:10,
        borderColor:"white",
        marginVertical:20

    }
})

