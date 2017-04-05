import Node from './node'

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

//*****End of Trie Class

}
