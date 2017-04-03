import { expect } from 'chai';
import Trie from '../scripts/trie'
import Node from '../scripts/node'

describe('Trie', () => {

  it('should be able to make a new instance of itself', () => {
    let trie = new Trie();

    expect(trie).to.be.instanceOf(Trie);
  })

  it('should have a root will null data', () => {


  })


  // it('should be able to add a new node')


})
