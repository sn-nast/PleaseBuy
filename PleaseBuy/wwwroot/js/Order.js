export class Order2 {
    constructor() {
        this.orderId = '';
        this.time = new Date();
        this.timeLimit = '';
        this.owner = '';
        this.canteen = '';
        this.depositor = '';
        this.phoneNumber = '';
        this.location = '';
        this.annotation = '';
        // owner เพิ่มรายการแล้ว
        this.confirmed = false;

        // buyer confirm ว่าจะซื้อ - กำลังซื้อ
        this.prepared = false;

        // buyer ถึงที่ส่งแล้ว
        this.delivery = false;

        // Owner รับแล้ว
        this.completed = false;
        //
        this.isOwenerCanceled = false;
        // 
        this.isBuyerCanceled = false;
    };
};

class BuyerStatus {
    constructor() {
        this.confirmed = false;
        this.prepared = false;
        this.delivery = false;
        this.completed = false;
        this.cancelConfirmed = false;
    }
}

export class Cart {
    constructor() {
        this.id = 0;
        this.cart_id = '';
        this.menu = 'Chicken';
        this.price = 50;
        this.amount = 3;
        this.annotation = '';
        this.canteen = '';
        this.owner = '';
    };
};

/**
 * @typedef {Object} Order
 * @property {number} order_id
 * @property {Buyer} buyer
 * @property {Canteen} canteen
 */
class Order {
    constructor(order_id, buyer, canteen) {
        this.order_id = order_id;
        this.buyer = buyer;
        this.canteen = canteen;
    }
}

/**
 * @typedef {Object} Buyer
 * @property {string} buyer_name
 * @property {string} buyer_lastname
 */
class Buyer {
    constructor(buyer_name, buyer_lastname) {
        this.buyer_name = buyer_name;
        this.buyer_lastname = buyer_lastname;
    }
}

/**
 * @typedef {Object} Canteen
 * @property {Shop[]} shops
 */
class Canteen {
    constructor(shops) {
        this.shops = shops;
    }
}

/**
 * @typedef {Object} Shop
 * @property {string} shop_name
 * @property {OrderItem[]} order_items
 */
class Shop {
    constructor(shop_name, order_items) {
        this.shop_name = shop_name;
        this.order_items = order_items;
    }
}

/**
 * @typedef {Object} OrderItem
 * @property {number} item_id
 * @property {string} item_name
 * @property {number} item_price
 * @property {number} item_amount
 */
class OrderItem {
    constructor(item_id, item_name, item_price, item_amount) {
        this.item_id = item_id;
        this.item_name = item_name;
        this.item_price = item_price;
        this.item_amount = item_amount;
    }
}


export function createOrderSample(amount) {
    const orders = [];
    for (let i = 0; i < amount; i++) {
        let order = new Order2();
        orders.push(order);
    }
    return orders;
}


