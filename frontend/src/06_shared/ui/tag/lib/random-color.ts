import { PresetColors } from "antd/es/theme/internal"

export const getRandomColor = (): string => {

  if (!PresetColors?.length) return "default"

  const randomIndex = Math.floor(Math.random() * PresetColors.length)
  
  return PresetColors[randomIndex]
}
