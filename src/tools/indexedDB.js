
const indexedDB={}
let dbName='mysql'
//链接数据库
indexedDB.openDB=(storeName, keyPath, indexs)=>{
    if (!window.indexedDB) {
        return alert('您的浏览器不支持该app，为了更好的体验，请使用新版chrome浏览器')
    }
    const request = window.indexedDB.open(dbName, new Date().getTime())
    return new Promise((resolve, rej) => {
        request.onerror = (e) => {
            indexedDB.onmessage({ type: '数据库连接失败', message: e })
            rej()
        }
        request.onsuccess = (e) => {
            indexedDB.db = e.target.result
            indexedDB.onmessage({ type: '数据库连接成功', message: '' })
            resolve()
        }
        request.onupgradeneeded = (e) => {
            const db = e.target.result
            if (!db.objectStoreNames.contains(storeName)) {
                const store = db.createObjectStore(storeName, { autoIncrement: true, keyPath })
                if (indexs && indexs.length) {
                    indexs.map((v) => {
                        store.createIndex(v, v, { unique: false })
                    })
                }
                store.transaction.oncomplete = (ev) => {
                    indexedDB.onmessage({ type: '创建对象仓库成功', message: '' })
                }
            }
        }
    })

}

indexedDB.onmessage=(msg)=>{
    console.log(msg.type, msg.message)
}

indexedDB.update=(storeName, data)=>{
    const store = indexedDB.db.transaction([storeName], 'readwrite').objectStore(storeName)
    return new Promise((resolve, rej) => {
        const request = store.put({
            ...data,
            lastModify: new Date().getTime()
        })
        request.onsuccess = (e) => {
            indexedDB.onmessage({
                type: '更新成功',
                message: e.target
            })
            resolve()
        }
        request.onerror = (e) => {
            indexedDB.onmessage({
                type: '更新失败',
                message: data
            })
            rej()
        }
    })
}

indexedDB.getList=(storeName)=>{
    const store = indexedDB.db.transaction([storeName]).objectStore(storeName)
    return new Promise((resolve, rej) => {
        store.getAll().onsuccess = (e) => {
            const res = e.target.result
            indexedDB.onmessage({
                type: '获取列表成功',
                message: res
            })
            resolve(res)
        }
    })
}

indexedDB.getItem=(storeName, key)=>{
    const store = indexedDB.db.transaction(storeName).objectStore(storeName)
    return new Promise((resolve, rej) => {
        const request = store.get(key)
        request.onsuccess = (e) => {
            resolve(e.target.result)
        }
        request.onerror = (e) => {
            rej()
        }
    })
}

indexedDB.deleteDBStore=(storeName, key)=>{
    const store = indexedDB.db.transaction([storeName], 'readwrite').objectStore(storeName)
    const request = store.delete(key)
    return new Promise((resolve, rej) => {
        request.onsuccess = (e) => {
            indexedDB.onmessage({
                type: '删除成功',
                message: key
            })
            resolve()
        }
        request.onerror = (e) => {
            indexedDB.onmessage({
                type: '删除失败',
                message: data
            })
            rej()
        }
    })

}

indexedDB.closeDB=()=>{
    indexedDB.db.close()
}

indexedDB.deleteDB=()=>{
    indexedDB.deleteDatabase(indexedDB.dbName)
}


export default indexedDB