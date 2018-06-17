import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { connect } from 'react-redux'
import { white, lightPurp, purple } from '../utils/colors'
import { getDecks } from '../utils/api'

function DeckCard({ title, questions, onPressDeck, bounceValue }) {
  return (
    <TouchableOpacity style={styles.deckContainer} onPress={(e) => onPressDeck(e, title)}>
      <Animated.Text
        style={[styles.title, {transform: [{scale: bounceValue}]}]}>
        {title}
      </Animated.Text>
      <Text style={styles.subTitle}>{questions && questions.length} cards</Text>
    </TouchableOpacity>
  )
}

class DeckList extends Component {
  constructor(props) {
    super(props)
    this.mounted = false
    this.state = {
      bounceValue: new Animated.Value(1),
      decks: null
    }
  }

  _onPressDeck = (title) => {
    Animated.sequence([
      Animated.timing(this.state.bounceValue, { duration: 200, toValue: 1.06}),
      Animated.spring(this.state.bounceValue, { toValue: 1, friction: 4})
    ]).start()
    setTimeout(()=> this.props.navigation.navigate('Deck', { title }), 300)
  }

  componentDidMount() {
    this.mounted = true
    if(this.mounted) {
      getDecks()
      .then(decks => {
        this.setState({ decks })
      })
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  componentDidUpdate() {
    this.mounted = true
    if(this.mounted) {
      let count = 0
      if(count === 0) {
        getDecks()
        .then(decks => {
          count++
          this.setState({ decks })
        })
      }
    }
  }

  render() {
    const { decks } = this.state
    return (
      <View style={styles.container}>
        { (decks && Object.keys(decks).length) ?
          Object.entries(decks).map((deck) => (
            <DeckCard
              key={deck[0]}
              title={deck[1] && deck[1].title}
              questions={deck[1] && deck[1].questions}
              bounceValue={this.state.bounceValue}
              onPressDeck={() => this._onPressDeck(deck[1].title)}>
            </DeckCard>
          ))
          :
          <Text>No decks available!</Text>
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
    backgroundColor: lightPurp,
    borderWidth: 1,
    borderColor: purple,
    borderRadius: 10,
    marginBottom: 10
  }
})

export default DeckList
