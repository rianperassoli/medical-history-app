const capitalize = (text: string): string => {
  let formattedText = text.toLowerCase()

  return formattedText.charAt(0).toUpperCase() + formattedText.slice(1)
}

export { capitalize }