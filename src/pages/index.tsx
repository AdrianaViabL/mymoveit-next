//comando de instalação dos pacotes usado nesse projeto:
// yarn add typescript @types/react @types/react-dom @types/node -D
// usar yarn dev para rodar o projeto na maquina local
// estando dentro do vercel para rodar usar comando vercel e para subir alterações direto para produção versel --prod
import { ChallengesProvider } from '../contexts/ChallengeContext'
import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';

import styles from '../styles/pages/Home.module.css'

import Head from 'next/head'
import { GetServerSideProps } from 'next'

/*funcionalidade acrescentada ao index da aplicação por ser necessária apenas aqui*/
import { CountdownProvider } from '../contexts/CountdownContext'

interface homeProps {
    level: number;
    challengesCompleted: number;
    currentExperience: number;
}

export default function Home(props: homeProps) {
  return (
    <ChallengesProvider 
      level={props.level} 
      challengesCompleted={props.challengesCompleted} 
      currentExperience={props.currentExperience}>

      <div className={styles.container}>
        <Head>
          <title>Inicio | MymoveIt</title>
        </Head>
        < ExperienceBar />
        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>

            <div> 
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}
  /*atribuindo o tipo GetServerSideProps a constante getServerSideProps */
export const getServerSideProps: GetServerSideProps = async(ctx) =>{ /*async - função acincrona*/
  const {level, challengesCompleted, currentExperience} = ctx.req.cookies;

  return{/* controlando os dados que serao passados do node(camada do meio da aplicação) para o front end e executa essa parte antes da pagina ser exibida*/
    props: {
      level: Number(level), //convertendo para numero a string que está vindo do cookie
      challengesCompleted: Number(challengesCompleted),
      currentExperience: Number(currentExperience)
    }
  }

}