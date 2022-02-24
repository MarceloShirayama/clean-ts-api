function teste() {
  return 'teste'
}

function teste2() {
  return 'teste'
}

try {
  console.log(teste)
} catch (error: any) {
  console.log('Error:', error.message)
  console.log(teste2)
}
