import React from 'react';
import { Tag } from '../tag';
import { useRef, useState } from 'react';
import './InputTag.css';
import type { InputTagProps } from './InputTag.types';

export default function InputTag({
  autoFocus = false,
  customClass,
  disabled = false,
  inputTagContainerStyleProps,
  labelStyleProps,
  inputStyleProps,
  tagsContainerStyleProps,
  tagsStyleProps,
  removeTagBtnStyleProps,
  hideLabel = false,
  label = 'Tags',
  maxTags,
  maxTagsValue,
  name = 'tags',
  separator = 'Enter',
  theme,
  value,
  onChange,
  onFocus = () => {},
  onBlur = () => {},
}: InputTagProps) {
  const inputTagRef = useRef<HTMLInputElement>(null);
  const [tagInputValue, setTagInputValue] = useState<string>('');

  const valueIsNotAlreadyInTags =
    value.filter(
      tag => tag.toLowerCase().trim() === tagInputValue.toLowerCase().trim(),
    ).length === 0;

  const valueIsNotEmpty =
    tagInputValue.trim() !== '' && tagInputValue.length > 0;

  // Check if the current number of tags is below the maxTags limit.
  // Defaults to true when no max is set (unlimited tags).
  const isLessThanMaxTags =
    maxTags && maxTags > 0 ? value.length < maxTags : true;

  // Return the key that triggers tag separation. Space key is represented as " ".
  const separatorTriggerKey = separator === 'Enter' ? 'Enter' : ' ';

  const handleSetTags = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // If the InputTag component is inside the form this will prevent the form,
      // from submitting when the enter key is pressed.
      event.preventDefault();
    }
    // Remove the tag before the input if Backspace is pressed,
    // the input is empty, and there are existing tags.
    if (event.key === 'Backspace' && !valueIsNotEmpty && value.length > 0) {
      handleRemoveTag(value[value.length - 1]);
    }
    if (
      event.key === separatorTriggerKey &&
      valueIsNotEmpty &&
      valueIsNotAlreadyInTags &&
      isLessThanMaxTags
    ) {
      onChange(previousTags => [...previousTags, tagInputValue]);
      setTagInputValue('');
    }
  };

  const handleRemoveTag = (tagName: string) => {
    onChange(previousTags => previousTags.filter(tag => tag !== tagName));
  };

  return (
    <div
      className={`input-tag-container ${
        customClass?.inputTagContainerElement || 'input-tag-container-element'
      }`}
      style={inputTagContainerStyleProps}
      onClick={() => inputTagRef.current!.focus()}
    >
      <label
        htmlFor="tag-input"
        className={`input-tag-label ${theme}-input-tag-label ${
          customClass?.inputTagLabelElement || 'input-tag-label-element'
        }`}
        style={{ ...labelStyleProps, display: hideLabel ? 'none' : 'block' }}
      >
        {label}
      </label>
      <ul
        className={`input-tag-list-container ${theme}-input-tag-list-container ${
          customClass?.inputTagListContainerElement ||
          'input-tag-list-container-element'
        }`}
        style={{
          cursor: disabled ? 'default' : 'text',
          ...tagsContainerStyleProps,
        }}
      >
        {value.map(tag => (
          <li
            key={tag}
            className={`input-tag-tag-item ${theme}-input-tag-tag-item ${
              customClass?.inputTagTagItemElement ||
              'input-tag-tag-item-element'
            }`}
            style={tagsStyleProps}
          >
            <Tag
              customRemoveButtonClass={customClass?.inputTagTagRemoveBtnElement}
              customTagContentClass={customClass?.inputTagTagContentElement}
              disabled={disabled}
              tagName={tag}
              tagsStyleProps={tagsStyleProps}
              removeTagBtnStyleProps={removeTagBtnStyleProps}
              theme={theme}
              onRemoveTag={handleRemoveTag}
            />
          </li>
        ))}
        <li>
          <input
            id="tag-input"
            aria-label={`${label} input`}
            ref={inputTagRef}
            type="text"
            className={`input-tag-input ${theme}-input-tag-input ${
              customClass?.inputTagInputElement || 'input-tag-input-element'
            }`}
            value={tagInputValue}
            onKeyDown={handleSetTags}
            onChange={event => setTagInputValue(event.target.value)}
            autoFocus={autoFocus}
            maxLength={maxTagsValue}
            name={name}
            style={inputStyleProps}
            onBlur={onBlur}
            onFocus={onFocus}
            disabled={disabled}
          />
        </li>
      </ul>
    </div>
  );
}
