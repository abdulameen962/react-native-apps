import { StatusBar } from 'expo-status-bar';
import { Text, View,ScrollView,Image,TextInput,ImageBackground, TouchableOpacity } from 'react-native';

import styles from './styles'
import {vibrate} from './utils'
import PropTypes from 'prop-types'
import React, { Component } from 'react';
import ProgressBar from './progressbaranimated'

import ControlBtn, {BottomButtons} from './components';

//hyper link images
// const image = {uri: 'https://'};

//local images
const localImg = require('./assets/background.png')
const timerWork = '00:10'
const timerRest = '05:00'

export default class App extends React.Component {
  constructor(){
    super()
    this.state = {
      timer: {
        time: timerWork,
        type: 'work',
        playing: false,
      }
    }
  }

  startTimer = (time) => {
    time = time.toString()
    let newTime = time
    newTime = newTime.split(':');
    mins = parseInt(newTime[0]) * 60
    secs = parseInt(newTime[1]) 
    secs = mins + secs + 1
    //convert to appropriate secs
    // secs = (parseInt(time[1]) / 10) * 60
    let currentTime = new Date;
    currentTime.setSeconds(currentTime.getSeconds() + secs)
    let timer = this.state.timer
    timer.playing = true

    this.TimeInterval = setInterval(() => {
      let currentT = new Date;
      let now = currentT.getTime()
      let countDown = currentTime.getTime()

      let diff = countDown - now;

      //now we are calculating time in days, hrs, minutes, and seconds.
      let days = Math.floor(diff / (1000 * 60 * 60 * 24));
      let hrs = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (minutes < 10) {
        minutes = `0${minutes}`;
      }

      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      let newTimer = `${minutes}:${seconds}`
      timer.time = newTimer
      this.setState(
        {
          timer: timer
        }
      )

      if (diff < 0) {
        clearInterval(this.TimeInterval);

        //ring the vibrate 5 times
        let num = 5;
        vibrate();
        const newInterval = setInterval(() => {
          if (num > 0) {
            num--;
            vibrate();          
          }
          else{
            clearInterval(newInterval);
          }
        }, 1000);
        timer = this.state.timer;
        timer.time = "00:00"; 
        this.setState(
          {
            timer: timer
          }
        )
      }

    }, 1000);

  }

  resetTimer = () => {
    let timer = this.state.timer;
    clearInterval(this.TimeInterval);
    timer.playing = false;
    if(timer.type == 'work'){
      //reset to regular time
      timer.time = timerWork;
    }
    else{
      timer.time = timerRest;
    }
    this.setState({
      timer: timer
    })
  }
  componentDidMount(){
    // this.startTimer('0:05');
  }

  componentWillUnmount(){
    clearInterval(this.TimeInterval)
  }

  pauseTimer(){
    timer = this.state.timer;
    timer.playing = false;
    this.setState({
      timer: timer
    });
    clearInterval(this.TimeInterval);
  }
  playTimer(){
    timer = this.state.timer;
    timer.playing = true;
    this.setState({
      timer: timer
    });
    this.startTimer(timer.time);
  }

  takeBreak = () => {
    //make the timer to timerest,reset the time then add it to be playing,then play it
    let timer = this.state.timer
    timer.type = 'break'
    this.setState({
      timer:timer
    })
    this.resetTimer();
    this.startTimer(this.state.timer.time);
  }

  startWork = () => {
    //make the timer to timeworkreset the time then add it to be playing,then play it
    let timer = this.state.timer
    timer.type = 'work'
    this.setState({
      timer:timer
    })
    this.resetTimer();
    this.startTimer(this.state.timer.time);
  }

  getTotalTimer = () => {
    return this.state.timer.type == 'work' ? timerWork : timerRest
  }

  timeRemaining = (time) => {
    //convert current time to secs
    time = time.toString();
    let newTime = time
    newTime = newTime.split(':');
    mins = parseInt(newTime[0]) * 60
    secs = parseInt(newTime[1]) 
    secs = mins + secs

    return secs

  }

  block = () => {
    const doneTime = Date.now() + 200;
    while (Date.now() < doneTime) {}
  }

  render(){
    if (Math.round(Math.random())) this.block()
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <ImageBackground source={localImg} resizeMode="cover" style={styles.image}>
          <View>
            <View style={styles.flexedDiv}>
              <ImageBackground source={require('./assets/timer-container.png')} style={styles.roundImg}>
                <Text style={styles.text}> {this.state.timer.time} </Text>
              </ImageBackground>
            </View>
            <View style={styles.flexedDiv}>
              <ControlBtn timer={this.state.timer} pause={() => this.pauseTimer()} play={() => this.playTimer()} />
              <TouchableOpacity activeOpacity={0.5} onPress={() => this.resetTimer()}>
                <Image
                  source={require('./assets/restart.png')}
                  style={[styles.icons]}
                  resizeMode='contain'
                />
              </TouchableOpacity>
            </View>
            <ProgressBar timeRemaining={this.timeRemaining(this.state.timer.time)} isRunning={this.state.timer.playing}  totalTime={this.timeRemaining(this.getTotalTimer())} />
          </View>
          <BottomButtons timer={this.state.timer} start={() => this.playTimer()} stop={() => this.resetTimer()}
            break={() => this.takeBreak()}
            work={() => this.startWork()}
          />
        </ImageBackground>
        <StatusBar style="auto" />
      </ScrollView>
    );
  }
}

