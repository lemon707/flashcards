import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/helpers'
import { getDecks, Decks } from '../utils/api'

function Deck({ title, questions, onPressDeck }) {
  return (
    <TouchableOpacity style={styles.deckContainer} onPress={() => onPressDeck(title)}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}>{questions.length} cards</Text>
    </TouchableOpacity>
  )
}

class DeckList extends Component {
  state = {}

  _onPressDeck = (title) => {
    this.props.navigation.navigate('Deck', { title })
  }

  render() {
    // getDecks()
    //   .then(res => {
    //     decks = res
    //   })
    const decks = Decks
    return (
      <View style={styles.container}>
        {
          Object.entries(decks).map(deck => (
            <Deck
              key={deck[0]}
              title={deck[1].title}
              questions={deck[1].questions}
              onPressDeck={this._onPressDeck}>
            </Deck>
          ))
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
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10
  },
  subTitle: {
    fontSize: 12,
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

export default DeckList
