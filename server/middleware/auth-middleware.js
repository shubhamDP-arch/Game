const jwt = require("jsonwebtoken")

const authMiddleware = async(req, res, next) => {

    const token = req.header("Authorization")
    const shopid = req.header("shopid")

    if(!token){
        res.status(500).json({msg: "Unauthorized Request. Please Authorize"})
    }
    const jwtToken = token.replace("Bearer", "").trim()

    try {
        const isVerified = jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET)
        if(isVerified){
            req.id = isVerified.userId
            req.shopid = shopid
            console.log("done")
            return next()
        }
    } catch (error) {
        next(error)
    }
}

module.exports = authMiddleware