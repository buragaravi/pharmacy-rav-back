const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema(
  {
    facultyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    labId: {
      type: String,
      required: true,
    },
    experiments: [
      {
        experimentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Experiment',
          required: true
        },
        experimentName: {
          type: String,
          required: true
        },
        date: {
          type: Date,
          required: true
        },
        session: {
          type: String,
          required: true,
          enum: ['morning', 'afternoon']
        },
        chemicals: [
          {
            chemicalName: {
              type: String,
              required: true
            },
            quantity: {
              type: Number,
              required: true,
              min: 0
            },
            unit: {
              type: String,
              required: true
            },
            chemicalMasterId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'ChemicalMaster'
            },
            allocatedQuantity: {
              type: Number,
              default: 0
            },
            isAllocated: {
              type: Boolean,
              default: false
            },
            allocationHistory: [
              {
                date: Date,
                quantity: Number,
                allocatedBy: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'User'
                }
              }
            ]
          },
        ],
        equipment: [
          {
            itemId: { type: String, required: true }, // Unique equipment item
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            name: { type: String, required: true },
            variant: { type: String },
            unit: { type: String },
            status: { type: String }, // e.g., 'Available', 'Issued', etc.
            isAllocated: { type: Boolean, default: false },
            allocationHistory: [
              {
                date: Date,
                allocatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
              }
            ]
          }
        ],
        glassware: [
          {
            glasswareId: { type: mongoose.Schema.Types.ObjectId, ref: 'GlasswareLive', required: true },
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            name: { type: String, required: true },
            variant: { type: String },
            quantity: { type: Number, required: true, min: 0 },
            unit: { type: String },
            isAllocated: { type: Boolean, default: false },
            allocationHistory: [
              {
                date: Date,
                quantity: Number,
                allocatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
              }
            ]
          }
        ]
      },
    ],
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'fulfilled', 'partially_fulfilled'],
      default: 'pending',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

// Indexes for efficient querying
requestSchema.index({ facultyId: 1, status: 1 });
requestSchema.index({ 'experiments.date': 1 });
requestSchema.index({ 'experiments.experimentId': 1 });

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;