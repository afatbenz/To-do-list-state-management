const express 			= require('express');
const router  			= express.Router();
const moment            = require('moment')
const encryptionHelper  = require('../helpers/encryptionHelper')
const reply             = require('../helpers/response')
const authModel         = require('../model/authModel');

const authValidation = (req, res, skip) => {
    let userID;
    if(!req.headers.authorization && !req.body.headers['Authorization']){
        throw {code:401, messaege: `Unauthorized`};
    }
    const token = req.headers.authorization || req.body.headers['Authorization']

    if(req.session.userid){
        userID = req.session.userid
    }else{
        const decryptedToken = encryptionHelper.decryptPayload(token)
        if(decryptedToken){
            userID = decryptedToken.profile.id
            req.session.userid = decryptedToken.profile.id;
        }
    }

    if(!token || (!userID && !skip)){
        throw {code:401, messaege: `Unauthorized`};
    }
    req = { ...req, auth: {userID} }
}

const msisdnFormat = async (msisdn) => {
    try{
        if(msisdn.substring(0,3) === '+62'){
            msisdn = msisdn.slice(0,3)
        }
        if(msisdn.substring(0,2) === '62' || msisdn.substring(0,2) === '08'){
            msisdn = msisdn.slice(0,2)
        }
        return msisdn
    }
    catch(err){
        res.status(500).send({message:`Internal Server Error`})
    }
}

const getAccessUser = (response, auth)=> {
    try{
        let isOwner
        const secretID  = encryptionHelper.decryptString(auth.secretID)
        const ownerID   = encryptionHelper.decryptString(response.ownerID)
        return !!(secretID === ownerID || secretID == 1);
    }catch(err){
    }
}

module.exports = {
    msisdnFormat,
    getAccessUser,
    authValidation
}