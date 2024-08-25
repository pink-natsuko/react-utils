
const isElement = (node: Node | null | undefined): boolean => {
    if (!node || !node.ownerDocument) {
        return false;
    }
    return node.nodeType === Node.ELEMENT_NODE;
}

export default isElement;