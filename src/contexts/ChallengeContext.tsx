import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';
import Cookies from 'js-cookie'/* comando para instalar o cookie = yarn add js-cookie */
/*instalar tambem o pacote @types/js-cookie -D para que os campos dentro do js-cookies recebam uma tipagem que permite o reconhecimento pelo typescript    */

interface challenge{/*valores dos campos do json*/
    type: "body" | 'eye'; /*ou é um valor ou é outro*/
    description: string;
    amount: number;
}

interface ChallengeContextData{
    level: number;
    currentExperience: number;
    experienceToNextLevel: number;
    challengesCompleted: number;
    levelUp: () => void;/* parametro de função que nao recebe e nem vai ter nenhum retorno*/
    startNewChallenge: () => void;
    activeChallenge: challenge;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
    userName: string;
}

interface ChallengesProviderProps{/*tipagem da chindren, tribuir um tipo para esse parametro*/ 
    children: ReactNode;
    level: number;
    challengesCompleted: number;
    currentExperience: number;
}

export const ChallengeContext = createContext({} as ChallengeContextData)

export function ChallengesProvider({ children, ...rest}: ChallengesProviderProps){
    /*pegando os dados de dentro do valor que foi declarado dentro do ChallengesProvider na _app*/
    /* setando o valor inicial dos parametros que serão atualizados em tela */
    const [level, setLevel] = useState(rest.level ?? 1);/* se a informação nao existir usar 1 */
    const [currentExperience, setCurrentEperience] = useState(rest.currentExperience ?? 0);/*andamento da barrinha verde de experiência*/
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null);

    const [isLevelUpModalOpen, setisLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)/*calculando a potencia como é feito em um jogo de RPG*/

    const userName = 'Adriana'

    useEffect(() => {
        Notification.requestPermission();/*APi nativa do navegador */
    }, [])/* por causa desse [] usado no final do useEffect, a função declarada so vai ser executada uma vez quando o site carregar*/
    
    function levelUp() {
        setLevel(level + 1);
        setisLevelUpModalOpen(true);
    }

    function closeLevelUpModal(){
        setisLevelUpModalOpen(false);
    }

    useEffect(() => {
        Cookies.set('level', String(level))/* gravando no cookie do navegador os dados do placar*/
        Cookies.set('challengesCompleted', String(challengesCompleted))
        Cookies.set('currentExperience', String(currentExperience))
    }, [levelUp, challengesCompleted, currentExperience]);

    
    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play()/*APi nativa do navegador */

        if(Notification.permission === 'granted'){
            new Notification('Novo desafio ', {
                body: `Valendo ${challenge.amount}xp`
            })
        }
    }
    
    function resetChallenge(){
        setActiveChallenge(null); /*reiniciando o desafio caso a pessoa falhe*/
    }

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }
        const { amount } = activeChallenge;
        let finalExperience = currentExperience + amount;
        
        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }
        setCurrentEperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1)
    }

    return (
    <ChallengeContext.Provider 
        value={{ 
                level, 
                currentExperience, 
                experienceToNextLevel,
                challengesCompleted, 
                levelUp,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                completeChallenge,
                closeLevelUpModal,
                userName,
                 }}>
        { children }
        
        {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengeContext.Provider>
    )
}
/*Provider permite que toda a aplicação(por estar declarado dentro do _app) tenha visao do que esta dentro do seu contexto*/