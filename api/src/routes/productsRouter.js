const { Router } = require("express");
const router = Router();
const getApiProducts = require("../controllers/getProducts.js");
const Product = require("../models/Product.js")
const axios = require("axios")

router.get("/", async(req, res) =>{
    try {
        let products = await Product.find();
         res.status(200).json(products);
    } catch (error) {
         res.status(404).send({"le erraste chamigo": error});
    }
});



router.post("/", async (req, res)=>{
    try {
        let obj = req.body
   const a = Product(obj)
   const s = await a.save()
   return res.status(200).json(s)
    } catch (error) {
        res.status(400).send("something get wrong posting")
    } 
});

module.exports = router;