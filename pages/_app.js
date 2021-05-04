import '../styles/globals.css';
import '../styles/header.css';
import '../styles/hero.css';
import '../styles/forumCategories.css';
import '../styles/topicPost.css';
import '../styles/form.css';
import '../styles/loader.css';
import '../styles/replyBox.css';
import '../styles/footer.css';
import '../styles/profile.css';
import '../styles/instructorDashboard.css';
import '../styles/skeletonLoading.css';
import "react-datepicker/dist/react-datepicker.css";
import Head from 'next/head';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>HouseChat</title>
        <meta name="title" content="HouseChat"></meta>
        <meta name="description" content="Community Platform to find and contribute answer to the technical challenges" />
        <meta name="keywords" content="How to learn js, How to learn React, How to learn C, How to learn C++, Java, Reactjs, Javascript" />
        <meta name="author" content="Sujith Gunasekaran"></meta>
        <meta property="og:type" content="HouseChat" />
        <meta property="og:url" content="" />
        <meta property="og:title" content="HouseChat - Free knowledge sharing platform" />
        <meta property="og:description" content="Community Platform to find and contribute answer to the technical challenges..." />
        <meta property="twitter:card" content="HouseChat" />
        <meta property="twitter:url" content="" />
        <meta property="twitter:title" content="HouseChat - Free knowledge sharing platform" />
        <meta property="twitter:description" content="Community Platform to find and contribute answer to the technical challenges..." />

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossOrigin="anonymous"></link>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.6.0/dist/umd/popper.min.js" integrity="sha384-KsvD1yqQ1/1+IA7gi3P0tyJcT3vR+NdBTt13hSJ2lnve8agRGXTTyNaBYmCR/Nwi" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.min.js" integrity="sha384-nsg8ua9HAw1y0W1btsyWgBklPnCUAFLuTMS2G72MMONqmOymq585AcH49TLBQObG" crossOrigin="anonymous"></script>
      </Head>
      <div className="main_page">
        <Header />
        <div className="main_body">
          <Component {...pageProps} />
        </div>
        <hr className="hero_card_hr" />
        <Footer />
      </div>

    </>
    // <Component {...pageProps} />
  )
}

export default MyApp
