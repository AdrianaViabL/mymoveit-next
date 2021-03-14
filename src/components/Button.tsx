//foi totalmente excluido essa parte do projeto final, mas por aprendizado estou mantendo '-'

import { useState} from 'react';

interface ButtonProps{
    color: string;  
    children: string;
}

export function Button(props: ButtonProps){
    const [counter, setCounter] = useState(1)//o useState retorna dois valores, o valor inicial da variavel e o que vai acontecer com ela em cada ação do usuario

    function increment(){
        setCounter(counter + 1);
    }

    return (
        <button 
        type='button' 
        style={{ backgroundColor: props.color }}
        onClick={increment}>
            {props.children} <strong>{counter}</strong>
        </button>
    )
}