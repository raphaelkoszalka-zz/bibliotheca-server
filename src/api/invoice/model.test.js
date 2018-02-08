import { Invoice } from '.'

let invoice

beforeEach(async () => {
  invoice = await Invoice.create({ html: 'test', price: 'test', items { title: 'test', price }: 'test', userName: 'test', userId: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = invoice.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(invoice.id)
    expect(view.html).toBe(invoice.html)
    expect(view.price).toBe(invoice.price)
    expect(view.items { title).toBe(invoice.items { title)
    expect(view.price }).toBe(invoice.price })
    expect(view.userName).toBe(invoice.userName)
    expect(view.userId).toBe(invoice.userId)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = invoice.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(invoice.id)
    expect(view.html).toBe(invoice.html)
    expect(view.price).toBe(invoice.price)
    expect(view.items { title).toBe(invoice.items { title)
    expect(view.price }).toBe(invoice.price })
    expect(view.userName).toBe(invoice.userName)
    expect(view.userId).toBe(invoice.userId)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
