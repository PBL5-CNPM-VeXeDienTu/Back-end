const register = require('./register.controller')
const login = require('./login.controller')
const verifyEmail = require('./verify_email.controller')
const changePassword = require('./change_password.controller')
const forgotPassword = require('./forgot_password.controller')
const resetPassword = require('./reset_password.controller')
const getAuthenticatedUser = require('./get_authenticated_user.controller')

module.exports = {
    register: register,
    login: login,
    verifyEmail: verifyEmail,
    changePassword: changePassword,
    forgotPassword: forgotPassword,
    resetPassword: resetPassword,
    getAuthenticatedUser: getAuthenticatedUser,
}
