export const arrayToTree2 = (allmenus) => {
    allmenus.forEach(i => {    // 形成树之前处理一下状态和创建时间
        i.status = i.status == 1 ? '正常' : '停用';
        // i.createtime = timestampToTime(i.createtime);
    });
    let result = [];
    if (!Array.isArray(allmenus) || allmenus.length === 0) {
        return result
    }
    let map = {};
    allmenus.forEach(item => map[item.id] = item);
    allmenus.forEach(item => {
        const parent = map[item.pid];
        if (parent) {
            (parent.children || (parent.children = [])).push(item);
        } else {
            result.push(item);
        }
    })
    return result;
};




export const arrayToTree = (arr) => {
    let result = [];
    if (!Array.isArray(arr) || arr.length === 0) {
        return result
    }
    let map = {};
    arr.forEach(item => map[item.deptId] = item);
    arr.forEach(item => {
        const parent = map[item.parentId];
        if (parent) {
            (parent.children || (parent.children = [])).push(item);
        } else {
            result.push(item);
        }
    })
    return result
}