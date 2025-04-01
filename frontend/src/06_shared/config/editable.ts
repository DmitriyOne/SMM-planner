import { TitleProps } from "antd/es/typography/Title"

export const editableConfig = (
  editableText?: string,
  handleEditable?: (title: string) => void,
  handleEditableSuccess?: () => void,
): TitleProps["editable"] => ({
  tooltip: "click to edit text",
  text: editableText,
  onChange: handleEditable,
  onEnd: handleEditableSuccess,
})
