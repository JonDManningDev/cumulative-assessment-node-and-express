function validateZip(req, res, next) {
    const zip = req.params.zip;
    if (zip.length === 5 && /^\d+$/.test(zip)) {
        next();
    } else {
        next(`Zip (${zip}) is invalid!`);
    }
};

module.exports = validateZip;
