import { expect } from 'chai';
import { assert } from 'chai';
import Trie from '../scripts/trie'
import Node from '../scripts/node'
require ('locus')


let trie;

describe('Trie constructor', () => {
  beforeEach( () => {
    trie = new Trie();
  })

  it('should be able to make a new instance of itself', () => {
    expect(trie).to.be.instanceOf(Trie);
  })

  it('should have a root will null data', () => {
    assert.equal(trie.root.data, null);
  })

  it('should have a root that has a children object', () => {
    assert.isObject(trie.root.children);
  })

  it('should start with no children in its root', () => {
    assert.deepEqual(Object.keys(trie.root.children), []);
  })

  it('should start with no words', () => {
    assert.equal(trie.wordCount, 0);
  })

  it('should start with no autocompletions', () => {
    assert.deepEqual(trie.autocomplete, []);
  })


})

describe('How to insert words into trie', () => {
  beforeEach( () => {
    trie = new Trie();
  })

  it('should be able to add nodes for the letter in an inseted word', () => {
    trie.insert('good');
    trie.traverseNodesTest('good');
    /*
    assert.equal(trie.root.children.hasOwnProperty('g'), true);
    assert.equal(trie.root.children.hasOwnProperty('f'), false);
    assert.equal(trie.root.children.g.children.hasOwnProperty('i'), true);
    assert.equal(trie.root.children.g.children.hasOwnProperty('r'), false);
    assert.equal(trie.root.children.g.children.i.children.hasOwnProperty('g'), true);
    assert.equal(trie.root.children.g.children.i.children.hasOwnProperty('x'), false);*/
  })

  it('should be able to insert more than one word', () => {
    trie.insert('gig');
    trie.insert('laugh');

    trie.traverseNodesTest('gig');
    trie.traverseNodesTest('laugh');
    /*
    assert.equal(trie.root.children.hasOwnProperty('g'), true);
    assert.equal(trie.root.children.hasOwnProperty('l'), true);
    assert.equal(trie.root.children.hasOwnProperty('f'), false);
    assert.equal(trie.root.children.l.children.hasOwnProperty('a'), true);
    assert.equal(trie.root.children.l.children.hasOwnProperty('r'), false);
    assert.equal(trie.root.children.l.children.a.children.hasOwnProperty('u'), true);
    assert.equal(trie.root.children.l.children.a.children.hasOwnProperty('g'), false);
    assert.equal(trie.root.children.l.children.a.children.u.children.hasOwnProperty('g'), true);
    assert.equal(trie.root.children.l.children.a.children.u.children.hasOwnProperty('h'), false);
    assert.equal(trie.root.children.l.children.a.children.u.children.g.children.hasOwnProperty('h'), true);
    assert.equal(trie.root.children.l.children.a.children.u.children.g.children.hasOwnProperty('z'), false);
    assert.deepEqual(trie.root.children.l.children.a.children.u.children.g.children.h.children, {}); */
  })

  it('should build onto an existing data structure', () => {
    trie.insert('gig');
    trie.insert('gift');
    trie.traverseNodesTest('gig');
    trie.traverseNodesTest('gift');
    /*
    assert.equal(trie.root.children.hasOwnProperty('g'), true);
    assert.equal(trie.root.children.g.children.hasOwnProperty('i'), true);
    assert.equal(trie.root.children.g.children.i.children.hasOwnProperty('g'), true);
    assert.equal(trie.root.children.g.children.i.children.hasOwnProperty('f'), true);
    assert.equal(trie.root.children.g.children.i.children.hasOwnProperty('z'), false); */
  })

  it('should build onto an existing data structure, test2', () => {
    trie.insert('gig');
    trie.insert('giggle');
    trie.insert('gift');
    trie.insert('laugh');
    trie.insert('laughter');
    trie.insert('love');
    trie.insert('gross');

    trie.traverseNodesTest('gig');
    trie.traverseNodesTest('giggle');
    trie.traverseNodesTest('gift');
    trie.traverseNodesTest('laugh');
    trie.traverseNodesTest('laughter');
    trie.traverseNodesTest('love');
    trie.traverseNodesTest('gross');
  })

  it('should set the node property endWord to true if node is end of word', () => {

    trie.insert('gig');
    trie.insert('pot');

    assert.equal(trie.root.children.g.children.i.children.g.endWord, true);
    assert.equal(trie.root.children.p.children.o.children.t.endWord, true);
    assert.equal(trie.root.children.p.endWord, false)
  })

  it('should insert words that have not a selectionCount of zero', () => {
    trie.insert('boogie')
    let lastNode = trie.locateLastNode('boogie')
    assert.equal(lastNode.selectionCount, 0)
  })

})

describe('How to count words in a trie', () => {
  beforeEach( () => {
    trie = new Trie();
  })

  it('should keep track of how many words it has.', () => {
    trie.insert('gig');
    assert.equal(trie.count(), 1)

    trie.insert('giggle');
    assert.equal(trie.count(), 2)

    trie.insert('gift');
    assert.equal(trie.count(), 3)

    trie.insert('laughter');
    assert.equal(trie.count(), 4)

    trie.insert('lovely');
    assert.equal(trie.count(), 5)

    trie.insert('ladies');
    assert.equal(trie.count(), 6)
  })

  it('should not count duplicate words twice.', () => {
    trie.insert('gig');
    assert.equal(trie.count(), 1)

    trie.insert('gig');
    assert.equal(trie.count(), 1)

    trie.insert('gig');
    assert.equal(trie.count(), 1)

    trie.insert('gift');
    assert.equal(trie.count(), 2)

    trie.insert('gift');
    assert.equal(trie.count(), 2)
  })

})

describe('How to make autocomplete suggestions', () => {
  beforeEach( () => {
    trie = new Trie();
  })

  it('should suggest words that have the same first letter', () => {
    trie.insert('gig')
    trie.insert('giggle')
    trie.insert('gross')
    let autocompleteList = trie.suggest('g')

    assert.deepEqual(autocompleteList, ['gig', 'giggle', 'gross'])
  })

  it('should not suggest incorrect words that begin with the same letter', () => {
    trie.insert('laugh')
    trie.insert('laughter')
    trie.insert('laude')
    trie.insert('little')
    let autocompleteList = trie.suggest('lau')

    assert.deepEqual(autocompleteList, ['laugh', 'laughter', 'laude'])
  })

  it('should not suggest words that do not have the same first letter', () => {
    trie.insert('gig')
    trie.insert('giggle')
    trie.insert('gross')
    trie.insert('laugh')
    let autocompleteList = trie.suggest('g')
    assert.deepEqual(autocompleteList, ['gig', 'giggle', 'gross'])
  })

  it('should take into account capital letters', () => {
    trie.insert('Zyrenian');
    trie.insert('Zyrian');
    trie.insert('Zyryan');
    trie.insert('zyrofoam');
    let autocompleteList = trie.suggest('zyr');
    expect(autocompleteList).to.not.equal(['Zyrenian', 'Zyrian', 'Zyryan'])
  })

})

describe('How to load and use the built in dictionary', () => {
  beforeEach( () => {
    trie = new Trie();
  })

  it('should have access to the built in dictionary', () => {
    trie.loadBuiltInDictionary();
    expect(trie.count()).to.equal(235886)
  })

  it('should be able to expand the built in dictionary', () => {
    trie.loadBuiltInDictionary();
    trie.insert('superJackPotBaaaby')

    expect(trie.count()).to.equal(235887)
  })

  it('should suggest words from the built in dictionary', () => {
    trie.loadBuiltInDictionary();
    let autocompleteList = trie.suggest('piz');

    assert.deepEqual(autocompleteList, ["pize", "pizza", "pizzeria", "pizzicato", "pizzle"])
  })

  it('should suggest words from the built in dictionary - test2', () => {
    trie.loadBuiltInDictionary();
    let autocompleteList = trie.suggest('Zyr');

    assert.deepEqual(autocompleteList, ["Zyrenian", "Zyrian", "Zyryan"])
  })

})

describe('How to locate the last node of a word', () => {
  beforeEach( () => {
    trie = new Trie();
  })

  it('locate the last node of a string', () => {
    trie.insert('loud')
    trie.insert('love')
    let lastNode = trie.locateLastNode('lo')

    assert.deepEqual(Object.keys(lastNode.children), ['u', 'v'])
  })
})

describe('How to select your favorite words', () => {
  beforeEach( () => {
    trie = new Trie();
  })

  it('should select a word', () => {
    trie.insert('boogie')
    let lastNode = trie.locateLastNode('boogie')
    assert.equal(lastNode.selectionCount, 0)

    trie.select('boogie')
    assert.equal(lastNode.selectionCount, 1)
  })

  it('should give suggestion preference to most selected words', () => {

    trie.insert('boo')
    trie.insert('boogie')
    trie.insert('boolean')
    trie.select('boolean')
    trie.select('boolean')
    trie.select('boogie')

    let autocompleteList = trie.suggest('boo')
    expect(autocompleteList).to.deep.equal([ 'boolean', 'boogie', 'boo' ])

  })

})
