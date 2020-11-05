import React, { useState } from 'react';


function App() {
    const [binaryText, setBinaryText] = useState([]);
    const [decimalText, setDecimalText] = useState([]);
    const [errorMessage, setErrorMessage] = useState([]);
/**
 * Nao permite o refresh da pagina
 */
    const onFormSubmit = e => {
        e.preventDefault()

        //Condicao para que se o numero inserido nao for binario uma mensagem de erro sera mostrada
        if (binaryText.match(/^[0-1]+$/g) === null) {
            return(
            setErrorMessage('Use apenas os numeros 0 ou 1'));
            
        }
        setErrorMessage('')//Reinicia a mensagem de erro caso ativada


        /**
         * Formula para a conversao :
         *  input = 1 => output = 1* (2^0) = 1
         *  input = 10 => output = (0* (2^0)) +  (1 * (2^1)) = 2    
         * Entao nos invertemos e interamos com a parte de tras
         */
        const reversedBinaryText = binaryText
            .split('')
            .map(Number)//Converte uma sitring para numero
            .reverse()

        const result = reversedBinaryText.reduce(
            (accumulator, currentValue, idx) =>
                accumulator + currentValue * Math.pow(2, idx)
        )
        setDecimalText(result)

    }
    return (
        <>
            <h1>Conversor binario para decimal</h1>
            <form onSubmit={onFormSubmit}>
            {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}

                <br />
                <label>Entrada em binario:</label>
                <div>
                    <input
                        autoComplete="off"
                        type="text"
                        name="binary"
                        placeholder="Enter 0 or 1"
                        value={binaryText}
                        onChange={e => setBinaryText(e.target.value)}
                    />
                    <br />
                    <button type="submit">Converter</button>
                </div>
                <br />
                <div>
                    <label>Saida em decimal:</label>
                    <br/>
                    <input
                        type="text"
                        name="decimal"
                        value={decimalText}
                        disabled />
                </div>

            </form>
        </>
    );
}

export default App;