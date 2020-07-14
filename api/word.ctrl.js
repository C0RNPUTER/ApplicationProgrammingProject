const WordModel = require('../models/word');
const mongoose = require('mongoose');
const Word = require('../models/word');
const jwt = require("jsonwebtoken")

const list = (req, res) => {
    WordModel.find((err, result) => {
        if (err) throw err;
        res.render("index", { result });
    })
}

const categoryList = (req, res) => {
    WordModel.find((err, result) => {
        if (err) throw err;
        var arr = [];
        var i = 0;
        result.forEach(category => {
            arr[i] = category.category;
            i++;
        })
        arr= arr.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
        res.render("category", { arr });
    });
}

const findWordbyCategory = (req, res) => {
    WordModel.find({ category: req.params.category }, function (err, result) {
        if (err) throw err;
        res.json(result);
    })
}

const create = (req, res) => {
    const { text, category } = req.body;
    if (!text || !category) return res.status(400).send("Input Error");
    WordModel.findOne({ text }, (err, result) => {
        if (err) return res.status(500).send("Can't Search");
        if (result) return res.status(409).send("Already Existing Word");
        WordModel.create({ text, category }, (err, result) => {
            if (err) return res.status(500).send("error");
            res.status(201).json(result);
        })
    })
}

const remove = (req, res) => {
    const { text } = req.params;

    WordModel.findOneAndRemove({ text }, (err, result) => {
        if (err) return res.status(500).send(err);
        if (!result) return res.status(404).send("404 Not Found");
        res.json(result);
    })
}

const showEnterance = (req, res) => {
    res.render("enter");
}

const checkPasswd = (req, res) => {
    const password = req.body.password;
    const key = "나를 죽이지 못하는 고통은 나를 더 강하게 해준다";
    if (key.localeCompare(password)) {
        return res.status(500).send("Wrong Password");
    }
    else {
        const token = jwt.sign("Not Gay", "KingDefense")
        res.cookie("token", token, { httpOnly: true });
        res.status(201).end();
    }
}

const checkAuth = (req, res, next) => {
    const token = req.cookies.token;
    const key = jwt.sign("Not Gay", "KingDefense");
    console.log(token, key)
    
    if (key.localeCompare(token)) {
        if (req.url === "/auth")
            return next();
        else
            return res.render("enter");
    }
    else
        next();
}

const redirect = (req, res) => {
    list(req,res);
}

module.exports = { list, create, remove, categoryList, findWordbyCategory, showEnterance, checkPasswd, checkAuth, redirect };