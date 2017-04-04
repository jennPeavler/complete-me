import Node from './node'

export default class Trie {

  constructor() {
    this.root = new Node();
  }

  insert(data) {
    let splitWord = data.split('');
    return splitWord;
  }
  // addNode() {
  //   this.children.hasOwnProperty
  //   let node = new Node(data, children);
  // }
}
