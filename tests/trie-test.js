import { expect } from 'chai';
import { assert } from 'chai';
import Trie from '../scripts/trie'
import Node from '../scripts/node'
require ('locus')



describe('Trie', () => {

  it('should be able to make a new instance of itself', () => {
    let trie = new Trie();
    expect(trie).to.be.instanceOf(Trie);
  })

  it('should have a root will null data', () => {
    let trie = new Trie();
    assert.equal(trie.root.data, null);
  })

  it('should have a root that has a children object', () => {
    let trie = new Trie();
    assert.isObject(trie.root.children);
  })

  it('should start with no children in its root', () => {
    let trie = new Trie();
    assert.deepEqual(Object.keys(trie.root.children), []);
  })

  it('should be able to add nodes for letters in words', () => {
    let trie = new Trie();
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
    let trie = new Trie();
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
    let trie = new Trie();

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
    let trie = new Trie();
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

  it('should keep track of how many words. Duplicate words should not count twice', () => {
    let trie = new Trie();

    trie.insert('gig');
    assert.equal(trie.count(), 1)

    trie.insert('gig');
    assert.equal(trie.count(), 1)

    trie.insert('giggle');
    assert.equal(trie.count(), 2)

    trie.insert('gift');
    assert.equal(trie.count(), 3)

    trie.insert('gift');
    assert.equal(trie.count(), 3)
    trie.insert('laughter');

    assert.equal(trie.count(), 4)
  })

  it('should set the node property endWord to true if node is end of word', () => {
    let trie = new Trie();
    trie.insert('gig');
    trie.insert('pot');

    assert.equal(trie.root.children.g.children.i.children.g.endWord, true);
    assert.equal(trie.root.children.p.children.o.children.t.endWord, true);
    assert.equal(trie.root.children.p.endWord, false)
  })

  it('should not suggest incorrect words that begin with the same letter', () => {
    let trie = new Trie();

    trie.insert('laugh')
    trie.insert('laughter')
    trie.insert('laude')
    trie.insert('little')

    let autocompleteList = trie.suggest('lau')
    assert.deepEqual(autocompleteList, ['laugh', 'laughter', 'laude'])
  })

  it('should suggest words that have the same first letter', () => {
    let trie = new Trie();

    trie.insert('gig')
    trie.insert('giggle')
    trie.insert('gross')
    let autocompleteList = trie.suggest('g')
    assert.deepEqual(autocompleteList, ['gig', 'giggle', 'gross'])
  })

  it('should not suggest words that do not have the same first letter', () => {
    let trie = new Trie();

    trie.insert('gig')
    trie.insert('giggle')
    trie.insert('gross')
    trie.insert('laugh')
    let autocompleteList = trie.suggest('g')
    assert.deepEqual(autocompleteList, ['gig', 'giggle', 'gross'])
  })

  it('should have access to the built in dictionary', () => {
    let trie = new Trie();

    trie.loadBuiltInDictionary();
    expect(trie.count()).to.equal(235886)
  })

  it('should be able to expand the built in dictionary', () => {
    let trie = new Trie();

    trie.loadBuiltInDictionary();
    trie.insert('superJackPotBaaaby')
    expect(trie.count()).to.equal(235887)
  })

  it('should suggest words from the built in dictionary', () => {
    let trie = new Trie();
    trie.loadBuiltInDictionary();
    let autocompleteList = trie.suggest('piz');
    assert.deepEqual(autocompleteList, ["pize", "pizza", "pizzeria", "pizzicato", "pizzle"])
  })

  it('should suggest words from the built in dictionary - test2', () => {
    let trie = new Trie();
    trie.loadBuiltInDictionary();
    let autocompleteList = trie.suggest('Zyr');
    assert.deepEqual(autocompleteList, ["Zyrenian", "Zyrian", "Zyryan"])
  })

  it('should take into account capital letters', () => {
    let trie = new Trie();
    trie.loadBuiltInDictionary();
    trie.suggest('zyr');
    expect(trie.autocomplete).to.not.equal(["Zyrenian", "Zyrian", "Zyryan"])
  })

  it('locate the last node of a string', () => {
    let trie = new Trie();
    trie.insert('loud')
    trie.insert('love')
    let lastNode = trie.locateLastNode('lo')
    assert.deepEqual(Object.keys(lastNode.children), ['u', 'v'])
  })

  it('should insert words that have not a selectionCount of zero', () => {
    let trie = new Trie()
    trie.insert('boogie')
    let lastNode = trie.locateLastNode('boogie')
    assert.equal(lastNode.selectionCount, 0)
  })

  it('should select a word', () => {
    let trie = new Trie()
    trie.insert('boogie')
    let lastNode = trie.locateLastNode('boogie')
    assert.equal(lastNode.selectionCount, 0)

    trie.select('boogie')
    assert.equal(lastNode.selectionCount, 1)
  })

  it('should give suggestion preference to most selected words', () => {
    let trie = new Trie()

    trie.insert('boo')
    trie.insert('boogie')
    trie.insert('boolean')
    trie.select('boolean')
    trie.select('boolean')
    trie.select('boogie')

    let autocompleteList = trie.suggest('boo')
    expect(autocompleteList).to.deep.equal([ 'boolean', 'boogie', 'boo' ])

  })
//******End of Describe
})
