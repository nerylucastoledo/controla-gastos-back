const validateFields = (fields) => {
  return fields.every(field => field);
}

const parseCurrencyString = (currencyString) => {
	let numberString = currencyString.replace("R$", "").trim();
	numberString = numberString.replace(/\./g, "");
	numberString = numberString.replace(",", ".");
	
	return parseFloat(numberString);
}

const months = [
	"Janeiro",
	"Fevereiro",
	"Marco",
	"Abril",
	"Maio",
	"Junho",
	"Julho",
	"Agosto",
	"Setembro",
	"Outubro",
	"Novembro",
	"Dezembro"
]

module.exports = { validateFields, parseCurrencyString, months};
