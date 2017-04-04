import { expect } from 'chai';
import { assert } from 'chai';
import Trie from '../scripts/trie'
import Node from '../scripts/node'

describe('Trie', () => {
  let trie = new Trie();

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

  it('should split a word into an array of letters', () => {
    assert.deepEqual(trie.insert('gig'), ['g', 'i', 'g']);
  })

  // it('should be able to add a new node', () => {
  //   addNode('g', 'i');
  // })


})
