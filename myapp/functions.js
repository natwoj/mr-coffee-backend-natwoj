const addId = (arr) => {
    arr.forEach((obj, index) => {
        obj["added_id"] = index;
    });
    return arr;
};

module.exports = { addId: addId };