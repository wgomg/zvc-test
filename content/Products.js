class Products extends ZCustomController {
  onThis_init({ productsList }) {
    this.products = productsList;
    this.cart = [];
  }

  onThis_activated() {
    this.productsList.refresh();
  }

  onTextSearch_change() {
    this.productsList.refresh();
  }

  onProductsList_getRows() {
    const filter = this.textSearch.value;
    return this.products
      .filter((c) => c.name.toLowerCase().indexOf(filter) >= 0)
      .map((row) => this.prepareRow(row));
  }

  prepareRow(row) {
    if (row.inCart) {
      row._rowClass = 'table-success';
      row.iconInCart = "<i class='far fa-check-square'></i>";
    } else {
      delete row._rowClass;
      row.iconInCart = "<i class='far fa-square'></i>";
    }
    return row;
  }

  onProductsList_cellClick(row, rowIndex, field) {
    if (field === 'iconInCart') {
      row.inCart = !row.inCart;

      this.cart.push({
        name: row.name,
        price: row.price,
        num: 1,
        total: row.price,
      });

      this.productsList.updateRow(rowIndex, this.prepareRow(row));
    }

    this.triggerEvent('cartModified', this.cart);
  }
}

ZVC.export(Products);
