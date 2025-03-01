import Header from '../../header/header';
import Banner from '../../banner/banner';
import BreadCrumbs from '../../bread-crumbs/bread-crumbs';

function MainPage ():JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main>
        <Banner/>
        <div className="page-content">
          <BreadCrumbs/>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <img src="img/banner.png"/>
                </div>
                <div className="catalog__content">
                  <div className="cards catalog__cards">

                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

export default MainPage;
