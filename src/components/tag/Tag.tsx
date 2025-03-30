import React from 'react';
import './Tag.css';
import type { TagProps } from './Tag.types';

export default function Tag({
  customRemoveButtonClass,
  customTagContentClass,
  disabled,
  tagName,
  removeTagBtnStyleProps,
  theme,
  onRemoveTag,
}: TagProps) {
  return (
    <>
      <button
        className={`input-tag-tag-remove-btn ${theme}-input-tag-tag-remove-btn ${
          customRemoveButtonClass || 'input-tag-tag-remove-btn-element'
        }`}
        style={{
          ...removeTagBtnStyleProps,
          display: disabled ? 'none' : 'inline-block',
        }}
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          // Stop the click from bubbling up to the parent,
          // which would otherwise focus the input element after deleting a tag.
          event.stopPropagation();
          onRemoveTag(tagName);
        }}
      >
        ✕
      </button>
      <span
        className={`input-tag-tag-content ${theme}-input-tag-tag-content ${
          customTagContentClass || 'input-tag-tag-content-element'
        }`}
      >
        {tagName}
      </span>
    </>
  );
}
