class CartItem {
    constructor(quantity, productPrice, productTitle, sum, productOwnerId) {
        this.quantity = quantity;
        this.productPrice = productPrice;
        this.productTitle = productTitle;
        this.sum = sum;
        this.productOwnerId = productOwnerId
    }
}

export default CartItem;