import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { FlyoutCharacters } from '../../components/flyout-characters/flyout-characters.tsx';
import { useCharactersStore } from '../../core/stores/stores.ts';
import { response } from '../../mocks/mock-data.ts';

describe('Flyout character', () => {
  it('should flyout must be hidden, if not selected characters', () => {
    useCharactersStore.setState({
      characters: [],
    });
    render(<FlyoutCharacters />);
    const flyout = screen.getByTestId('flyout');
    expect(flyout).not.toBeVisible();
  });
  it('should flyout must be visible, if selected characters', () => {
    useCharactersStore.setState({ characters: response.characters });
    render(<FlyoutCharacters />);
    const flyout = screen.getByTestId('flyout');
    const counter = screen.getByText(/selected characters/i);
    expect(flyout).toBeVisible();
    expect(counter).toBeInTheDocument();
    expect(counter.textContent).toContain('3');
    expect(counter.textContent).not.toContain('0');
  });
  it('Flyout should display the correct number of selected characters', () => {
    useCharactersStore.setState({ characters: response.characters });
    render(<FlyoutCharacters />);
    const counter = screen.getByText(/selected characters/i);
    expect(counter.textContent).toContain('3');
    expect(counter.textContent).not.toContain('1');
  });
  it('Should work unselect all characters button', () => {
    useCharactersStore.setState({ characters: response.characters });
    render(<FlyoutCharacters />);
    const unselectButton = screen.getByText(/unselect all/i);
    const counter = screen.getByText(/selected characters/i);
    expect(unselectButton).toBeInTheDocument();
    expect(counter.textContent).toContain('3');
    fireEvent.click(unselectButton);
    expect(counter.textContent).toContain('0');
  });
  it('Should work download button', async () => {
    useCharactersStore.setState({ characters: response.characters });
    const mockCreateObjectURL = vi.fn(() => 'blob:mock-url');
    const mockRevokeObjectURL = vi.fn();
    globalThis.URL.createObjectURL = mockCreateObjectURL;
    globalThis.URL.revokeObjectURL = mockRevokeObjectURL;
    HTMLAnchorElement.prototype.click = vi.fn();
    render(<FlyoutCharacters />);
    const downloadButton = screen.getByRole('button', { name: /download/i });
    fireEvent.click(downloadButton);
    await waitFor(() => {
      expect(mockCreateObjectURL).toBeCalled();
      expect(mockRevokeObjectURL).toBeCalled();
    });
  });
});
