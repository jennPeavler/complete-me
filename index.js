// import Node from './scripts/node'
// import Trie from './scripts/trie'
const Trie = require('./scripts/trie');
const Node = require('./scripts/node');

let trie = new Trie;

trie.loadBuiltInDictionary();

$('#submit').on('click', () => {
  let $partialWord = $('#input-box').val()



})
