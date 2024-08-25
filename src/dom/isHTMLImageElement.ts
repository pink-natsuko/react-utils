import isElement from './isElement'

const isHTMLImageElement = (node: Node | null | undefined): boolean => {
    if (!node || !node.ownerDocument) {
        return false;
    }
    return isElement(node) && node.nodeName === 'IMG';
};

export default isHTMLImageElement;