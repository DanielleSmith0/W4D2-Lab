const houses = require("./db.json");
const globalId = 4;

module.exports = {
    getHouses: (req, res) => {
        res.status(200).send(houses);
    },
    deleteHouse: (req, res) => {
        const { id } = req.params;
        const idx = houses.findIndex(house => house.id === +id);
        if(idx >= 0){
            houses.splice(idx, 1);
            res.status(200).send(houses);
        }else{
            res.status(400);
        }

    },
    createHouse: (req, res) => {
        let {address, price, imageURL} = req.body 
        let newHouse = {
            id: globalId,
            address,
            price,
            imageURL
        }
        if(!address && !price && !imageURL) {
            res.status(404);
        }else{
            houses.push(newHouse);
            res.status(200).send(houses);
            globalId++;
        }
    },
    updateHouse: (req, res) => {
        const { id } = req.params;
        const { type } = req.body;
        const idx = houses.findIndex(house => house.id === +id);
        if(type === "plus"){
            houses[idx].price = houses[idx].price +10000;
            res.status(200).send(houses);
        }else if (type === "minus" && houses[idx].price > 10000){
            houses[idx].price = houses[idx].price -10000;
            res.status(200).send(houses);
        }
    }
}


