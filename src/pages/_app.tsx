//tudo que for repetir dentro da pagina deve ser declarado dentro desse app
import '../styles/global.css';

function MyApp({ Component, pageProps }) {

  return (
      /*<ChallengesProvider> - foi removido pois seus dados podem ser acessados pela index.tsx */
          <Component {...pageProps} />
  )
}

export default MyApp
