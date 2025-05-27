import { PresetColors } from "antd/es/theme/internal"

// export const getRandomColor = (): string => {

//   if (!PresetColors?.length) return "default"

//   const randomIndex = Math.floor(Math.random() * PresetColors.length)

//   return PresetColors[randomIndex]
// }

export const getRandomColor = (value: string): string => {
  let hash = 0
  for (let i = 0; i < value.length; i++) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % PresetColors.length
  return PresetColors[index]
}
