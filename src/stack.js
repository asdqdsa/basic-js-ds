const { NotImplementedError } = require('../lib/errors');

/**
 * Implement the Stack with a given interface via array.
 *
 * @example
 * const stack = new Stack();
 *
 * stack.push(1); // adds the element to the stack
 * stack.peek(); // returns the peek, but doesn't delete it, returns 1
 * stack.pop(); // returns the top element from stack and deletes it, returns 1
 * stack.pop(); // undefined
 *
 */
class Stack {
  constructor(initialCapacity = 10) {
    this.list = [];
    this.buffer = new ArrayBuffer(16);
    this.size = 0;
    this.initialCapacity = initialCapacity;
    this.capacity = this.initialCapacity;
    this.list = new Array(this.capacity);
  }
  push(element) {
    if (this.size >= this.capacity) {
      this.capacity *= 2;
      this.list.length = this.capacity;

      const tempList = new Array(this.capacity);
      for (let i = 0; i < this.size; i += 1) {
        tempList[i] = this.list[i];
      }
      this.list = tempList;
    }
    if (this.size >= this.capacity) throw new Error('Stack overflow!');
    this.list[this.size] = element;
    this.size += 1;
  }

  pop() {
    if (this.size < 1) throw new Error('Stack is empty!');
    const element = this.list[this.size - 1];
    this.size -= 1;

    if (this.size < this.capacity / 4 && this.capacity > this.initialCapacity) {
      this.capacity = Math.floor(this.capacity / 2);
      this.list.length = this.capacity;
    }

    return element;
  }

  peek() {
    if (this.size < 1) throw new Error('Stack is empty!');
    return this.list[this.size - 1];
  }
}

module.exports = {
  Stack,
};
