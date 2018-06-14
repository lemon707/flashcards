import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/helpers'
import { Decks } from '../utils/api'

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAnswer: true
    }
  }
  markCorrect() {

  }
  markIncorrect() {

  }
  render() {
    const decks = Decks
    const { title } = this.props.navigation.state.params

    return (
      <View style={styles.container}>
        {
          !this.state.showAnswer ?
          <View style={styles.header}>
            <Text style={styles.answerText}>{decks[title].questions[0].answer}</Text>
          </View>
          :
          <View style={styles.header}>
            <Text style={styles.questionText}>{decks[title].questions[0].question}</Text>
          </View>
        }
        <TouchableOpacity style={styles.answerButton} onPress={() => this.setState({showAnswer: !this.state.showAnswer})}>
          <Text style={styles.showAnswerText}>{this.state.showAnswer ? 'Show Answer' : 'Show Question' }</Text>
        </TouchableOpacity>
        {
          !this.state.showAnswer ?
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.correctButton} onPress={() => this.markCorrect()}>
              <Text style={styles.buttonText}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.incorrectButton} onPress={() => this.markIncorrect()}>
              <Text style={styles.buttonText}>Incorrect</Text>
            </TouchableOpacity>
          </View>
          :
          null
        }
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
  questionText: {
    textAlign: 'center',
    fontSize: 30
  },
  answerText: {
    textAlign: 'center',
    fontSize: 20
  },
  showAnswerText: {
    fontSize: 20,
    color: 'red'
  },
  answerButton: {
    height: 60,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  buttonContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white'
  },
  correctButton: {
    height: 60,
    width: '60%',
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10
  },
  incorrectButton: {
    height: 60,
    width: '60%',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  }
})

export default Quiz
