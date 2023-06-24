import { render, screen } from '@testing-library/react';
import MultiChoiceQuestion from '../components/MultichoiceQuestion';
import React from 'react';
describe('Home', () => {
  it('renders a heading', () => {
    render(<MultiChoiceQuestion />);
    // const text = screen.getByText('Homepage');
    // expect(text).toBeInTheDocument();
  });
});
