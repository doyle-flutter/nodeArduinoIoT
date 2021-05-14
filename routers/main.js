var mainRouter = require('express').Router(),
    path = require('path'),
    { Led } = require("johnny-five");
mainRouter.get('/', (req,res) => res.json("Start Arduino & NodeJS"));
mainRouter.get('/led/:check', (req,res) => {
    var {check} = req.params;
    var {type} = req.query;
    if(check == "view" && type === "html") return res.sendFile(path.join(__dirname, "../views/lightView.html"));
    if(!check) return res.json("pr Error");
    if(check !== "on" && check !== "off") return res.json("pr ct Error"); 
    const led = new Led(13);
    if(check === 'on') led.on(); 
    else led.fadeOut(200); 
    return res.json(`LED ${check}`);
});
module.exports = mainRouter;