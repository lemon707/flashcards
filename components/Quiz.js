import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/helpers'
import { Decks } from '../utils/api'

class Quiz extends Component {
  markCorrect() {

  }
  markIncorrect() {

  }
  viewAnswer() {

  }
  render() {
    const decks = Decks
    const { title } = this.props.navigation.state.params

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{decks[title].questions[0].question}</Text>
        </View>
        <TouchableOpacity style={styles.answerButton} onPress={() => this.viewAnswer()}>
          <Text style={styles.answerText}>Answer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.correctButton} onPress={() => this.markCorrect()}>
          <Text style={styles.buttonText}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.incorrectButton} onPress={() => this.markIncorrect()}>
          <Text style={styles.buttonText}>Incorrect</Text>
        </TouchableOpacity>
     </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 30
  },
  title: {
    fontSize: 40
  },
  answerText: {
    fontSize: 20,
    color: 'red'
  },
  answerButton: {
    height: 50,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  buttonText: {
    fontSize: 20,
    color: 'white'
  },
  correctButton: {
    height: 50,
    width: '50%',
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  incorrectButton: {
    height: 50,
    width: '50%',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default Quiz
