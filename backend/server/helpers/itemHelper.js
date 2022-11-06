const express 			= require('express');
const router  			= express.Router();
const moment            = require('moment')

const itemModel         = require('../model/itemModel');
const dbModel         = require('../model/dbModel');

const { request, response } = require('../../app');


const itemStatus = ["Open", "On Progress", "Completed", "Delete"]

const submitItem = async (req, res) => {
    try{
        const dataItem = {
            title:           req.body.title,
            description:     req.body.description,
            status: 1,
            created_by: req.session.userid,
            created_date: moment().format('YYYY-MM-DD HH:mm:ss')
        }
       
        const response = await dbModel.insertQuery(dataItem, 'item')
        if(response.code === 200){
            response.message = 'Item saved successfully'
        }
        return response;
    }catch(error){
        throw new Error(error)
    }
}

const getListItem = async (req, res) => {
    try{
        const getList = await itemModel.getItemList(req)
        const response = getList
        
        return Promise.resolve(response);
    }catch(error){
        throw new Error(error)
    }
}

const updateItem = async (req, res) => {
    try{
        let detailItem = await itemModel.detailItem(req.body.itemID)
            detailItem = detailItem.data[0]

        if(detailItem.created_by === req.session.userid && detailItem.status === 0){
            const dataItem = {
                title:           req.body.title,
                description:     req.body.description
            }

            const response = await dbModel.updateQuery(dataItem, 'item', 'id', req.body.itemID)
            if(response.code === 200){
                response.message = 'Item Updated successfully'
            }
            return response;
        }
        return {code:400, message:'Access Denied'}
    }catch(error){
        throw new Error(error)
    }
}

const updateStatus = async (req, res) => {
    try{
        let detailItem = await itemModel.detailItem(req.body.itemID)
            detailItem = detailItem.data[0]

        if(detailItem.created_by === req.session.userid && detailItem.status === 0){
            const dataItem = {
                status:           req.body.status
            }

            const response = await dbModel.updateQuery(dataItem, 'item', 'id', req.body.itemID)
            if(response.code === 200){
                response.message = 'Item Updated successfully'
            }
            return response;
        }
        return {code:400, message:'Access Denied'}
    }catch(error){
        throw new Error(error)
    }
}

const deleteItem = async (req, res) => {
    try{
        const payloadDelete = { status: 3 }
        const response = await dbModel.updateQuery(payloadDelete, item, 'id', req.body.itemID)
        if(response.code === 200){
            response.message = 'Item deleted successfully'
        }
    }catch(error){
        throw new Error(error)
    }
}

module.exports = {
    submitItem,
    getListItem,
    updateItem,
    updateStatus,
    deleteItem
}