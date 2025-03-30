import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Tag from './Tag';
import type { TagProps } from './Tag.types';

describe('Tag Component', () => {
  const setup = (propsOverride: Partial<TagProps> = {}) => {
    const onRemoveTagMock = jest.fn();
    const defaultProps: TagProps = {
      tagName: 'React',
      onRemoveTag: onRemoveTagMock,
    };

    render(<Tag {...defaultProps} {...propsOverride} />);
    return {
      onRemoveTagMock,
    };
  };

  test('renders the tag name', () => {
    setup();
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  test('calls onRemoveTag when remove button is clicked', () => {
    const { onRemoveTagMock } = setup();
    const removeBtn = screen.getByRole('button');

    fireEvent.click(removeBtn);

    expect(onRemoveTagMock).toHaveBeenCalledWith('React');
    expect(onRemoveTagMock).toHaveBeenCalledTimes(1);
  });

  test('hides remove button when disabled is true', () => {
    setup({ disabled: true });

    // Expect the remove button to not be visible
    const removeBtn = screen.queryByRole('button');
    expect(removeBtn).toBeNull();
  });

  test('applies custom class names', () => {
    setup({
      customRemoveButtonClass: 'custom-remove-btn-class',
      customTagContentClass: 'custom-content-class',
    });

    expect(screen.getByText('React').className).toMatch(/custom-content-class/);
    const removeBtn = screen.getByRole('button');
    expect(removeBtn.className).toMatch(/custom-remove-btn-class/);
  });

  test('applies inline styles', () => {
    setup({
      removeTagBtnStyleProps: { color: 'blue' },
    });

    const removeBtn = screen.getByRole('button');

    expect(removeBtn).toHaveStyle('color: blue');
  });
});
