import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/helpers'
import { addCardToDeck } from '../utils/api'

class NewQuestion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      question: '',
      answer: ''
    }
  }
  submit = () => {
    const { title } = this.props.navigation.state.params
    const card = {
      question: this.state.question,
      answer: this.state.answer
    }
    addCardToDeck(title, card)
    this.props.navigation.navigate('Deck', { title })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Question</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(question) => this.setState({ question })}
          value={this.state.question}
        />
        <Text>Answer</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(answer) => this.setState({ answer })}
          value={this.state.answer}
        />
        <TouchableHighlight onPress={this.submit}>
          <Text>Submit</Text>
        </TouchableHighlight>
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
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  }
})

export default NewQuestion
