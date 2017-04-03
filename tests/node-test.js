import { expect } from 'chai';
import { assert } from 'chai';
import Node from '../scripts/node'

describe('Node', () => {
  it('should be able to create an instance of itself', () => {
    let node = new Node();

    expect(node).to.be.instanceOf(Node);
  })

  it('should have some letter data', () => {
    let node = new Node('g');

    expect(node.data).to.equal('g');
  })

  it('should have a children object', () => {
    let node = new Node();

    assert.isObject(node.children);
  })

})
