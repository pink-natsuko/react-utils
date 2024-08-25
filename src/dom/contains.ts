/**
 * 检查一个节点 (n) 是否在另一个节点 (root) 的子树中
 * @param root
 * @param n
 */
const contains = (root: Node | null | undefined, n?: Node) => {
    
    if (!root) return false;
    
    if (!n) return false;
    
    
    if (root.contains) return root.contains(n);
    
    // 兼容 IE11
    let node: Node | null | undefined = n;
    
    while (node) {
        if (node === n) return true;
        node = node.parentNode;
    }
    
    return false;
}

export default contains