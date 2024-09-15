// BST.ts
class TreeNode {
  key: string;
  value: any;
  left: TreeNode | null = null;
  right: TreeNode | null = null;

  constructor(key: string, value: any) {
    this.key = key;
    this.value = value;
  }
}

export class BinarySearchTree {
  root: TreeNode | null = null;

  insert(key: string, value: any) {
    const newNode = new TreeNode(key, value);

    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  private insertNode(node: TreeNode, newNode: TreeNode) {
    if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  search(key: string): any[] {
    return this.searchNode(this.root, key);
  }

  private searchNode(node: TreeNode | null, key: string): any[] {
    if (node === null) {
      return [];
    }

    if (key === node.key) {
      return [node.value];
    } else if (key < node.key) {
      return this.searchNode(node.left, key);
    } else {
      return this.searchNode(node.right, key);
    }
  }
}
