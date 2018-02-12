import mongoose, { Schema } from 'mongoose'

const basketSchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String
  },
  subtitle: {
    type: String
  },
  selfLink: {
    type: String
  },
  thumbnail: {
    type: String
  },
  price: {
    type: String
  },
  googleId: {
    type: String
  },
  queryId: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

basketSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      userId: this.userId.view(full),
      title: this.title,
      subtitle: this.subtitle,
      selfLink: this.selfLink,
      thumbnail: this.thumbnail,
      price: this.price,
      googleId: this.googleId,
      queryId: this.queryId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Basket', basketSchema)

export const schema = model.schema
export default model
