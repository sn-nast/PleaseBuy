import { useState } from 'react'
import { useCollapse } from 'react-collapsed';
import "./BuyerOrder.css"

import orderIcon from '../assets/order.png';
import cartIcon from '../assets/cart.png';
import locationIcon from '../assets/location.png';
import arrowDown from '../assets/arrow-down.png';
import arrowUp from '../assets/arrow-up.png';

import { PLACE_HOLDER, BUYER_STATUS } from '../pages/constants';
import * as Order from '../models/Order';

export default function BuyerOrder({ orders }) {
    // const [orders, setOrders] = useState(orders);
    const ordersSample = Order.createOrderSample(3);

    return (
        <div className="buyer-order-container">
            <h2>สถานะการฝากซื้อ</h2>
            <div className="order-cards-container">
                {createOrderCard(ordersSample)}
            </div>
        </div>
    );
}
/**
 * @param {Order.Order2[]} orders
 */
function createOrderCard(orders) {
    return (
        orders.map((order, index) => {
            const items = [];
            for (let count = 0; count < 5; count++) {
                items.push(new Order.Cart());
            }

            return (
                <OrderCard
                    orderName={order.canteen}
                    orderNumber={index}
                    buyerName={order.delivery}
                    buyPlace={order.canteen}
                    items={items}
                    isOwnerCanceled={order.isOwenerCanceled}
                />
            );
        }
        )
    );
}

/**
 * @param {string} orderNumber
 * @param {string} orderName
 * @param {string} buyerName
 * @param {string} buyPlace
 * @param {Order.Cart} items
 * @param {bool} isOwnerCanceled
 */
function OrderCard({
    orderNumber,
    orderName,
    buyerName,
    buyPlace,
    items,
    isOwnerCanceled,
}) {
    const [isExpanded, setExpanded] = useState(false);
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

    const [isCancelOrder, setIsCancelOrder] = useState(isOwnerCanceled);
    const [buyerStatus, setBuyerStatus] = useState("");

    const handlerConfirmCancelOrder = () => {
        if (window.confirm("คุณต้องการลบรายการฝากหรือไม่")) {
            setIsCancelOrder(true);
        }
        else {
            setIsCancelOrder(false);
        }
    }

    const handlerBuyerSuccess = () => {

    };


    return (
        <div className="order-card border-curve-m">
            <div className="order-card__title border-inherit">
                <OrderInfo buyingPlace={buyPlace} shippingPlace="somewhere2" />
                <OrderStatus buyerStatus={buyerStatus} />
                <div className="order-card__title__option">
                    <button
                        {...getToggleProps({
                            onClick: () => setExpanded((prevExpanded) => !prevExpanded),
                        })}>
                        {isExpanded ?
                            <img src={arrowDown} alt="" /> :
                            <img src={arrowUp} alt="" />
                        }
                    </button>
                </div>
            </div>

            <div className="order-card__detail border-curve-m" {...getCollapseProps()}>
                <p>รายการที่ฝากซื้อ</p>
                <div className="order-items-container border-curve-m">
                    {createOrderItem(items)}
                </div>
                <button onClick={handlerConfirmCancelOrder}>ยกเลิกการฝาก status: {String(isCancelOrder)}</button>
            </div>
        </div>
    );
}

/**
 * @param {Order.Cart[]} items
 */
function createOrderItem(items) {
    const itemCards = items.map((item, index) => {
        return (
            <OrderItemCard
                key={index}
                id={item.id}
                name={item.menu}
                price={item.price}
            />
        )
    });
    return <>{itemCards}</>
};


/**
 * @param {number} id
 * @param {string} name
 * @param {number} amount
 * @param {number} price
 */
function OrderItemCard({
    id,
    name,
    amount,
    price,
}) {

    return (
        <div className="order-item grid-wrap">
            <p>No.{id}</p>
            <div className="order-item__detail">
                <p>อาหาร {name}</p>
            </div>
            <p>จำนวน {amount}</p>
            <p>ราคา {price}</p>
        </div>
    );
};

function OrderInfo({ buyingPlace, shippingPlace }) {
    return (
        <div className="flex-wrap border-curve-s order-card__title__info">
            {/* <p>ซื้อที่</p>
            <p>รับที่</p> */}
            <img src={PLACE_HOLDER['600_400']} alt="" />
        </div>
    );
};

/**
 * @param {boolean} isConfirmed
 * @param {boolean} isPrepared
 * @param {boolean} isDelivered
 * @param {boolean} isCanceled
 */
function checkBuyerStatus({
    isConfirmed = false,
    isPrepared = false,
    isDelivered = false,
    isCanceled = false
}
) {
    if (isCanceled) {
        return BUYER_STATUS.CANCEL
    }
    else if (isConfirmed) {
        if (isPrepared) {
            if (isDelivered) {
                return BUYER_STATUS.SHIPPING;
            }
        }
        return BUYER_STATUS.SHIPPING;
    }
    return BUYER_STATUS.WAITING;

}

/**
 * @param {number} id
 * @param {string} buyerStatus
 * @param {number} buyerConfirmTime
 */
function OrderStatus({
    id,
    buyerStatus,
    buyerConfirmTime,
}) {

    let statusIcon;
    let statusDetail = "";
    let extraDetail = <></>;

    const handleSuccesBuyerStatus = () => {
        return (buyerStatus === BUYER_STATUS.SUCCESS) ? "order-card__title__status-success" : "";
    };

    const handleSuccessOrder = () => {
        return '';
    };

    switch (buyerStatus) {
        case BUYER_STATUS.CANCEL:
            statusIcon = orderIcon;
            statusDetail = "ยกเลิกรับฝาก";
            extraDetail = (
                <>
                    <p>ผู้รับฝากยกเลิกการรับฝาก</p>
                </>
            )
            break;

        case BUYER_STATUS.WAITING:
            statusIcon = orderIcon;
            statusDetail = "รอการยืนยัน";
            extraDetail = (
                <>
                    <p>ผู้รับฝากต้องยืนยันภายใน {buyerConfirmTime}</p>
                    <p>เวลา {buyerConfirmTime}</p>
                </>
            );
            break;

        case BUYER_STATUS.SHIPPING:
            statusIcon = cartIcon;
            statusDetail = "รอการจัดสั่ง"
            break;

        case BUYER_STATUS.SUCCESS:
            statusIcon = locationIcon;
            statusDetail = "ถึงที่จัดส่งแล้ว"
            extraDetail = (
                <>
                    <p>โปรดยืนยันว่าได้รับแล้วภายใน { }</p>
                </>
            );
            break;

        default:
            statusIcon = orderIcon;
    }

    return (
        <div className={"order-card__title__status border-curve-s " + handleSuccesBuyerStatus()}>
            <div className="status__title border-curve-s">
                <img src={statusIcon} alt="" />
                <p>{statusDetail}</p>
            </div>
            <div className="status__extra">
                {extraDetail}
            </div>
        </div>
    );
}







function createOrderCardExample(amount) {
    const orderCards = Array.from({ length: amount }).map((_, index) => {
        return (
            <OrderCard key={index} orderNumber={index + 1} />
        );
    });
    return <>{orderCards}</>
}

function createOrderItemExample(amount) {
    const orderItems = Array.from({ length: amount }).map((_, index) => {
        const item = new Order.Cart();
        return (
            <OrderItemCard key={index} />
        );
    });
    return <>{orderItems}</>
}