import Node from './node'
import fs from 'fs';
require ('locus')

export default class Trie {

  constructor() {
    this.root = new Node();
    this.wordCount = 0;
    this.autocomplete = []
  }

  insert(word) {
    let splitWord = word.split('');
    let currentNode = this.root;

    splitWord.forEach((letter, i) => {
      if(!currentNode.children[letter]) {
        currentNode.children[letter] = new Node(letter)
        if(i === splitWord.length - 1 ) {
          this.wordCount++;
        }
      }
      currentNode = currentNode.children[letter];
    })
    currentNode.endWord = true;
  }

  count() {
    return this.wordCount;
  }

  suggest(partialWord) {
    let splitWord = partialWord.split('');
    let currentNode = this.root;
    let suggestedWord = partialWord;

    if(!currentNode.children[splitWord[0]]) {
      return 'no suggestions';
    }

    splitWord.forEach(letter => {
      if(currentNode.children[letter]) {
      currentNode = currentNode.children[letter];
      }
    })

    this.autocompletePush(currentNode, suggestedWord)
  }

  autocompletePush (currentNode, suggestedWord) {
    if(currentNode.endWord) {
      this.autocomplete.push(suggestedWord);
    }
    let childrenLetters = Object.keys(currentNode.children);
    childrenLetters.forEach(letter => {
      let nextNode = currentNode.children[letter];
      this.autocompletePush(nextNode, suggestedWord + letter)
    })
  }

  loadBuiltInDictionary () {
    const text = "/usr/share/dict/words"
    let dictionary = fs.readFileSync(text).toString().trim().split('\n')

    dictionary.forEach(word => {
      this.insert(word);
    } )
  }

  locateLastNode(string) {
    let splitWord = string.split('');
    let lastNode = this.root;

    if(!lastNode.children[splitWord[0]]) {
      return 'not found';
    }

    splitWord.forEach(letter => {
      if(lastNode.children[letter]) {
      lastNode = lastNode.children[letter];
      }
    })
    return lastNode;
  }

//*****End of Trie Class
}
