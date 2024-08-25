
export interface TargetPoint {
    clientX?: number;
    clientY?: number;
    pageX?: number;
    pageY?: number;
}

/**
 * 比较两个坐标点（prev 和 next）是否相同
 * @param prev
 * @param next
 */
const isSamePoint = (prev: TargetPoint, next: TargetPoint) => {
    
    if (prev === next) return true;
    
    if (!prev || !next) return false;
    
    if ('pageX' in next && 'pageY' in next) {
        return prev.pageX === next.pageX && prev.pageY === next.pageY;
    }
    
    if ('clientX' in next && 'clientY' in next) {
        return prev.clientX === next.clientX && prev.clientY === next.clientY;
    }
    
    return false;
    
};

export default isSamePoint