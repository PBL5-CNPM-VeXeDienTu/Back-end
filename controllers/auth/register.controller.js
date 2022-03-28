const models = require(process.cwd() + '/models');
const hashHelper = require(process.cwd() + '/helpers/password-encrypter/hash-helper');
const validators = require(process.cwd() + '/helpers/validators/index');
const { transporter, mailConfig } = require(process.cwd() + '/helpers/mailer/transporter');

// Mail options
const VERIFY_EMAIL = 1;

async function register(request, respond) {
    try {
        // Check if email already registered
        const dbUser = await models.User.findOne({where:{email:request.body.email}});
        if (dbUser) {
            return respond.status(409).json({
                message: "Email already exists!",
            });
        }

        // Check if role is valid
        const dbRole = await models.Role.findOne({where:{id:request.body.role}});
        if (!dbRole) {
            return respond.status(409).json({
                message: "Invalid role!",
            });
        }

        // Create new user
        const newUser = {
            name: request.body.name,
            email: request.body.email,
            password: hashHelper.hash(request.body.password),
            role: request.body.role,
        }

        // Validate new user's data
        const validateResponse = validators.validateUser(newUser);
        if(validateResponse !== true){
            return respond.status(400).json({
                message: "Validation failed!",
                errors: validateResponse
            });
        }

        // Add new user to database
        models.User.create(newUser).then(result => {
            // Send email to verify user
            transporter.sendMail(mailConfig(result.email, VERIFY_EMAIL), function(err, info){
                console.log("Email sended successfully! Info: " + info.response);
            });

            // Create new user info
            const newUserInfo = {
                user_id: result.id,
                avatar: 'public/images/avatars/default-avatar.png',
                birthday: '',
                address: '',
                phone_number: '',
                gender: null,
            }
            models.UserInfo.create(newUserInfo);

            // Create new wallet
            const newWallet = {
                user_id: result.id,
                balance: 0
            }
            models.Wallet.create(newWallet);

            return respond.status(201).json({
                message: "Create user successfully!"
            });
        });
    } catch (error) {
        return respond.status(500).json({
            message: "Something went wrong!",
            error: error
        });
    }
}

module.exports = register;