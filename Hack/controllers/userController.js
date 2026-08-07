const getProfile = (req, res) => {
    res.json({
        success: true,
        data: req.user 
    });
}

module.exports = { getProfile };