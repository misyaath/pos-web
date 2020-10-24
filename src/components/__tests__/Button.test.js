import React from 'react';
import {render, cleanup, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Button from "../Button";

afterEach(cleanup);

it('should Render Button without crush', function () {
  render(<Button onClickHandler={() => {
  }} loading={false} text='login'/>)
});

it('button should render normal button when not loading', function () {
  const wrapper = render(<Button onClickHandler={() => {
  }} loading={false} text='login'/>)
  expect(wrapper.getByText('login').tagName).toBe('BUTTON');
});

it('button should render loading button when loading', function () {
  const wrapper = render(<Button onClickHandler={() => {
  }} loading={true} text='login'/>)
  expect(wrapper.getByText('Loading...').tagName).toBe('BUTTON')
  expect(wrapper.getByText('Loading...')).toHaveAttribute('disabled');
});
