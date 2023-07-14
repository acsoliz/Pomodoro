import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView,TouchableOpacity } from 'react-native';
import Header from './src/components/Header';
import Timer from './src/components/Timer';
import {Audio} from 'expo-av';

const colors = ["#F7DC6F", '#A2D9CE','#D7BDE2'  ]

export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | 'SHORT' | 'BREAK');
  const [isActive, setIsActive] = useState(false);
  const [ endTimer, setEndTimer] = useState(false)

  useEffect(() => {
    let intervalId = null;
    
    if (endTimer){

      setEndTimer(false)
    }

    if (isActive){
      
      intervalId = setInterval(()=>{
        setTime(time-1)
      },1)
    }else{
      clearInterval(intervalId)
    }

    if (time === 0 ){
      setEndTimer(true)
      setIsActive(false)
      setIsWorking( (prevState) =>!prevState)

      setTime(isWorking ? 300 : 1500)
    }

    return ()=>clearInterval(intervalId)
  }, [isActive, time, endTimer])
  

  const handleStartStop =  () =>{
    playsound();
    setIsActive(!isActive);
  };

  const handleRestart = ()=>{
    setIsWorking(false);
    setTime()
    setIsActive(false)
    setEndTimer(false)
  }
  const playsound = async ()=>{
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/duck.mp3')
    )
    await sound.playAsync()
  };



  return (
    <SafeAreaView style={[styles.container, {backgroundColor:colors[currentTime]}]}>
      <View
        style={{
          flex:1,
          paddingHorizontal:15,
          // borderWidth: 3
        }}
      >
        <Text style={styles.text}>Pomodoro</Text>
        <Header 
          setTime={setTime}
          setCurrentTime ={setCurrentTime}
          currentTime={currentTime}
        />
        <Timer
          time={time}
          endTimer={endTimer}

        />
        <TouchableOpacity style={styles.button} onPress={handleStartStop}>
          <Text style={{color:'white', fontWeight:"bold"}}>
            {isActive ? "STOP" : "START"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleRestart}>
          <Text style={{color:'white', fontWeight:"bold"}}>
            {"RESTART"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#999',
    paddingTop:20
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',

  },
  button:{
    alignItems:'center',
    backgroundColor:'#333333',
    padding:15,
    marginTop:15,
    borderRadius:15
    
  }
});