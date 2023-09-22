import { render, screen } from '@testing-library/react';
import App from './App';

test('sample test case',()=>{
  render(<App />);
  const searchBar=screen.findByPlaceholderText("Search by name, email or role");
  expect(searchBar).not.toBe("Search by name, email or role");
})