module.exports = {
    pagination(count, limit, offset = 0){
        let promise = new Promise((resolve, reject) => {
            let pages = [];
            for(let i=0;i<Math.ceil(parseFloat(count) / parseFloat(limit));i++){
                pages.push({
                    page_number: i+1,
                    offset: offset
                });
                offset += limit;
            }
            resolve(pages);
        });
        return promise;
    }
}