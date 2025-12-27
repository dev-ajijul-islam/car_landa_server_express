const mongoose = require('mongoose');

const trackingStatusSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    iconCodePoint: { type: Number, required: true }, 
    isPast: { type: Boolean, default: false },
    isCurrent: { type: Boolean, default: false },
    isUpcoming: { type: Boolean, default: true },
    isFirst: { type: Boolean, default: false },
    isLast: { type: Boolean, default: false }
});

const trackingSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },
    
    statusList: [trackingStatusSchema] 
}, { timestamps: true });

module.exports = mongoose.model('Tracking', trackingSchema);