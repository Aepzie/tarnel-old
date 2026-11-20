interface AddedNode {
  readonly nodeName?: string;
  readonly type?: string;
  readonly querySelector?: (selectors: string) => unknown;
}

interface ChildListMutation {
  readonly addedNodes: ArrayLike<unknown>;
}

export function hasAddedPasswordInput<T extends ChildListMutation>(records: readonly T[]): boolean {
  for (const record of records) {
    const nodes = record.addedNodes as ArrayLike<AddedNode>;
    for (let index = 0; index < nodes.length; index++) {
      const node = nodes[index];
      if (!node) continue;
      if (node.nodeName === 'INPUT' && node.type === 'password') return true;
      if (node.querySelector?.('input[type="password"]')) return true;
    }
  }
  return false;
}
