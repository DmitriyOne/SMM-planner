import { TitleProps } from "antd/es/typography/Title"

export const editableConfig = (
  editableValue?: string,
  handleEditable?: (value: string) => void,
  handleEditableSuccess?: () => void,
): TitleProps["editable"] => ({
  tooltip: "click to edit",
  text: editableValue,
  onChange: handleEditable,
  onEnd: handleEditableSuccess,
})
