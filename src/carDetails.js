const axios = require('axios');

const getAllMakesList = (req, res, next) => {
    axios.get("https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json").then(ele => {
        let makesList = ele.data.Results;
        let makes = [];
        makesList.map(make => {
            makes.push(make.Make_Name)
        });

        if (makes.length > 0) {
            res.status(200).json({ data: makes });
        } else {
            res.status(404).json({ "message": "Makes not found" });
        }
    }).catch(error => {
        next(error);
    })
}

const allModelsList = (req, res, next) => {
    let { make, year } = req.params;
    if (make != undefined && year != undefined && typeof make == 'string' && year != 'string') {
        axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${make}/modelyear/${year}?format=json`).then(ele => {
            let data = ele.data.Results;
            let modelsList = [];
            data.map(model => {
                modelsList.push(model.Model_Name);
            });

            if (modelsList.length > 0) {
                res.status(200).json({ data: modelsList });
            } else {
                res.status(404).json({ "message": "Make or year requested is invalid" });
            }
        }).catch(error => {
            next(error);
        });
    } else {
        res.status(404).json({ "message": "Invalid input" });
    }
}

const getDetails = (req, res, next) => {
    let { vin } = req.params;
    if (vin.toString().length == 17) {

        axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${vin}?format=json`).then(ele => {
            let data = ele.data.Results;
            let VIN = data[0].VIN;
            let year = data[0].ModelYear;
            let make = data[0].Make;
            let model = data[0].Model;
            let details = VIN + ":" + " " + year + " " + make + " " + model;

            res.status(200).json({ data: details });

        }).catch(error => {
            next(error);
        });
    } else {
        res.status(404).json({ "message": "Invalid VIN" });
    }
}

module.exports = {
    getAllMakesList,
    allModelsList,
    getDetails
}