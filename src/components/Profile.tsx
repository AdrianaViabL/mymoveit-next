import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/Profile.module.css'

export function Profile(){
    const { level, userName } = useContext(ChallengeContext);
    return(
        <div className={styles.profileContainer}>   
            <img src="https://github.com/AdrianaViabL.png" alt="minha foto"/>
            <div>
                <strong>{ userName }</strong>
                <p>
                    <img src="icons/level.svg" alt="level"/>
                    Level { level }
                    
                </p>
            </div>
        </div>
    );
}