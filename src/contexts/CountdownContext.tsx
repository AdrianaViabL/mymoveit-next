import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengeContext } from "./ChallengeContext";

interface CountdownContextData{
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

interface CountdownContextProviderProps{
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)

export function CountdownProvider( {children}:CountdownContextProviderProps ){
    const { startNewChallenge } = useContext(ChallengeContext);


    const initialTime = 0.05
    const [time, setTime] = useState(initialTime * 60);/*transformando em segundos os 25 minutos para ficar mais facil de trabalhar*/
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);
    
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
   
   
    let countdownTimeout: NodeJS.Timeout;

    function startCountdown(){
        setIsActive(true);
    }

    function resetCountdown(){
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(initialTime * 60);
        setHasFinished(false);
    }

    useEffect(() =>{
        if(isActive && time > 0){
            countdownTimeout = setTimeout(() => { /* recebendo o retorno da chamada do setTimeout*/
                setTime(time - 1);
            }, 1000);
        } else if (isActive && time == 0){
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])/*quando essas variaveis sofrerem alteração o useEffect executa*/ 

    return (
        <CountdownContext.Provider 
        value={{ 
                minutes,
                seconds,
                hasFinished,
                isActive,
                startCountdown,
                resetCountdown,
         }}>
        { children }
        </CountdownContext.Provider>
    )
}