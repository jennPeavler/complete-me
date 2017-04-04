import { expect } from 'chai';
import { assert } from 'chai';
import Trie from '../scripts/trie'
import Node from '../scripts/node'


describe('Trie', () => {
  let trie = new Trie();

  it('should be able to make a new instance of itself', () => {
    expect(trie).to.be.instanceOf(Trie);
    // console.log('instantiating trie')
    // console.log(trie)
  })

  it('should have a root will null data', () => {
    assert.equal(trie.root.data, null);
    // console.log('the root data should be null ' + trie.root.data )
  })

  it('should have a root that has a children object', () => {
    assert.isObject(trie.root.children);
  })

  it('should start with no children in its root', () => {
    assert.deepEqual(Object.keys(trie.root.children), []);
  })

  it('should split a word into an array of letters', () => {
    assert.deepEqual(trie.insert('gig'), ['g', 'i', 'g']);
  })

  it('should be able to add nodes for letters in words', () => {
    trie.insert('gig');

    assert.equal(trie.root.children.hasOwnProperty('g'), true);
    assert.equal(trie.root.children.hasOwnProperty('f'), false);
    assert.equal(trie.root.children.g.children.hasOwnProperty('i'), true);
    assert.equal(trie.root.children.g.children.hasOwnProperty('r'), false);
    assert.equal(trie.root.children.g.children.i.children.hasOwnProperty('g'), true);
    assert.equal(trie.root.children.g.children.i.children.hasOwnProperty('x'), false);

  })

  it('should be able to insert more than one word', () => {
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
    trie.insert('gig');
    trie.insert('giggle');
    trie.insert('gift');
    trie.insert('laugh');
    trie.insert('laughter');
    trie.insert('love');
    trie.insert('gross');

    console.log('THE CHILDREN OF G')
    console.log(trie.root.children.g.children)

    console.log('THE CHILDREN OF L')
    console.log(trie.root.children.l.children)
  })

  it('should keep track of how many words it has', () => {
    trie.insert('gig');
    // assert.equal(trie.count(), 1)
    trie.insert('giggle');
    // assert.equal(trie.count(), 2)
    trie.insert('gift');
    // assert.equal(trie.count(), 3)
    trie.insert('laugh');
    trie.insert('laughter');
    trie.insert('love');
    trie.insert('gross');
    assert.equal(trie.count(), 7)
  })

  it('should suggest a word(s) after partial input', () => {
    trie.suggest('lau')
    // assert.deepEqual(trie.suggest('lau'), ['laugh', 'laughing'])

  })



})
