
const isHTMLElement = (node: Node | null | undefined): boolean => {
    if (!node) {
        return false;
    }
    const doc = node.ownerDocument;
    const win = doc?.defaultView;
    
    return win ? node instanceof win.HTMLElement : node instanceof HTMLElement;
}

export default isHTMLElement;