export default class Node {
  constructor(data = null) {
    this.data = data;
    this.children = {};
    this.endWord = false;
    this.selectionCount = 0;
  }
}
