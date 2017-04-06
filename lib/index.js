// import Node from './scripts/node'
// import Trie from './scripts/trie'
const Trie = require('./trie');
const Node = require('./node');
// var fs = require('fs');

let trie = new Trie;

// trie.loadBuiltInDictionary();

$('#submit').on('click', () => {
  let $partialWord = $('#input-box').val()

  trie.insert('super');
  trie.insert('jackpot');
  trie.insert('baby');
  trie.insert('let');
  trie.insert('us');
  trie.insert('play');
  trie.insert('pinball');
  trie.insert('pint');
  trie.insert('pinto beans');


  let suggestions = trie.suggest($partialWord);

  suggestions.forEach(suggestion => {
  $('#suggestion-table').append(
    `<tr>
      <td class='words'>${suggestion}</td>
    </tr>`
  )
})


})
