import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/helpers'

class NewDeck extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>NEW DECK</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
  text: {
    fontSize: 40
  }
})

export default NewDeck
