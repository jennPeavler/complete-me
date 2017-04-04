import Node from './node'

export default class Trie {

  constructor() {
    this.root = new Node();
    // console.log('this is the beginning of the root')
    // console.log(this.root)
  }

  insert(data) {
    let splitWord = data.split('');
    let currentNode = this.root;

    splitWord.forEach(letter => {

      if(!currentNode.children[letter]) {
        currentNode.children[letter] = new Node(letter)
      }

      currentNode = currentNode.children[letter];
    })

    // console.log(this.root);
    return splitWord;

  }

}
