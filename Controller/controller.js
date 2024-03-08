const asyncWrapper = require("../Helper/Asyncwrapper");
const customApiError = require("../Helper/CustomApiError");
const dataCollection = require('../model/User.model')
const Employeelists = require("../model/Employee.model")

const jwt = require('jsonwebtoken')


let Register = asyncWrapper(async (req, res, next) => {

    let { firstname, lastname, email, mobile, password, gender, role } = req.body

    let fullname = firstname + " " + lastname
    let isemail = await dataCollection.findOne({ email })

    if (!isemail) {
        let ismobile = await dataCollection.findOne({ mobile })
        if (!ismobile) {

            let registered = await dataCollection.create({ fullname, email, mobile, password, gender, role })
            if (registered) {
                console.log("entered");
                return res.status(201).json({ error: false, message: "Registered successfully", data: registered })
            }
        }
        else {
            throw customApiError("Mobile already exists", 406)
        }

    } else {
        throw customApiError("Email already exists", 406)
    }

})

let Login = asyncWrapper(async (req, res, next) => {

    let { filedinput, password } = req.body
    let isinput;

    if (!filedinput.includes('@')) {

        isinput = await dataCollection.findOne({
            mobile: filedinput
        })
    } else {
        isinput = await dataCollection.findOne({ email: filedinput })
    }

    if (isinput) {
        if (isinput.password === password) {
            if (isinput.role === "admin") {
                let token = jwt.sign({ fullname: isinput.fullname }, "kruthi", { expiresIn: "1d" })
                return res.status(200).json({ error: false, message: "Logged in Successfully", token, fullname: isinput.fullname, role: isinput.role })
            }
            let token = jwt.sign({ fullname: isinput.fullname }, "kruthi", { expiresIn: "1d" })
            return res.status(200).json({ error: false, message: "Logged in Successfully", token, fullname: isinput.fullname, role: isinput.role })
        }
        else {
            return res.status(406).json({ error: true, message: "Invalid Password" })
        }
    } else {
        return res.status(401).json({ error: true, message: "Mobile or email not matching" })
    }
})

const Employeelist = asyncWrapper(async (req, res, next) => {

    let AllTasks = await Employeelists.find()

    if (!AllTasks) {
        return res.status(409).json({ error: true, message: "No employee found" })
    } else {
        return res.status(200).json({ error: false, message: "Employee found", AllTasks })
    }
})

const createemploye = asyncWrapper(async (req, res) => {


    let createproduct = await Employeelists.create(req.body)
    return res.status(200).json({ error: false, message: "Created successfully", data: createproduct })

})

let updateemployee = asyncWrapper(async (req, res) => {

    let { id } = req.params;
    let info = req.body
    let update = await Employeelists.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })

    if (!update) {
        return res.status(404).json({ error: true, message: "No task found" })
    }
    return res.status(200).json({ error: false, message: "Updated sucessfully", data: update })

})

let deleteemployee = asyncWrapper(async (req, res, next) => {

    let { id } = req.params;
    await Employeelists.findByIdAndDelete(id)
    return res.status(200).json({ error: false, message: "Task Deleted" })

})

const viewemployee = asyncWrapper(async (req, res, next) => {

    let { id } = req.params;

    let view = await Employeelists.findById(id)
    if (!view) {
        return res.status(201).json({ error: true, message: "No Tasks Found" })
    } else {
        return res.status(200).json({ error: false, message: "Task found", data: view })
    }
})



module.exports = { Register, Login, Employeelist, createemploye, deleteemployee, updateemployee, viewemployee }