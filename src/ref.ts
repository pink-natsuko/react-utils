import {Attributes, isValidElement, ReactElement, ReactNode, Ref, version} from 'react'
import { ForwardRef, isFragment, isMemo } from 'react-is';
import useMemo from './hooks/useMemo'

/**
 * 将一个 node 值赋给传入的 ref, 确保在不同类型的 ref 中正确地设置引用
 * @param ref
 * @param node
 */
export const fillRef = <T>(ref: Ref<T>, node: T) => {
    if (typeof ref === 'function') {
        ref(node);
    } else if (typeof ref === 'object' && ref && 'current' in ref) {
        (ref as any).current = node;
    }
};

/**
 * 组合多个 ref
 * @param refs 可变参数，表示可以传入多个 ref
 */
export const composeRef = <T>(...refs: Ref<T>[]): Ref<T> => {
    const refList = refs.filter(Boolean);
    if (refList.length <= 1) {
        return refList[0];
    }
    return (node: T) => {
        refs.forEach(ref => {
            fillRef(ref, node);
        });
    };
};

/**
 * 将多个 ref 组合成一个新的 ref，并利用 useMemo 来优化性能，避免不必要的重新计算
 * @param refs
 */
export const useComposableRef = <T>(...refs: Ref<T>[]): Ref<T> => {
    return useMemo(
        () => composeRef(...refs),
        refs,
        (prev, next) =>
            prev.length !== next.length || prev.every((ref, i) => ref !== next[i]),
    );
}

/**
 * 是否支持 ref
 * @param nodeOrComponent
 */
export const supportRef = (nodeOrComponent: any): boolean => {
    
    const type = isMemo(nodeOrComponent)
        ? nodeOrComponent.type.type
        : nodeOrComponent.type;
    
    // Function component node
    if (
        typeof type === 'function' &&
        !type.prototype?.render &&
        type.$$typeof !== ForwardRef
    ) {
        return false;
    }
    
    // Class component
    if (
        typeof nodeOrComponent === 'function' &&
        !nodeOrComponent.prototype?.render &&
        nodeOrComponent.$$typeof !== ForwardRef
    ) {
        return false;
    }
    return true;
}

interface RefAttributes<T> extends Attributes {
    ref: Ref<T>;
}

/**
 * 判断一个节点是否是一个有效的 React 元素，并且不是一个 React Fragment
 * @param node
 */
const isReactElement = (node: ReactNode) => {
    return isValidElement(node) && !isFragment(node);
}

/**
 * 用于检查一个 ReactNode 是否是一个支持 ref 属性的 React 元素
 * @param node
 */
export const supportNodeRef = <T = any>(
    node: ReactNode,
): node is ReactElement & RefAttributes<T> => {
    return isReactElement(node) && supportRef(node);
};

/**
 * 是一个用于获取 React 节点的 ref 的函数, 以兼容的方式来获取 ref
 */
export const getNodeRef: <T = any>(node: ReactNode,) => Ref<T> | null =
    Number(version.split('.')[0]) >= 19
        ? // >= React 19
        node => {
            if (isReactElement(node)) {
                return (node as any).props.ref;
            }
            return null;
        }
        : // < React 19
        node => {
            if (isReactElement(node)) {
                return (node as any).ref;
            }
            return null;
        };
