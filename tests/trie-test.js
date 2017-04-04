import { expect } from 'chai';
import { assert } from 'chai';
import Trie from '../scripts/trie'
import Node from '../scripts/node'


describe('Trie', () => {
  let trie = new Trie();

  it('should be able to make a new instance of itself', () => {
    expect(trie).to.be.instanceOf(Trie);
    console.log('instantiating trie')
    console.log(trie)
  })

  it('should have a root will null data', () => {
    assert.equal(trie.root.data, null);
    console.log('the root data should be null ' + trie.root.data )
  })

  it('should have a root that has a children object', () => {
    assert.isObject(trie.root.children);
  })

  it('should start with no children in its root', () => {
    assert.deepEqual(Object.keys(trie.root.children), []);
  })

  // it('should split a word into an array of letters', () => {
  //   assert.deepEqual(trie.insert('gig'), ['g', 'i', 'g']);
  // })

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
  })


})
