function doCache() {
    return process.env.caching != undefined;
}

module.exports = {
    doCache: doCache,

    add: (key, value, expire) => {
        if (doCache() && key && value){
            global.REDIS_CLIENT.set(key, value);

            if (expire)
                global.REDIS_CLIENT.expire(key, expire);
        }
    },

    get: async (key) => {
        if (key != undefined && doCache())
            return await global.REDIS_CLIENT.get(key);
        
        return null;
    }
};