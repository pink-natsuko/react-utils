/**
 * 获取节点的根节点
 * @param ele
 */
export const getRoot = (ele: Node) => {
    return ele?.getRootNode?.();
}

/**
 * 检查节点是否在 ShadowRoot 中
 * @param ele
 */
export const isShadow = (ele: Node) => {
    return getRoot(ele) instanceof ShadowRoot;
}

/**
 * 返回节点存在的 ShadowRoot
 * @param ele
 */
export const getShadowRoot = (ele: Node): ShadowRoot | null => {
    return isShadow(ele) ? (getRoot(ele) as ShadowRoot) : null;
}

