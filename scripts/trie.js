import Node from './node'
import fs from 'fs';
import { assert } from 'chai'
import { expect } from 'chai'
require ('locus')

export default class Trie {

  constructor() {
    this.root = new Node();
    this.wordCount = 0;
    // this.autocomplete = [];
  }

  insert(word) {
    if(!this.isNumeric(word)) {
      // eval(locus);
      let splitWord = word.split('');
      let currentNode = this.root;

      splitWord.forEach((letter, i) => {
        if(!currentNode.children[letter]) {
          currentNode.children[letter] = new Node(letter);
          if(i === splitWord.length - 1 ) {
            this.wordCount++;
          }
        }
        currentNode = currentNode.children[letter];
      })
      currentNode.endWord = true;
    }
  }

  count() {
    return this.wordCount;
  }

  suggest(partialWord) {

    let currentNode = this.locateLastNode(partialWord);
    let autocomplete = this.autocompletePush(currentNode, partialWord);
    autocomplete.sort(( currentElement, nextElement ) => {
      return nextElement.selectionCount - currentElement.selectionCount;
    });
    autocomplete.forEach((element, i) => {
      autocomplete[i] = element.suggestedWord;
    });
    return autocomplete;
  }

  autocompletePush (currentNode, suggestedWord, currentArray) {
    let autocomplete = currentArray || [];
    if(currentNode.endWord) {
      autocomplete.push({suggestedWord: suggestedWord, selectionCount: currentNode.selectionCount});
    }
    let childrenLetters = Object.keys(currentNode.children);
    childrenLetters.forEach(letter => {
      let nextNode = currentNode.children[letter];
      this.autocompletePush(nextNode, suggestedWord + letter, autocomplete);
    });
    return autocomplete;
  }

  loadBuiltInDictionary () {
    const text = "/usr/share/dict/words";
    let dictionary = fs.readFileSync(text).toString().trim().split('\n');

    dictionary.forEach(word => {
      this.insert(word);
    });
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

  select(word) {
    let lastNode = this.locateLastNode(word);
    lastNode.selectionCount++;
  }

  traverseNodesTest (word) {
    let currentNode = this.root;
    word.split('').forEach(letter => {
      if(currentNode.children[letter]) {
        // eval(locus);
        assert.equal(currentNode.children[letter].data, letter);
        expect(currentNode.children[letter].data).to.not.equal('z');
        currentNode = currentNode.children[letter];
      }
    });
  }

  isNumeric (word) {
    return !isNaN(parseFloat(word)) && isFinite(word);
  };

}
