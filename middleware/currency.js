// локализация вывода суммы -> в рубли с пробелом

const formatValue = new Intl.NumberFormat('ru-Ru', { currency: 'RUB', style: 'currency' })

export function currency(value) {
  return formatValue.format(value)
}
