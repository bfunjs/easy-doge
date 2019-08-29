export function getClassNames(...args) {
    const names = [];
    args.forEach(item => {
        if (typeof item === 'string') {
            names.push(item);
            return
        }

        if (item instanceof Array) {
            item.forEach(cls => (typeof cls === 'string' && names.push(cls)));
            return
        }

        if (typeof item === 'object') {
            for (let key in item) {
                if (item.hasOwnProperty(key) && item[key]) {
                    names.push(key)
                }
            }
        }
    });
    return names.join(' ')
}

export function getCurrentIndex(layout, left, top, { margin, width, height }) {
    let newIndex = -1;
    let marginX = margin[0] || 0;
    let marginY = margin[1] || 0;
    Object.values(layout).forEach(item => {
        const { x, y, index, fixed } = item;
        const l = Math.round((width + marginX) * x);
        const t = Math.round((height + marginY) * y);
        if (left >= l && left <= l + width + marginX) {
            if (top >= t && top <= t + height + marginY) {
                if (!fixed) {
                    newIndex = index
                }
            }
        }
    });
    return newIndex
}
