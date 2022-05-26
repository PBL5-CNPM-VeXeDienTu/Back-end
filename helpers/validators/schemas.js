const userSchema = {
    name: { type: 'string', optional: true },
    email: { type: 'string', optional: true },
    password: { type: 'string', optional: true },
    role: { type: 'number', optional: true },
    is_verified: { type: 'boolean', optional: true },
    qr_key: { type: 'string', optional: true },
    deleted_at: { type: 'string', optional: true },
}

const roleSchema = {
    name: { type: 'string', optional: true },
}

const userInfoSchema = {
    user_id: { type: 'number', optional: true },
    avatar: { type: 'string', optional: true },
    birthday: { type: 'string', optional: true },
    address: { type: 'string', optional: true },
    phone_number: { type: 'string', optional: true },
    gender: { type: 'number', optional: true },
}

const walletSchema = {
    user_id: { type: 'number', optional: true },
    balance: { type: 'number', optional: true },
}

const transactionSchema = {
    wallet_id: { type: 'number', optional: true },
    type_id: { type: 'number', optional: true },
    reference_id: { type: 'number', optional: true },
    amount: { type: 'number', optional: true },
}

const transactionTypeSchema = {
    type_name: { type: 'string', optional: true },
}

const vehicleSchema = {
    license_plate: { type: 'string', optional: true },
    vehicle_image: { type: 'string', optional: true },
    cavet_image_front: { type: 'string', optional: true },
    cavet_image_back: { type: 'string', optional: true },
    type_id: { type: 'number', optional: true },
    brand: { type: 'string', optional: true },
    color: { type: 'string', optional: true },
    owner_id: { type: 'number', optional: true },
    verify_state: { type: 'number', optional: true },
    deleted_at: { type: 'string', optional: true },
}

const vehicleTypeSchema = {
    type_name: { type: 'string', optional: true },
}

const parkingLotSchema = {
    name: { type: 'string', optional: true },
    address: { type: 'string', optional: true },
    avatar: { type: 'string', optional: true },
    time_slot: { type: 'string', optional: true },
    capacity: { type: 'number', optional: true },
    is_open: { type: 'boolean', optional: true },
    is_full: { type: 'boolean', optional: true },
    owner_id: { type: 'number', optional: true },
    verify_state: { type: 'number', optional: true },
    deleted_at: { type: 'string', optional: true },
}

const parkingHistorySchema = {
    user_id: { type: 'number', optional: true },
    vehicle_id: { type: 'string', optional: true },
    parking_lot_id: { type: 'number', optional: true },
    checkin_time: { type: 'string', optional: true },
    checkout_time: { type: 'string', optional: true },
    is_parking: { type: 'boolean', optional: true },
    memo: { type: 'string', optional: true },
    cost: { type: 'string', optional: true },
}

const verifyStateSchema = {
    state: { type: 'string', optional: true },
    note: { type: 'string', optional: true },
}

const parkingPriceSchema = {
    parking_lot_id: { type: 'number', optional: true },
    vehicle_type_id: { type: 'number', optional: true },
    price: { type: 'number', optional: true },
}

const packageSchema = {
    parking_lot_id: { type: 'number', optional: true },
    name: { type: 'string', optional: true },
    type_id: { type: 'number', optional: true },
    vehicle_type_id: { type: 'number', optional: true },
    price: { type: 'number', optional: true },
}

const packageTypeSchema = {
    type_name: { type: 'string', optional: true },
}

const userPackageSchema = {
    user_id: { type: 'number', optional: true },
    package_id: { type: 'number', optional: true },
    parking_lot_id: { type: 'number', optional: true },
    name: { type: 'string', optional: true },
    type_id: { type: 'number', optional: true },
    vehicle_type_id: { type: 'number', optional: true },
    price: { type: 'number', optional: true },
    expire_at: { type: 'string', optional: true },
}

const feedbackSchema = {
    user_id: { type: 'number', optional: true },
    type_id: { type: 'number', optional: true },
    feature_id: { type: 'number', optional: true },
    content: { type: 'string', optional: true },
    is_processed: { type: 'boolean', optional: true },
}

const feedbackTypeSchema = {
    type_name: { type: 'string', optional: true },
}

const featureSchema = {
    name: { type: 'string', optional: true },
}

const notificationSchema = {
    user_id: { type: 'number', optional: true },
    title: { type: 'string', optional: true },
    content: { type: 'string', optional: true },
    is_read: { type: 'boolean', optional: true },
}

const authKeySchema = {
    user_id: { type: 'number', optional: true },
    key: { type: 'string', optional: true },
}

module.exports = {
    userSchema: userSchema,
    roleSchema: roleSchema,
    userInfoSchema: userInfoSchema,
    walletSchema: walletSchema,
    transactionSchema: transactionSchema,
    transactionTypeSchema: transactionTypeSchema,
    vehicleSchema: vehicleSchema,
    vehicleTypeSchema: vehicleTypeSchema,
    parkingLotSchema: parkingLotSchema,
    parkingHistorySchema: parkingHistorySchema,
    verifyStateSchema: verifyStateSchema,
    parkingPriceSchema: parkingPriceSchema,
    packageSchema: packageSchema,
    packageTypeSchema: packageTypeSchema,
    userPackageSchema: userPackageSchema,
    feedbackSchema: feedbackSchema,
    feedbackTypeSchema: feedbackTypeSchema,
    featureSchema: featureSchema,
    notificationSchema: notificationSchema,
    authKeySchema: authKeySchema,
}
