const jwt = require("jwt-simple");
require("dotenv").config();
const secretkey = process.env.KEY;

exports.isLoged = async (req, res, next) => {
    if(req.headers.authorization){
        try {
            let token = req.headers.authorization.replace(/['",]+/g, '');
            let payload = jwt.decode(token, secretkey);
            req.user = payload;
            next();
        } catch (err) {
            return res.status(401).send({ message: res.i18n.t('tokenLogin_401') });
        }
    }else{
        return res.status(401).send({message: "The request does not contain the authentication header."});
    }
}

exports.getInformationToken = async (tokenParam) => {
    if(tokenParam){
        try {
            let token = tokenParam.replace(/['",]+/g, '');
            let payload = jwt.decode(token, secretkey);
            return payload
        } catch (err) {
            return null
        }
    }else{
        return res.status(401).send({message: "The request does not contain the token."});
    }
}