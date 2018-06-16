import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/helpers'
import { getDecks } from '../utils/api'

class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAnswer: true,
      score: 0,
      counter: 0,
      numCards: 0,
      decks: null
    }
  }
  mark(isCorrect) {
    const { title } = this.props.navigation.state.params
    const { counter, score, numCards, showAnswer } = this.state
    console.log('before counter',counter,'numCards',numCards)
    this.setState({
      score: isCorrect ? (score + 1) : score,
      counter: counter + 1,
      showAnswer: !showAnswer
    }, () => {
      console.log('after counter',this.state.counter,'numCards',this.state.numCards,'score',this.state.score)
      if(this.state.numCards === this.state.counter) {
        this.props.navigation.navigate('Score', { title, score: this.state.score, numCards: this.state.numCards })
        this.setState({
          showAnswer: true,
          score: 0,
          counter: 0,
          numCards: 0,
        })
      }
    })

  }
  componentDidMount() {
    const { title } = this.props.navigation.state.params
    console.log('title componentDidMount',title)
    getDecks()
      .then(decks => {
        this.setState({ decks }, () => {
          console.log('decks componentDidMount',decks)
          const numCards = decks[title].questions.length
          this.setState({ numCards })
        })
      })
  }
  render() {
    const { title } = this.props.navigation.state.params
    const { decks, counter, numCards, showAnswer } = this.state
    console.log('title render',title,'decks',decks,'counter',counter,'numCards',numCards)
    const answer = decks && decks[title].questions.length && decks[title].questions[counter] ? decks[title].questions[counter].answer : ''
    const question = decks && decks[title].questions.length && decks[title].questions[counter] ? decks[title].questions[counter].question : ''
    return (
      <View style={styles.container}>
        { (decks && Object.keys(decks).length) ?
          <View style={styles.innerContainer}>
            <View>{counter} out of {numCards}</View>
            {
              !showAnswer ?
              <View style={styles.header}>
                <Text style={styles.answerText}>{answer}</Text>
              </View>
              :
              <View style={styles.header}>
                <Text style={styles.questionText}>{question}</Text>
              </View>
            }
            <TouchableOpacity style={styles.answerButton} onPress={() => this.setState({showAnswer: !showAnswer})}>
              <Text style={styles.showAnswerText}>{showAnswer ? 'Show Answer' : 'Show Question' }</Text>
            </TouchableOpacity>
            {
              !showAnswer ?
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
          :
          <Text>No cards available!</Text>
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
  innerContainer: {
    width: '100%',
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
