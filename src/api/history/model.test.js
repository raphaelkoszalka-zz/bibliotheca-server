import { History } from '.'
import { User } from '../user'

let user, history

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  history = await History.create({ userId: user, title: 'test', subtitle: 'test', selfLink: 'test', thumbnail: 'test', price: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = history.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(history.id)
    expect(typeof view.userId).toBe('object')
    expect(view.userId.id).toBe(user.id)
    expect(view.title).toBe(history.title)
    expect(view.subtitle).toBe(history.subtitle)
    expect(view.selfLink).toBe(history.selfLink)
    expect(view.thumbnail).toBe(history.thumbnail)
    expect(view.price).toBe(history.price)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = history.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(history.id)
    expect(typeof view.userId).toBe('object')
    expect(view.userId.id).toBe(user.id)
    expect(view.title).toBe(history.title)
    expect(view.subtitle).toBe(history.subtitle)
    expect(view.selfLink).toBe(history.selfLink)
    expect(view.thumbnail).toBe(history.thumbnail)
    expect(view.price).toBe(history.price)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
