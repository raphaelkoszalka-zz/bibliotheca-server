import mongoose, { Schema } from 'mongoose'

const invoiceSchema = new Schema({
  price: {
    type: String
  },
  items : {
    type: String
  },
  userName: {
    type: String
  },
  userId: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

invoiceSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      pdfUrl: 'https://bibliotheca.raphael.website/invoices/' + this.userId + '.pdf'
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Invoice', invoiceSchema)

export const schema = model.schema
export default model
