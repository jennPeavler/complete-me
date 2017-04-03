import { expect } from 'chai';
import Node from '../scripts/node'

describe('Node', () => {
  it('should be able to create an instance of itself', () => {
    let node = new Node();

    expect(node).to.be.instanceOf(Node);
  })
})
