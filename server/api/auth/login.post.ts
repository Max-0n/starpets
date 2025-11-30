export default defineEventHandler(async event => {
  const body = await readBody(event)

  // Генерируем рандомные данные для ответа
  const balance = (Math.random() * 10000).toFixed(2)
  const login = `user_${Math.floor(Math.random() * 10000)}`
  const languages = ['ru', 'en', 'de', 'es', 'fr', 'it', 'pt', 'tr']
  const language = languages[Math.floor(Math.random() * languages.length)]

  // Имитируем задержку сети
  await new Promise(resolve => setTimeout(resolve, 500))

  return {
    balance: parseFloat(balance),
    login,
    language,
  }
})
