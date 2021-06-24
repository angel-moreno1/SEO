/* eslint-disable react/no-string-refs */
import Document, { Html, Head, Main, NextScript } from 'next/document'


class MyDocuments extends Document {
    render(){
        return (
            <Html>
                <Head>
                    <meta name="description" content="Get from Seo newbie to SEO pro in 8 simples steps." />
                    <meta property="og:url" content="https://seo-beta.vercel.app/" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="How to Become an SEO Expert (9 Steps)" />
                    <meta property="og:description" content="Get from Seo newbie to SEO pro in 8 simples steps." />
                    <meta property="og:image" content="https://ahrefs.com/blog/wp-content/uploads/2019/12/fb-how-to-become-an-seo-expert.png" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta property="twitter:domain" content="seo-beta.vercel.app" />
                    <meta property="twitter:url" content="https://seo-beta.vercel.app/" />
                    <meta name="twitter:title" content="How to Become an SEO Expert (9 Steps)" />
                    <meta name="twitter:description" content="Get from Seo newbie to SEO pro in 8 simples steps." />
                    <meta name="twitter:image" content="https://ahrefs.com/blog/wp-content/uploads/2019/12/fb-how-to-become-an-seo-expert.png" />
                    <link rel="icon" href="/favicon.ico"/>
                    {/* <link ref="stylesheet" type='text/css' href="../public/nprogress.css" ></link> */}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocuments