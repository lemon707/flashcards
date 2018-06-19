import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableHighlight, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { white, green, gray } from '../utils/colors'
import { saveDeckTitle } from '../utils/api'

class NewDeck extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: ''
    }
  }

  submit = () => {
    const { title } = this.state
    if(!title) { return alert("fill the title" ) }
    saveDeckTitle(title)
    this.props.navigation.navigate('Deck', { title })
    this.setState({
      title: ''
    })
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <Text>What is the title of your new deck?</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(title) => this.setState({ title })}
            value={this.state.title}
            autoFocus={true}
          />
          <TouchableHighlight
            style={styles.submitButton}
            onPress={this.submit}>
            <Text>Submit</Text>
          </TouchableHighlight>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
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
  textInput: {
    height: 40,
    width: '80%',
    borderColor: gray,
    borderBottomWidth: 1,
    marginBottom: 30,
    textAlign: 'center'
  },
  text: {
    fontSize: 40
  },
  submitButton: {
    height: 40,
    width: '60%',
    backgroundColor: green,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default NewDeck
