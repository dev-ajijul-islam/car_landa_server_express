const authMiddleware = async (req, res, next)  => {
    const token = req.headers.token;
    res.status(200).send({
        success : true,
        message : "midleware hitted success",
        token : token
    })
    next();
};

module.exports = authMiddleware;