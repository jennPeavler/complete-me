import { expect } from 'chai';
import Trie from '../scripts/trie'
import Node from '../scripts/node'

describe('Trie', () => {
  it('should be able to make a copy of itself', () => {
    let trie = new Trie();

    expect(trie).to.be.instanceOf(Trie);
  })
})
