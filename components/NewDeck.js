import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/helpers'
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
    saveDeckTitle(title)
    this.props.navigation.navigate('Deck', { title })
  }

  render() {
    return (
      <View style={styles.container}>
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
  textInput: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
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
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default NewDeck
