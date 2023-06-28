import { render } from '@testing-library/react';
import UserProfilePage from '../dashboard/userPage/page';

it('renders homepage unchanged', () => {
  const { container } = render(<UserProfilePage />);
  expect(container).toMatchSnapshot();
});
