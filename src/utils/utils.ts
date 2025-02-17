export const validateFields = (field: string) => {
  return field && field.length > 0;
}

export const validateSalary = (salary: number): void => {
	if (salary < 0) {
		throw new Error('Salário não pode ser negativo.');
	}
}

export const parseCurrencyString = (currencyString: string) => {
	let numberString = currencyString.replace("R$", "").trim();
	numberString = numberString.replace(/\./g, "");
	numberString = numberString.replace(",", ".");
	
	return parseFloat(numberString);
}

export const months = [
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
