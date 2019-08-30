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

export function getCurrentIndex(left, top, { layout, margin, width, height, fixed, col }) {
    let newIndex = -1;
    let marginX = margin[0] || 0;
    let marginY = margin[1] || 0;

    layout.forEach((item, index) => {
        const { x, y } = calcPosition(index, col);
        const l = Math.round((width + marginX) * x);
        const t = Math.round((height + marginY) * y);
        if (left >= l && left <= l + width + marginX) {
            if (top >= t && top <= t + height + marginY) {
                if (fixed.indexOf(item) < 0) {
                    newIndex = index
                }
            }
        }
    });
    return newIndex
}

export function calcPosition(index, col) {
    if (index < 0) {
        console.warn('请检查KEY是否正确');
        index = 0;
    }
    return {
        x: index % col,
        y: Math.floor(index / col),
    }
}

export function move(list, fixed, direction) {
    const data = new Array(list.length).fill(undefined);
    list = list.filter((value, index) => {
        if (fixed.indexOf(value) < 0) {
            return value;
        }
        data[index] = value;
    });

    if (direction) {
        data[data.length - 1] = list.shift()
    } else {
        data[0] = list.pop()
    }

    data.forEach(((value, index) => {
        if (value === undefined) {
            data[index] = list.shift();
        }
    }));

    return data
}

export function sort(dataArr, fixedArr, from, to) {
    const min = Math.min(from, to);
    const max = Math.max(from, to);

    const a = dataArr.slice(0, min);
    const b = dataArr.slice(max + 1);
    const c = dataArr.slice(min, max + 1);

    const m = move(c, fixedArr, from < to);
    return [...a, ...m, ...b]
}
