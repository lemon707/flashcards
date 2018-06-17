import { AsyncStorage } from 'react-native'

export function getDecks () {
  return AsyncStorage.getAllKeys()
    .then(ks => {
      return AsyncStorage.multiGet(ks)
        .then(store => {
          // AsyncStorage.clear()
          // AsyncStorage.multiRemove(ks)
          let obj = {}
          store.forEach((s,i) => {
            let key = s[0]
            let value = JSON.parse(s[1])
            if(!obj[key]) obj[key] = {}
            obj[key] = value
          })
          return obj
        })
    })
    .catch(err => console.log('err',err))
}

export function getDeck (key) {
  return AsyncStorage.getItem(key)
    .then(results => JSON.parse(results))
    .catch(err => console.log('err',err))
}

export function saveDeckTitle (title) {
  return AsyncStorage.setItem(title, JSON.stringify({ title, questions: [] }))
}

export function addCardToDeck (title, card) {
  return AsyncStorage.getItem(title)
    .then(results => {
      const r = JSON.parse(results)
      if(r.questions.length) {
        return AsyncStorage.mergeItem(title, JSON.stringify({ title, questions: [...r.questions, card] }))
      } else {
        return AsyncStorage.mergeItem(title, JSON.stringify({ title, questions: [card] }))
      }
    })

}
