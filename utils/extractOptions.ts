export interface OptionsArray {
  label: string
  value: number
  isDisabled: boolean
}

export interface OptionsArrayInput extends OptionsArray {
  [key: string]: any
}

export const extractOptions = (
  originalArray: OptionsArrayInput[] | null
): OptionsArray[] | null => {
  if (!originalArray) {
    return null
  } else {
    return originalArray.map((obj) => ({
      label: obj.label,
      value: obj.value,
      isDisabled: obj.isDisabled,
    }))
  }
}
