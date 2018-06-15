import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/helpers'
import { Decks } from '../utils/api'

class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAnswer: true,
      score: 0,
      counter: 0,
      numCards: 0
    }
  }
  mark(isCorrect) {
    const { title } = this.props.navigation.state.params
    const { counter, score, numCards, showAnswer } = this.state
    isCorrect ? this.setState({ score: score + 1 }) : null
    this.setState({ counter: counter + 1, showAnswer: !showAnswer })
    numCards === counter ? this.props.navigation.navigate('Score', { title, score, numCards }) : null
  }
  componentDidMount() {
    const decks = Decks
    const { title } = this.props.navigation.state.params
    const numCards = decks[title].questions.length - 1
    this.setState({ numCards })
    console.log('this.state',this.state)
  }
  render() {
    const decks = Decks
    const { title } = this.props.navigation.state.params
    const { counter, numCards } = this.state
    return (
      <View style={styles.container}>
        { counter <= numCards && (
          <View style={styles.container}>
            <View>{counter} out of {numCards}</View>
            {
              !this.state.showAnswer ?
              <View style={styles.header}>
                <Text style={styles.answerText}>{decks[title].questions[counter].answer}</Text>
              </View>
              :
              <View style={styles.header}>
                <Text style={styles.questionText}>{decks[title].questions[counter].question}</Text>
              </View>
            }
            <TouchableOpacity style={styles.answerButton} onPress={() => this.setState({showAnswer: !this.state.showAnswer})}>
              <Text style={styles.showAnswerText}>{this.state.showAnswer ? 'Show Answer' : 'Show Question' }</Text>
            </TouchableOpacity>
            {
              !this.state.showAnswer ?
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.correctButton} onPress={() => this.mark(true)}>
                  <Text style={styles.buttonText}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.incorrectButton} onPress={() => this.mark(false)}>
                  <Text style={styles.buttonText}>Incorrect</Text>
                </TouchableOpacity>
              </View>
              :
              null
            }
          </View>
        )
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
