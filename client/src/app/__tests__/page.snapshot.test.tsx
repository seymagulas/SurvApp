import { render } from '@testing-library/react';
import Home from '../Home/page';

it('renders homepage unchanged', () => {
  const { container } = render(<Home />);
  expect(container).toMatchSnapshot();
});
