import { Basket } from '.'
import { User } from '../user'

let user, basket

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  basket = await Basket.create({ userId: user, title: 'test', subtitle: 'test', selfLink: 'test', thumbnail: 'test', price: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = basket.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(basket.id)
    expect(typeof view.userId).toBe('object')
    expect(view.userId.id).toBe(user.id)
    expect(view.title).toBe(basket.title)
    expect(view.subtitle).toBe(basket.subtitle)
    expect(view.selfLink).toBe(basket.selfLink)
    expect(view.thumbnail).toBe(basket.thumbnail)
    expect(view.price).toBe(basket.price)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = basket.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(basket.id)
    expect(typeof view.userId).toBe('object')
    expect(view.userId.id).toBe(user.id)
    expect(view.title).toBe(basket.title)
    expect(view.subtitle).toBe(basket.subtitle)
    expect(view.selfLink).toBe(basket.selfLink)
    expect(view.thumbnail).toBe(basket.thumbnail)
    expect(view.price).toBe(basket.price)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
