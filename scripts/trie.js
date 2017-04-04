import Node from './node'
require ('locus')

export default class Trie {

  constructor() {
    this.root = new Node();
    this.wordCount = 0;
    this.autocomplete = []
    // console.log('this is the beginning of the root')
    // console.log(this.root)
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
    // this.wordCount++;
    currentNode.endWord = true;
    // console.log(this.root);
    return splitWord;
  }

  count() {
    return this.wordCount;
  }

  suggest(partialWord) {
    console.log('in partialWord')
    let splitWord = partialWord.split('');
    let currentNode = this.root;
    let suggestedWord = partialWord;


    splitWord.forEach(letter => {
      if(currentNode.children[letter]) {
      currentNode = currentNode.children[letter]
      }
    })
      //keep traversing down the nodes
      //concat each node data(letter) onto suggestedWord
      //when .endWord is true
      //push suggested word to autocomplete []

      //may have to make a recursive function to traverse
      //down the nodes and concat letter onto the string

      this.autocompletePush(currentNode, suggestedWord)
      // let autocompletePush = (currentNode) => {
      //   if(currentNode.endWord) {
      //     autocomplete.push(suggestedWord)
      //   }
      //   else {
      //     suggestedWord.concat(currentNode.children.data)
      //     currentNode = currentNode.children
      //     autocompletePush(currentNode)
      //   }
      // }
    }

    autocompletePush (currentNode, suggestedWord) {
      console.log(currentNode)
      console.log(suggestedWord)
      if(currentNode.endWord) {
        console.log('IN END WORD')
        this.autocomplete.push(suggestedWord)
      }
      currentNode = currentNode.children
      console.log(currentNode)
      console.log('****')

      let childKeys = Object.keys(currentNode);

      childKeys.forEach(key => {
        eval(locus)
      })
      console.log(childKeys);
      console.log(childKeys[0]);
      suggestedWord += childKeys[0];
      console.log(suggestedWord);
      // console.log(currentNode.childKeys[0])
      // console.log(currentNode.childKey[0].data);
      // console.log(currentNode.data)

      // this.autocompletePush(currentNode, suggestedWord)
      // console.log(this.autocomplete);

    }





  }
