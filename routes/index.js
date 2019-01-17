const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);
//healthcheck route
router.get("/", (req, res) => {
    res.status(200).send({
        success: true,
        message: "this is a test route"
    })
})
module.exports = router;
