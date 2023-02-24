function login(request, response) {
    response.json({
        success: 1,
        message: "test",
    });
}

module.exports = {
    login,
}