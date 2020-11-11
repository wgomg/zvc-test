class Cart extends ZCustomController {
  onThis_init({ cartList }) {
    this.cart = cartList;

    this.calculateTotals();
  }

  onThis_activated() {
    this.cartList.refresh();
  }

  onTextSearch_change() {
    this.cartList.refresh();
  }

  onCartList_getRows() {
    const filter = this.textSearch.value;

    return this.cart
      .filter((c) => c.name.toLowerCase().indexOf(filter) >= 0)
      .map((row) => this.prepareRow(row));
  }

  prepareRow(row) {
    row.iconDelete = "<i class='fas fa-minus text-danger'></i>";
    row.iconAdd = "<i class='fas fa-plus text-success'></i>";
    return row;
  }

  onCartList_cellClick(row, rowIndex, field) {
    if (field === 'iconAdd') {
      row.num += 1;
      row.total += row.price;
      this.cartList.updateRow(rowIndex, this.prepareRow(row));
    }

    if (field === 'iconDelete') {
      if (row.num > 1) {
        row.num -= 1;
        row.total -= row.price;
        this.cartList.updateRow(rowIndex, this.prepareRow(row));
      } else {
        this.cart.splice(rowIndex, 1);
        this.cartList.refresh();
      }
    }

    this.calculateTotals();
  }

  calculateTotals() {
    let totalNum = 0;
    let totalPrice = 0;

    this.cart.forEach((p) => {
      totalNum += p.num;
      totalPrice += p.total;
    });

    this.total.text = `Products: ${totalNum}, Total: ${totalPrice}`;
  }
}

ZVC.export(Cart);
