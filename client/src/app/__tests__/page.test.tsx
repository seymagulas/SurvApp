import { render, screen } from '@testing-library/react'
import Home from '../page'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const text = screen.getByText(/Hello World/i)
    expect(text).toBeInTheDocument()
  })
})
