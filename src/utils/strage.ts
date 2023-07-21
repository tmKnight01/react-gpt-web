

// interface StorageData<T = any> {
//     data: T
//     expire: number | null
// }  // 数据需要有过期时间


function createLocalStorage() {
    function get(key: string) {
        const data = localStorage.getItem(key);

        if (data) {
            let StorageData = null;

            try {
                StorageData = JSON.parse(data);
                return StorageData;
            } catch (err) {
                console.log("err", err);
            }
        }
    }


    function set<T>(key: string, data: T) {
        try {

            window.localStorage.setItem(key, JSON.stringify(data))

        } catch (err) {
            console.log('err', err)
        }

    }

    function remove(key: string) {
        window.localStorage.removeItem(key);
    }



    return { get, set, remove }
}


export const ls = createLocalStorage();