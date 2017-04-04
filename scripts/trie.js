import Node from './node'

export default class Trie {

  constructor() {
    this.root = new Node();
    this.wordCount = 0;
    // console.log('this is the beginning of the root')
    // console.log(this.root)
  }

  insert(data) {
    let splitWord = data.split('');
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
    // this.wordCount++;
    // console.log(this.root);
    return splitWord;
  }

  count() {
    return this.wordCount;
  }

  // suggest(partialWord) {
  //   console.log('in partialWord')
  //   let splitWord = partialWord.split('');
  //   let currentNode = this.root;
  //   let fullWord = '';
  //   splitWord.forEach(letter => {
  //     if(currentNode.children[letter]) {
  //       fullWord.concat(letter);
  //       console.log(fullWord);
  //     }
  //     currentNode = currentNode.children[letter]
  //   })
  // }

}
