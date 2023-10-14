import { Html, Head, Main, NextScript } from 'next/document'


//***Increase timeout for google provider ****/
import { custom } from 'openid-client'; 
custom.setHttpOptionsDefaults({
  timeout: 16000,
});
//****
export default function Document() {

  
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
