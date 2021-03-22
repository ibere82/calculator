function stringMath(expression) {
  try {
    const result = resolveExpression(expression);
    return { result, success: true };
  } catch (error) {
    return { result: error.message, success: false };
  };
};

function resolveExpression(expression) {

  /*
    Elimina eventuais espaços em branco.
    Trata os casos excepcionais de multiplicação ou divisão por um número negativo
    Pois nestes casos o sinal de '-' não representa a separação de termos.
    Para evitar que estes sinais sejam usados no split da separação de termos eles
    são substituídos por um '~'
    Dentro da função resolveTherm os sinais de '~' são novamente convertidos para sinal de '-'
  */
  const validExpression =
    expression.replace(/\s/gi, '')
      .replace(/\*-/gi, '*~')
      .replace(/\/-/gi, '/~');

  /*
    Cria um array de termos da expressão excluindo os operadores de adição e subtração.
  */
  const therms = validExpression
    .split(/[+-]/gi)
    .filter(therm => therm !== '');

  /*
    Cria um array de operadores de adição e subtração e filtra para que contenham apenas um sinal de '+' ou '-'.
    A lógica empregada é a de que se a somatória de operadores '-' for ímpar, o termo é negativo,
    se for par ou 0, o termo é positivo.
    É adicionado um sinal de '+' ao início da expressão para garantir 
    paridade entre os índices dos arrays de operadores e array de termos.
  */
  const operators = (`+${validExpression}`)
    .split(/[^+-]/gi)
    .filter(operator => operator !== '')
    .map(operator =>
      operator.split('').reduce((acc, cur) => cur === '-' ? acc + 1 : acc, 0) % 2 === 0 ? '+' : '-');

  if (operators.length !== therms.length) throw new TypeError('Expressão mal formada');

  /*
    Faz o reduce usando o mesmo índice do array de termos para recuperar o operador.
    Em cada iteração os termos são passados para a função resolveTherm para resolver eventuais operações
    de multiplicação, divisão ou potenciação.
  */
  const result = therms.reduce((accumulated, therm, index) => {
    const resolvedTherm = parseFloat(resolveTherm(therm));
    return operators[index] === '+'
      ? accumulated + resolvedTherm
      : accumulated - resolvedTherm;
  }, 0);

  return result;
};

function resolveTherm(therm) {

  /*
    Substitui os sinais de '~' por '-'
    Estes sinais de '~' são usados como substituto do '-' para evitar que multiplicações ou divisões por 
    números negativos sejam quebradas pelo split de termos
  */
  const validTherm = therm.replace(/~/gi, '-')

  /*
    Cria um array de fatores do termo, excluindo os operadores de multiplicação e divisão.
  */
  const factors = validTherm.split(/[\\*/]/gi);

  /*
    Cria um array de operadores de multiplicação e divisão.
    É adicionado um sinal de '*' ao início da expressão para garantir 
    paridade entre os índices dos arrays de operadores e array de fatores.
  */
  const operators = (`*${validTherm}`)
    .split(/[^\\*/]/gi)
    .filter(operator => operator !== '');

  /*
    Testa presença de operadores de multiplicação e divisão concatenados configurando em uma expressão mal formada.
  */
  if (operators.filter(operator => operator.length !== 1).length !== 0) throw new TypeError('Expressão mal formada');

  /*
    Faz o reduce usando o mesmo índice do array de fatores para recuperar o operador.
    Em cada iteração os fatores são passados para a função resolveFactor para resolver eventuais operações
    de potenciação.
  */
  const result = factors.reduce((accumulated, factor, index) => {
    const resolvedFactor = parseFloat(resolveFactor(factor));
    if (operators[index] === '/' && resolvedFactor === 0) throw new TypeError('Divisão por zero');
    return operators[index] === '*'
      ? accumulated * resolvedFactor
      : accumulated / resolvedFactor;
  }, 1);

  return result;
};

function resolveFactor(factor) {

  const result = factor
    .split('^2')
    .reduce((accumulated, current, index) => index === 0 ? parseFloat(current) : accumulated ** 2, 0);
  return result;
};

module.exports = stringMath;
