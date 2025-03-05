import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import BreadCrumbsProduct from '../../components/bread-crumbs/bread-crumbs-product';

function ProductPage():JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="page-content">
          <BreadCrumbsProduct />


        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ProductPage;
