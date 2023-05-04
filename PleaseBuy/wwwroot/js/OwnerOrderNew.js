import { STATUS_ICON, BUYER_STATUS } from '../constants';


$(function () {
    const button = $(".order-card__detail>button");
    const orderDetailContainer = document.getElementsByClassName("order-card__detail");
    const itemsContainer = document.getElementsByClassName("order-items-container");

    orderDetailContainer.height(itemsContainer.outerHeight(true));

    button.click(function () {
        if (orderDetailContainer.hasClass('expand-view')) {
            orderDetailContainer.removeClass('expand-view');
            orderDetailContainer.height(0);
        } else {
            orderDetailContainer.addClass('expand-view');
            orderDetailContainer.height(itemsContainer.outerHeight(true));
        }
    });
});


function getOwnerStatusInfo(buyerStatus, type) {
    const statusIcon;
    const statusDetail;
    const extraDetail;

    switch (buyerStatus) {
        case BUYER_STATUS.CANCEL:
            statusIcon = STATUS_ICON.order;
            statusDetail = "ยกเลิกรับฝาก";
            extraDetail = `
                <>
                    <p>ผู้รับฝากยกเลิกการรับฝาก</p>
                </>
            `;
            break;

        case BUYER_STATUS.WAITING:
            statusIcon = STATUS_ICON.order;
            statusDetail = "รอการยืนยัน";
            extraDetail = `
                <>
                    <p>ผู้รับฝากต้องยืนยันภายใน {buyerConfirmTime}</p>
                    <p>เวลา {buyerConfirmTime}</p>
                </>
            `;
            break;

        case BUYER_STATUS.SHIPPING:
            statusIcon = STATUS_ICON.cart;
            statusDetail = "รอการจัดสั่ง"
            break;

        case BUYER_STATUS.SUCCESS:
            statusIcon = STATUS_ICON.location;
            statusDetail = "ถึงที่จัดส่งแล้ว"
            extraDetail = `
                <>
                    <p>โปรดยืนยันว่าได้รับแล้วภายใน { }</p>
                </>
            `;
            break;

        default:
            statusIcon = STATUS_ICON.order;
            break;
    }

    switch (type) {
        case "icon":
            return statusIcon;
        case "detail":
            return statusDetail;
        case "extra":
            return extraDetail;
        default:
            return statusDetail;
    }
}

function checkBuyerStatus({
    isConfirmed = false,
    isPrepared = false,
    isDelivered = false,
    isCanceled = false
}
) {
    let buyerStatus;
    if (isCanceled) {
        buyerStatus = BUYER_STATUS.CANCEL;
    }
    else if (isConfirmed) {
        if (isPrepared) {
            if (isDelivered) {
                buyerStatus = BUYER_STATUS.SHIPPING;
            }
        }
        buyerStatus = BUYER_STATUS.SHIPPING;
    }
    else {
        buyerStatus = BUYER_STATUS.WAITING;
    }
    return getOwnerStatusInfo(buyerStatus);
};


/**
 * @param {string} orderNumber
 * @param {string} orderName
 * @param {string} buyerName
 * @param {string} buyPlace
 * @param {Order.Cart} items
 * @param {bool} isOwnerCanceled
 */
function createOrderCard({
    orderNumber,
    orderName,
    buyerName,
    buyPlace,
    items,
    isOwnerCanceled,
}) {

    const isOwnerCancelOrder = false;
    const handlerConfirmCancelOrder = () => {
        if (window.confirm("คุณต้องการลบรายการฝากหรือไม่")) {
            isOwnerCancelOrder = true;
        }
    };

    const handlerBuyerSuccess = () => {

    };


    return `
        <div class="order-card border-curve-m">
            <div class="order-card__title border-inherit">
                ${createOrderInfo()}
                ${createOrderStatus()}

                <div class="order-card__title__option">
                    <button
                            <img src=${ARROW_ICON.down} alt="" /> :
                            <img src=${ARROW_ICON.up} alt="" />
                    </button>
                </div>
            </div>

            <div class="order-card__detail border-curve-m">
                <p>รายการที่ฝากซื้อ</p>
                <div class="order-items-container border-curve-m">
                    ${createListOrderItem(items)}
                </div>
                <button onClick=${handlerConfirmCancelOrder}>ยกเลิกการฝาก status: ${String(isOwnerCancelOrder)}</button>
            </div>
        </div>
    `;
}

function createListOrderItem(items) {
    const itemCards = items.map((item, index) => {
        return createOrderItemCard();
    });
    return { itemCards };
};


/**
 * @param {number} id
 * @param {string} name
 * @param {number} amount
 * @param {number} price
 */
function createOrderItemCard({
    id,
    name,
    amount,
    price,
}) {

    return `
        <div class="order-item grid-wrap">
            <p>No.${id}</p>
            <div class="order-item__detail">
                <p>อาหาร ${name}</p>
            </div>
            <p>จำนวน ${amount}</p>
            <p>ราคา ${price}</p>
        </div>
    `;
};

function createOrderInfo({ buyingPlace, shippingPlace }) {
    return `
        <div class="order-card__title__info flex-wrap border-curve-s ">
            <img src=${PLACE_HOLDER['600_400']} alt="" />
        </div>
    `;
};

/**
 * @param {number} id
 * @param {string} buyerStatus
 * @param {number} buyerConfirmTime
 */
function createOrderStatus({
    id,
    buyerStatus,
    buyerConfirmTime,
}) {

    let statusIcon;
    let statusDetail = "";
    let extraDetail = ``;

    const handleSuccesBuyerStatus = () => {
        return (buyerStatus === BUYER_STATUS.SUCCESS) ? "order-card__title__status-success" : "";
    };

    const handleSuccessOrder = () => {
        return '';
    };

    switch (buyerStatus) {
        case BUYER_STATUS.CANCEL:
            statusIcon = STATUS_ICON.order;
            statusDetail = "ยกเลิกรับฝาก";
            extraDetail = `
                <>
                    <p>ผู้รับฝากยกเลิกการรับฝาก</p>
                </>
            `;
            break;

        case BUYER_STATUS.WAITING:
            statusIcon = STATUS_ICON.order;
            statusDetail = "รอการยืนยัน";
            extraDetail = `
                <>
                    <p>ผู้รับฝากต้องยืนยันภายใน {buyerConfirmTime}</p>
                    <p>เวลา {buyerConfirmTime}</p>
                </>
            `;
            break;

        case BUYER_STATUS.SHIPPING:
            statusIcon = STATUS_ICON.cart;
            statusDetail = "รอการจัดสั่ง"
            break;

        case BUYER_STATUS.SUCCESS:
            statusIcon = STATUS_ICON.location;
            statusDetail = "ถึงที่จัดส่งแล้ว"
            extraDetail = `
                <>
                    <p>โปรดยืนยันว่าได้รับแล้วภายใน { }</p>
                </>
            `;
            break;

        default:
            statusIcon = STATUS_ICON.order;
    }

    return `
        <div class={"order-card__title__status border-curve-s" + ${handleSuccesBuyerStatus}}>
            <div class="status__title border-curve-s">
                <img src=${statusIcon} alt="" />
                <p>${statusDetail}</p>
            </div>
            <div class="status__extra">
                ${extraDetail}
            </div>
        </div>
    `;
}

class Order2 {
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
    }
}

class BuyerStatus {
    constructor() {
        this.confirmed = false;
        this.prepared = false;
        this.delivery = false;
        this.completed = false;
        this.cancelConfirmed = false;
    }
}

class Cart {
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



function createOrderSample(amount) {
    const orders = [];
    for (let i = 0; i < amount; i++) {
        let order = new Order2()
        orders.push(order);
    }
    return orders;
};