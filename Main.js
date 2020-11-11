class Main extends ZCustomController {
  onThis_init() {
    window.onpopstate = (e) => {
      if (e.state && e.state.target && e.state.title) {
        this.loadItem(e.state.target, e.state.title, false);
      }
    };

    this.cartList = [];
    this.productsList = null;

    if (!this.productsList) this.productsList = this.generateRandomProducts(20);

    this.loadProducts();
  }

  onProductsButton_click() {
    this.loadProducts();
  }

  onCartButton_click() {
    const data = this.cartButton.getAttribute('data-target');

    this.loadItem(data, 'Cart', true, {
      cartList: this.cartList,
    });
  }

  onMainContent_cartModified(data) {
    this.cartList = data;
  }

  generateRandomProducts(length) {
    return Array.from({ length }, (p, i) => ({
      name: 'Product_' + i + 1,
      price: Math.floor(Math.random() * 10000),
      inCart: false,
    }));
  }

  loadProducts() {
    this.loadItem('./content/Products', 'Products', true, {
      productsList: JSON.parse(JSON.stringify(this.productsList)),
    });
  }

  async loadItem(target, title, pushState = true, options) {
    if (pushState) history.pushState({ target, title }, title);
    await this.mainContent.load(target, options);
    this.mainTitle.text = 'ZVC - ' + title;
  }
}

ZVC.export(Main);
