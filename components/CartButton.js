class CartButton extends ZCustomController {
  onCartButton_click() {
    let data = this.cartButton.getAttribute('data-target');
    this.triggerEvent('showCart', data);
  }
}

ZVC.export(CartButton);
