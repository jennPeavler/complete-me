import { expect } from 'chai';
import { assert } from 'chai';
import Node from '../scripts/node'

let node;

describe('Node', () => {
  beforeEach( () => {
    node = new Node();
  });

  it('should be able to create an instance of itself', () => {
    expect(node).to.be.instanceOf(Node);
  });

  it('should have some letter data', () => {
    node = new Node('g');
    expect(node.data).to.equal('g');
  });

  it('should have a children object', () => {
    assert.isObject(node.children);
  });

  it('should not have any selections', () => {
    expect(node.selectionCount).to.equal(0);
  });

});
