const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
// class Node {
//   constructor(data) {
//     this.data = data;
//     this.left = null;
//     this.right = null;
//   }
// }

class BinarySearchTree {
  constructor(data = null) {
    this.rootNode = data ? new Node(data) : null;
    this.count = 0;
  }

  size() {
    return this.count;
  }

  root() {
    return this.rootNode ? this.rootNode : null;
  }

  // insert
  add(data) {
    this.count += 1;

    let newNode = new Node(data);

    const searchTree = (node) => {
      if (data < node.data) {
        if (!node.left) node.left = newNode;
        else searchTree(node.left);
      } else if (data > node.data) {
        if (!node.right) node.right = newNode;
        else searchTree(node.right);
      }
    };

    if (this.rootNode === null) {
      this.rootNode = newNode;
    }
    searchTree(this.rootNode);
  }

  has(data) {
    let curr = this.rootNode;

    while (curr) {
      if (curr && curr.data === data) return true;
      if (curr && curr.data > data) curr = curr.left;
      if (curr && curr.data < data) curr = curr.right;
    }

    return false;
  }

  find(data) {
    let curr = this.rootNode;

    while (curr) {
      if (curr && curr.data === data) return curr;
      if (curr && curr.data > data) curr = curr.left;
      if (curr && curr.data < data) curr = curr.right;
    }

    return null;
  }

  remove(data) {
    let curr = this.rootNode;
    let parent = null;

    while (curr && curr.data !== data) {
      parent = curr;
      if (curr && curr.data > data) curr = curr.left;
      if (curr && curr.data < data) curr = curr.right;
    }
    if (!curr) return null;

    // leaf node case
    if (!curr.left && !curr.right) {
      if (curr === this.rootNode) this.rootNode = null;
      if (parent && curr === parent.left) parent.left = null;
      if (parent && curr === parent.right) parent.right = null;
    }

    // one child case
    if (!curr.left || !curr.right) {
      const child = curr.left || curr.right;
      if (curr === this.rootNode) this.rootNode = child;
      if (parent && curr === parent.left) parent.left = child;
      if (parent && curr === parent.right) parent.right = child;
    }

    // two children case
    // successor node -> min node right subtree
    else {
      let succParent = curr;
      let succ = curr.right;
      while (succ.left) {
        succParent = succ;
        succ = succ.left;
      }
      curr.data = succ.data;

      if (succParent.left === succ) succParent.left = succ.right;
      else succParent.right = succ.right;
    }

    this.count -= 1;
  }

  min() {
    let curr = this.rootNode;
    while (curr.left) curr = curr.left;
    return curr.data;
  }

  max() {
    let curr = this.rootNode;
    while (curr.right) curr = curr.right;
    return curr.data;
  }
}

module.exports = {
  BinarySearchTree,
};
