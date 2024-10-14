import React from 'react';
import { render, act, waitFor } from '@testing-library/react';
import SuccessCard from '../cards/sucessCards';
import '@testing-library/jest-dom'

jest.useFakeTimers();

describe('SuccessCard', () => {
  test('shows success card when isOpen is true', () => {
    const { getByText } = render(<SuccessCard isOpen={true} message="Success!" />);
    expect(getByText('Success!')).toBeInTheDocument(); // Ensure it appears immediately
  });

  test('hides success card after 3 seconds', async () => {
    const { queryByText } = render(<SuccessCard isOpen={true} message="Success!" />);

    // Assert it's visible at first
    expect(queryByText('Success!')).toBeInTheDocument();

    // Use act to fast forward time and trigger setTimeout
    act(() => {
      jest.advanceTimersByTime(3000); // Fast forward 3 seconds
    });

    // Use waitFor to wait for the state update
    await waitFor(() => expect(queryByText('Success!')).toBeNull());
  });

  test('does not show card when isOpen is false', () => {
    const { queryByText } = render(<SuccessCard isOpen={false} message="Success!" />);
    expect(queryByText('Success!')).toBeNull(); // Should not appear when isOpen is false
  });
});

