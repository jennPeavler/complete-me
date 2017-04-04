export default class Node {
  constructor(data = null, children = {}, endWord = false) {
    this.data = data;
    this.children = children;
    this.endWord = endWord;
  }

}
