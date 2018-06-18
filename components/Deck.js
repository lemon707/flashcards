import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { white, lightPurp, purple } from '../utils/colors'
import { getDecks } from '../utils/api'

class Deck extends Component {
  constructor(props) {
    super(props)
    this.mounted = false
    this.state = {
      decks: null
    }
  }

  addCard = (title) => {
    this.props.navigation.navigate('NewQuestion', { title })
  }

  startQuiz = (title) => {
    this.props.navigation.navigate('Quiz', { title })
  }

  componentDidMount() {
    this.mounted = true
    if(this.mounted) {
      getDecks()
      .then(decks => {
        if(this.mounted) {
          this.setState({ decks })
        }
      })
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  componentDidUpdate() {
    this.mounted = true
    if(this.mounted) {
      getDecks()
        .then(decks => {
          if(this.mounted) {
            this.setState({ decks })
          }
        })
    }
  }

  render() {
    const { decks } = this.state
    const { title } = this.props.navigation.state.params

    return (
      <View style={styles.container}>
        { decks && Object.keys(decks).length ?
          <View style={styles.innerContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subTitle}>{ (decks[title] && decks[title].questions) ? decks[title].questions.length : 0 } cards</Text>
            </View>
            <TouchableOpacity style={styles.deckContainer} onPress={() => this.addCard(title)}>
              <Text style={styles.title}>Add Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deckContainer} onPress={() => this.startQuiz(title)}>
              <Text style={styles.title}>Start Quiz</Text>
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
  innerContainer: {
    width: '100%',
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
    backgroundColor: lightPurp,
    borderWidth: 1,
    borderColor: purple,
    borderRadius: 10,
    marginBottom: 10
  }
})

export default Deck
