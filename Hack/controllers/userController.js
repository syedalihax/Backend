const getProfile = (req, res) => {
    res.json({
        success: true,
        message: req.user 
    });
}

module.exports = { getProfile };