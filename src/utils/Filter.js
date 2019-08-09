const doFilter = (item, filter) => {
    let { value } = filter;

    if (!(value instanceof RegExp)) {
        value = filter.value = new RegExp(value, 'i');
    }
    return value.test(item[ filter.property ]);
}

const createFilter = (filters) => {
    return item => filters.some(filter => doFilter(item, filter));
};

export { createFilter };