import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css'


export function Countdown(){

    const { 
        minutes, 
        seconds, 
        hasFinished, 
        isActive, 
        resetCountdown, 
        startCountdown } = useContext(CountdownContext)
    /*por nao fazer parte da regra de negocio a separação dos numeros, ele nao foi movido para o CountdownContext*/
    const [minute1, minute2] = String(minutes).padStart(2, '0').split('');
    const [second1, second2] = String(seconds).padStart(2, '0').split('');

    return(
        <div>
            <div className={styles.CountdownCont}>
                <div>
                    <span>{minute1}</span>
                    <span>{minute2}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{second1}</span>
                    <span>{second2}</span>
                </div>
            </div>

            { hasFinished ? (/* hasFinished && (){} <- forma de executar algo apenas se a condição for verdadeira (sem o else)*/
                <button disabled
                className={styles.startCountdownbtn}>       
                    Ciclo encerrado
                </button>
            ) : (
                <>
                    { isActive ? (
                            <button type='button' 
                            className={`${styles.startCountdownbtn} ${styles.startCountdownbtnActive}`}
                            onClick={resetCountdown}>       
                                Abandonar ciclo
                            </button>
                    ) : (   
                            <button type='button' className={styles.startCountdownbtn} onClick={startCountdown}>
                                iniciar um ciclo
                            </button>
        
                    )}
                </>
            )
            }

        </div>
    )
}