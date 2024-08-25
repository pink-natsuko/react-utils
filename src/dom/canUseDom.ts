/**
 * 判断当前环境是否支持 DOM 操作
 */
const canUseDom = () => {
    return !!(
        typeof window !==  'undefined' &&
            window.document &&
            window.document.createElement
    )
};

export default canUseDom;