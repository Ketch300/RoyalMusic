class Cart {
    constructor() {
        let cart = this.getDataFromLocalStorage();
        this.data = new Map(cart);
    }

    add(index, product) {
        this.data.set(index, product);
        this.setToLocalStorage(this.data);
    }

    delete(index) {
        this.data.delete(index);
        this.setToLocalStorage(this.data);
    }

    getDataFromLocalStorage() {
        return JSON.parse(localStorage.getItem('cart'));
    }

    getSize() {
        return this.data.size;
    }

    getData() {
        return this.data;
    }

    setToLocalStorage(data) {
        let sendCart = this.transformToArray(data);
        localStorage.setItem('cart', JSON.stringify(sendCart));
    }

    transformToArray(data) {
        let sendCart = [];

        data.forEach((value, key) => {
            let tmp = [key, value];
            sendCart = [...sendCart, tmp];
        })

        return sendCart;
    }
}

export let cart = new Cart();
