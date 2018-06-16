import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/helpers'

class Score extends Component {
  render() {
    const { title, score, numCards } = this.props.navigation.state.params
    console.log('title score',title)
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.scoreText}>You scored {score} out of {numCards}!</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.restartQuizButton} onPress={() => this.props.navigation.navigate('Quiz', { title })}>
            <Text style={styles.buttonText}>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backToDeckButton} onPress={() => this.props.navigation.navigate('Deck', { title })}>
            <Text style={styles.buttonText}>Back to Deck</Text>
          </TouchableOpacity>
        </View>
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
  scoreText: {
    textAlign: 'center',
    fontSize: 30
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
  restartQuizButton: {
    height: 60,
    width: '60%',
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10
  },
  backToDeckButton: {
    height: 60,
    width: '60%',
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  }
})

export default Score
