export type TagProps = {
  /**
   * Custom class for the tag's remove button.
   */
  customRemoveButtonClass?: string;

  /**
   * Custom class for the tag's text/content.
   */
  customTagContentClass?: string;

  /**
   * Whether the tag (and its remove button) is disabled.
   */
  disabled?: boolean;

  /**
   * The text or value of the tag.
   */
  tagName: string;

  /**
   * Optional theme to style the tag.
   */
  theme?: 'theme-1' | 'theme-2' | 'theme-3';

  /**
   * Inline style props for the remove button.
   */
  removeTagBtnStyleProps?: React.CSSProperties;

  /**
   * Callback fired when the remove button is clicked.
   * @param tagName - The tag being removed.
   */
  onRemoveTag: (tagName: string) => void;
};
