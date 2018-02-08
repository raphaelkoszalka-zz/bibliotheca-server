import mongoose, { Schema } from 'mongoose'

const invoiceSchema = new Schema({
  html: {
    type: String
  },
  price: {
    type: String
  },
  items { title: {
    type: String
  },
  price }: {
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
      html: this.html,
      price: this.price,
      items { title: this.items { title,
      price }: this.price },
      userName: this.userName,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
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
