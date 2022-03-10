const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema(
    {
        pizzaName: {
            type: String,
            required: true,
            trim: true
        },
        createdBy: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        size: {
            type: String,
            required: true,
            enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
            default: 'Large'
        },
        toppings: [],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ],
        createdAt: {
            type: Date,
            default: Date.now,
            required: true,
            trim: true,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function () {
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

// export the Pizza model
module.exports = Pizza;