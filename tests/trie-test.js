import { expect } from 'chai';
import { assert } from 'chai';
import Trie from '../scripts/trie'
import Node from '../scripts/node'
require ('locus')


describe('Trie', () => {

  it('should be able to make a new instance of itself', () => {
    let trie = new Trie();
    expect(trie).to.be.instanceOf(Trie);
    // console.log('instantiating trie')
    // console.log(trie)
  })

  it('should have a root will null data', () => {
    let trie = new Trie();
    assert.equal(trie.root.data, null);
    // console.log('the root data should be null ' + trie.root.data )
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
    trie.insert('gig');

    assert.equal(trie.root.children.hasOwnProperty('g'), true);
    assert.equal(trie.root.children.hasOwnProperty('f'), false);
    assert.equal(trie.root.children.g.children.hasOwnProperty('i'), true);
    assert.equal(trie.root.children.g.children.hasOwnProperty('r'), false);
    assert.equal(trie.root.children.g.children.i.children.hasOwnProperty('g'), true);
    assert.equal(trie.root.children.g.children.i.children.hasOwnProperty('x'), false);

  })

  it('should be able to insert more than one word', () => {
    let trie = new Trie();
    trie.insert('gig');
    trie.insert('laugh');

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
    assert.deepEqual(trie.root.children.l.children.a.children.u.children.g.children.h.children, {});
    // console.log('checking for empty object at end')
    // console.log(trie.root.children.l.children.a.children.u.children.g.children.h.children)
  })

  it('should build onto an existing data structure', () => {
    let trie = new Trie();
    trie.insert('gig');
    trie.insert('gift');

    assert.equal(trie.root.children.hasOwnProperty('g'), true);
    assert.equal(trie.root.children.g.children.hasOwnProperty('i'), true);
    assert.equal(trie.root.children.g.children.i.children.hasOwnProperty('g'), true);
    assert.equal(trie.root.children.g.children.i.children.hasOwnProperty('f'), true);
    assert.equal(trie.root.children.g.children.i.children.hasOwnProperty('z'), false);
    // console.log('Want to see that i has children f and g')
    // console.log(trie.root.children.g.children.i);
    //
    // console.log(trie.root.children.g.children.i.children);

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

    // console.log('THE CHILDREN OF G')
    // console.log(trie.root.children.g.children)
    //
    // console.log('THE CHILDREN OF L')
    // console.log(trie.root.children.l.children)
  })

  it('should keep track of how many words it has', () => {
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
    trie.suggest('lau')
    assert.deepEqual(trie.autocomplete, ['laugh', 'laughter', 'laude'])
  })

  it('should suggest words that have the same first letter', () => {
    let trie = new Trie();

    trie.insert('gig')
    trie.insert('giggle')
    trie.insert('gross')
    trie.suggest('g')
    assert.deepEqual(trie.autocomplete, ['gig', 'giggle', 'gross'])
  })

  it('should not suggest words that do not have the same first letter', () => {
    let trie = new Trie();

    trie.insert('gig')
    trie.insert('giggle')
    trie.insert('gross')
    trie.insert('laugh')
    trie.suggest('g')
    assert.deepEqual(trie.autocomplete, ['gig', 'giggle', 'gross'])
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
    trie.suggest('piz');
    assert.deepEqual(trie.autocomplete, ["pize", "pizza", "pizzeria", "pizzicato", "pizzle"])
  })

  it('should suggest words from the built in dictionary - test2', () => {
    let trie = new Trie();
    trie.loadBuiltInDictionary();
    trie.suggest('Zyr');
    assert.deepEqual(trie.autocomplete, ["Zyrenian", "Zyrian", "Zyryan"])
  })

  it('should take into account capital letters', () => {
    let trie = new Trie();
    trie.loadBuiltInDictionary();
    trie.suggest('zyr');
    expect(trie.autocomplete).to.not.equal(["Zyrenian", "Zyrian", "Zyryan"])
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

  it('should insert words that have not been selected', () => {
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

  it.only('be a test', () => {
    let trie = new Trie()
    trie.insert('boo')
    trie.insert('boogie')
    trie.insert('boobies')
    trie.select('boobies')
    trie.select('boobies')
    trie.select('boogie')
    trie.suggest('boo')
  })
//******End of Describe
})
