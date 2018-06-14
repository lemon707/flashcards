import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { white, pink } from '../utils/helpers'
import { Decks } from '../utils/api'

class Deck extends Component {
  addCard = (title) => {
    this.props.navigation.navigate('NewQuestion', { title })
  }
  startQuiz = (title) => {
    this.props.navigation.navigate('Quiz', { title })
  }
  render() {
    const decks = Decks
    console.log('decks',decks)
    const { title } = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{decks[title].title}</Text>
          <Text style={styles.subTitle}>{decks[title].questions.length} cards</Text>
        </View>
        <TouchableOpacity style={styles.deckContainer} onPress={() => this.addCard(title)}>
          <Text style={styles.title}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deckContainer} onPress={() => this.startQuiz(title)}>
          <Text style={styles.title}>Start Quiz</Text>
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
    marginBottom: 50
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10
  },
  subTitle: {
    fontSize: 14,
    textAlign: 'center'
  },
  deckContainer: {
    height: 100,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffff0',
    borderWidth: 1,
    borderColor: '#d6d6ad',
    borderRadius: 10,
    marginBottom: 10
  }
})

export default Deck
