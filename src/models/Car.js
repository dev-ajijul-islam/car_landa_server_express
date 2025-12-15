const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["percentage", "flat"],
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

const pricingSchema = new mongoose.Schema({
  originalPrice: {
    type: Number,
    required: true,
  },
  sellingPrice: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: "USD",
  },
  discount: discountSchema,
});

const locationSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
});

const mediaSchema = new mongoose.Schema({
  thumbnail: {
    type: String,
    required: true,
  },
  gallery: [
    {
      type: String,
    },
  ],
});

const flagsSchema = new mongoose.Schema({
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isHotDeal: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const specsSchema = new mongoose.Schema({
  mileageKm: {
    type: Number,
    required: true,
  },
  enginePowerHp: {
    type: Number,
    required: true,
  },
  fuelType: {
    type: String,
    required: true,
  },
  cylinders: {
    type: Number,
    required: true,
  },
  transmission: {
    type: String,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  interiorColor: {
    type: String,
    required: true,
  },
  exteriorColor: {
    type: String,
    required: true,
  },
});

const costsSchema = new mongoose.Schema({
  shipping: {
    type: Number,
    default: 0,
  },
  customClearance: {
    type: Number,
    default: 0,
  },
});

const inquiryContactsSchema = new mongoose.Schema({
  call: {
    type: Boolean,
    default: false,
  },
  message: {
    type: Boolean,
    default: false,
  },
  whatsapp: {
    type: Boolean,
    default: false,
  },
});

const carSchema = new mongoose.Schema(
  {
    // Basic Information
    title: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
    },

    pricing: pricingSchema,

    location: locationSchema,

    media: mediaSchema,

    flags: flagsSchema,

    specs: specsSchema,

    costs: costsSchema,

    carTypeId: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    inquiryContacts: inquiryContactsSchema,
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model("Car", carSchema);
module.exports = Car;
