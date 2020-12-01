//防抖
export function debounce(func, delay) {
    let timer = null
    if (timer) clearTimeout(timer)
    return function(...args) {
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}