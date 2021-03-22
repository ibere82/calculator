import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import Display from '../components/Display';
import stringMath from '../controller/stringMath';

export default function Calculator() {
  const [mathematicExpression, setMathematicExpression] = useState('');
  const [displayExpression, setDisplayExpression] = useState('');
  const [partialResult, setPartialResult] = useState('');
  const [isAtBegin, setIsAtBegin] = useState(true);
  const [isFull, setIsFull] = useState(false);
  const [errorDisplay, setErrorDisplay] = useState(false);

  useEffect(() => {
    const buttonKeys = [];
    const buttons = [...numbersButtons, ...operatorsButtons];
    buttons.forEach(({ keys, id }) =>
      keys.map(key => buttonKeys.push({ id, key }))
    );

    document.addEventListener('keydown', (event) => {
      const calculatorKey = buttonKeys.find(({ key }) => key === event.key);
      if (calculatorKey) {
        const elem = document.getElementById(calculatorKey.id);
        elem.click();
        elem.style.border = '1px solid #FFFFF4';
      };
    });

    document.addEventListener('keyup', (event) => {
      const key = buttonKeys.find(({ key }) => key === event.key);
      if (key) {
        const elem = document.getElementById(key.id);
        elem.style.border = '1px solid black';
      };
    });

  }, []);

  const numbersButtons = [
    {
      id: 'nmb1',
      label: '1',
      code: '1',
      display: '1',
      allowedAtBegin: true,
      allowedWhenFull: false,
      keys: ['1'],
      handle: (code, display) => appendCode(code, display),
      posRow: 3,
      posCol: 1
    },
    {
      id: 'nmb2',
      label: '2',
      code: '2',
      display: '2',
      allowedAtBegin: true,
      allowedWhenFull: false,
      keys: ['2'],
      handle: (code, display) => appendCode(code, display),
      posRow: 3,
      posCol: 2
    },
    {
      id: 'nmb3',
      label: '3',
      code: '3',
      display: '3',
      allowedAtBegin: true,
      allowedWhenFull: false,
      keys: ['3'],
      handle: (code, display) => appendCode(code, display),
      posRow: 3,
      posCol: 3
    },
    {
      id: 'nmb4',
      label: '4',
      code: '4',
      display: '4',
      allowedAtBegin: true,
      allowedWhenFull: false,
      keys: ['4'],
      handle: (code, display) => appendCode(code, display),
      posRow: 2,
      posCol: 1
    },
    {
      id: 'nmb5',
      label: '5',
      code: '5',
      display: '5',
      allowedAtBegin: true,
      allowedWhenFull: false,
      keys: ['5'],
      handle: (code, display) => appendCode(code, display),
      posRow: 2,
      posCol: 2
    },
    {
      id: 'nmb6',
      label: '6',
      code: '6',
      display: '6',
      allowedAtBegin: true,
      allowedWhenFull: false,
      keys: ['6'],
      handle: (code, display) => appendCode(code, display),
      posRow: 2,
      posCol: 3
    },
    {
      id: 'nmb7',
      label: '7',
      code: '7',
      display: '7',
      allowedAtBegin: true,
      allowedWhenFull: false,
      keys: ['7'],
      handle: (code, display) => appendCode(code, display),
      posRow: 1,
      posCol: 1
    },
    {
      id: 'nmb8',
      label: '8',
      code: '8',
      display: '8',
      allowedAtBegin: true,
      allowedWhenFull: false,
      keys: ['8'],
      handle: (code, display) => appendCode(code, display),
      posRow: 1,
      posCol: 2
    },
    {
      id: 'nmb9',
      label: '9',
      code: '9',
      display: '9',
      allowedAtBegin: true,
      allowedWhenFull: false,
      keys: ['9'],
      handle: (code, display) => appendCode(code, display),
      posRow: 1,
      posCol: 3
    },
    {
      id: 'nmb0',
      label: '0',
      code: '0',
      display: '0',
      allowedAtBegin: true,
      allowedWhenFull: false,
      keys: ['0'],
      handle: (code, display) => appendCode(code, display),
      posRow: 4,
      posCol: 1
    },
    {
      id: 'nmb00',
      label: '00',
      code: '00',
      display: '00',
      allowedAtBegin: false,
      allowedWhenFull: false,
      keys: [],
      handle: (code, display) => appendCode(code, display),
      posRow: 4,
      posCol: 2
    },
    {
      id: 'nmb,',
      label: ',',
      code: '.',
      display: ',',
      allowedAtBegin: false,
      allowedWhenFull: false,
      keys: ['.', ','],
      handle: (code, display) => appendCode(code, display),
      posRow: 4,
      posCol: 3
    }
  ];

  const operatorsButtons = [
    {
      id: 'op+',
      label: '+',
      code: '+',
      display: '+',
      allowedAtBegin: false,
      allowedWhenFull: false,
      keys: ['+'],
      handle: (code, display) => appendCode(code, display),
      posRow: 4,
      posCol: 1
    },
    {
      id: 'op-',
      label: '-',
      code: '-',
      display: '-',
      allowedAtBegin: true,
      allowedWhenFull: false,
      keys: ['-'],
      handle: (code, display) => appendCode(code, display),
      posRow: 3,
      posCol: 2
    },
    {
      id: 'opx',
      label: 'ⅹ',
      code: '*',
      display: 'ⅹ',
      allowedAtBegin: false,
      allowedWhenFull: false,
      keys: ['*', 'x', 'X'],
      handle: (code, display) => appendCode(code, display),
      posRow: 3,
      posCol: 1
    },
    {
      id: 'op/',
      label: '÷',
      code: '/',
      display: '÷',
      allowedAtBegin: false,
      allowedWhenFull: false,
      keys: ['/'],
      handle: (code, display) => appendCode(code, display),
      posRow: 2,
      posCol: 1
    },
    {
      id: 'opx2',
      label: 'x²',
      code: '^',
      display: '²',
      allowedAtBegin: false,
      allowedWhenFull: false,
      keys: [],
      handle: (code, display) => appendCode(code, display),
      posRow: 2,
      posCol: 2
    },
    {
      id: 'op=',
      label: '=',
      code: '',
      display: '',
      allowedAtBegin: false,
      allowedWhenFull: true,
      keys: ['=', 'Enter'],
      handle: () => handleEqual(),
      posRow: 4,
      posCol: 2
    },
    {
      id: 'opBack',
      label: '←',
      code: '',
      display: '',
      allowedAtBegin: false,
      allowedWhenFull: true,
      keys: ['Backspace'],
      handle: () => handleBackspace(),
      posRow: 1,
      posCol: 1
    },
    {
      id: 'opClear',
      label: 'C',
      code: '',
      display: '',
      allowedAtBegin: true,
      allowedWhenFull: true,
      keys: ['c', 'C'],
      handle: () => handleClear(),
      posRow: 1,
      posCol: 2
    }
  ];

  const handleButton = (handle, code, display) => {
    handle(code, display);
  };

  const appendCode = (code, label) => {
    if (code === '.' && mathematicExpression.toString().includes('.')) return;
    const newMathExpression = mathematicExpression.toString() + code;
    update(newMathExpression);
    setErrorDisplay(false);
  };

  const handleEqual = () => {
    const { result, success } = calculate(mathematicExpression);
    if (success) {
      update(result);
      setPartialResult('');
      return
    }
    setMathematicExpression('');
    setPartialResult('');
    setIsAtBegin(true);
    setDisplayExpression(result);
    setIsFull(false);
    setErrorDisplay(true);
  };

  const handleBackspace = () => {
    const newMathExpression = mathematicExpression.toString().slice(0, -1);
    update(newMathExpression);
  };

  const handleClear = () => {
    update('');
    setErrorDisplay(false);
  };

  const filterPartialResult = (expression) => {
    const display = parseFloat(expression);
    return isNaN(display) ? '' : display;
  };

  const filterExpressionToDisplay = (expression) => {

    const display = expression.toString().split('').map(char => {
      const key = [...numbersButtons, ...operatorsButtons].find(({ code }) => code === char)
      return key ? key.display : 'Err'
    }).join('');
    return display
  };

  const update = (math) => {
    setMathematicExpression(math);
    setPartialResult(filterPartialResult(calculate(math).result));
    setIsAtBegin(math === '');
    setDisplayExpression(filterExpressionToDisplay(math));
    setIsFull(!errorDisplay && displayExpression.length > 15);
  };

  const calculate = (expression) => {
    const { result, success } = stringMath(expression.toString().replace(/\^/gi, '^2'))
    return { result, success }
  };

  return (
    <div className="calculator">

      <Display expression={displayExpression} partialResult={partialResult} error={errorDisplay} />

      <div className="buttons-conteiner">
        <div className="numbers-conteiner">
          {numbersButtons.map((button, index) => <Button key={index} buttonOptions={button} handleButton={handleButton} cssClass={'number-button'} isAtBegin={isAtBegin} isFull={isFull} />)}
        </div>

        <div className="operators-conteiner">
          {operatorsButtons.map((button, index) => <Button key={index} buttonOptions={button} handleButton={handleButton} cssClass={'operator-button'} isAtBegin={isAtBegin} isFull={isFull} />)}
        </div>
      </div>
    </div>
  );
};
