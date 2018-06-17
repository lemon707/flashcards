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
    const { title } = this.props.navigation.state.params

    return (
      <View style={styles.container}>
        <View style={styles.topHeader}>
          <Text style={styles.topHeaderText}>Add a new card for {title} deck</Text>
        </View>
        <Text>Question</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(question) => this.setState({ question })}
          value={this.state.question}
          autoFocus={true}
        />
        <Text>Answer</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(answer) => this.setState({ answer })}
          value={this.state.answer}
        />
        <TouchableHighlight
          style={styles.submitButton}
          onPress={this.submit}>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  topHeader: {
    marginBottom: 30
  },
  topHeaderText: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  textInput: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 30,
    textAlign: 'center'
  },
  submitButton: {
    height: 40,
    width: '60%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default NewQuestion
