'use strict'

const Dummy = require('dummyjs')

async function generateFeedbackData() {
    let data = []

    const minUserId = 6,
        maxUserId = 12
    const minTypeId = 1,
        maxTypeId = 3
    const minFeatureId = 1,
        maxFeatureId = 3

    for (let i = 0; i < 30; i++) {
        let feedback = {
            user_id: Math.floor(
                Math.random() * (maxUserId - minUserId + 1) + minUserId,
            ),
            type_id: Math.floor(
                Math.random() * (maxTypeId - minTypeId + 1) + minTypeId,
            ),
            feature_id: Math.floor(
                Math.random() * (maxFeatureId - minFeatureId + 1) +
                    minFeatureId,
            ),
            content: Dummy.text(20),
            is_processed: Math.random() < 0.5,
            response: '',
        }

        if (feedback.is_processed) feedback.response = Dummy.text(30)

        data.push(feedback)
    }

    return data
}

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'Feedbacks',
            await generateFeedbackData(),
        )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Feedbacks', null, {})
    },
}
