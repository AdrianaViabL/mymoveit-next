//as informações dentro do _document são recarregadas apenas no ´primeiro acesso do usuario a pagina
import Document, { Html, Head, Main, NextScript } from 'next/document';
//dentro do Main vai ser acrescentado o que for configurado de corpo da pagina
export default class MyDocument extends Document{
    render(){
        return(
            <Html>
                <Head>
                    <link rel="shortcut icon" href="favicon.png" type='image/png' />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap" rel="stylesheet" />
                </Head>
                <body>
                    <Main /> 
                    <NextScript />
                </body>
            </Html>
        )
    }
}