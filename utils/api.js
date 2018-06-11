import { AsyncStorage } from 'react-native'

// getDecks: return all of the decks along with their titles, questions, and answers.
// getDeck: take in a single id argument and return the deck associated with that id.
// saveDeckTitle: take in a single title argument and add it to the decks.
// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.

export function getDecks () {
  return AsyncStorage.getAllKeys()
    .then(ks => AsyncStorage.multiGet(ks))
    .then(stores => stores)
    .catch(err => console.log('err',err))
}

export function getDeck (key) {
  return AsyncStorage.getItem(key)
    .then(results => JSON.parse(results))
    .catch(err => console.log('err',err))
}

export function saveDeckTitle (title) {
  return AsyncStorage.setItem(key, JSON.stringify({
    [title]: { title }
  }))
}

export function addCardToDeck ({ title, card }) {
  return AsyncStorage.mergeItem(key, JSON.stringify({
    [title]: { title, questions: card }
  }))
}

export function saveQuizHistory ({ date }) {
  return AsyncStorage.setItem(key, JSON.stringify({
    [date]: 'done'
  }))
}

const decks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

const quizHistory = {
  051318: 'done',
  051418: 'missed'
}
