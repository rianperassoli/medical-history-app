const capitalize = (text: string): string => {
  let formattedText = text.toLowerCase()

  return formattedText.charAt(0).toUpperCase() + formattedText.slice(1)
}

const prepareToCompare = (text: string): string => {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
}

export { capitalize, prepareToCompare }