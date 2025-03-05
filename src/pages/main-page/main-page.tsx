import Header from '../../components/header/header';
import Banner from '../../components/banner/banner';
import BreadCrumbs from '../../components/bread-crumbs/bread-crumbs';
import { cameraMock } from '../../mock/camera/camera';
import ProductCard from '../../components/product-card/product-card';
import Footer from '../../components/footer/footer';

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
                    {cameraMock.map((camera) => <ProductCard camera={camera} key={camera.id} />)}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MainPage;
