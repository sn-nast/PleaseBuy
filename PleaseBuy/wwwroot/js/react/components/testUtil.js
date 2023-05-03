import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


export function ParentComponent() {
    return (
        <div style={{ display: "flex", height: "500px", }}>
            <div style={{ overflowY: "auto", flex: "1", }}>
                {Array.from({ length: 25 }).map((_, index) => (
                    <ChildComponent key={index} />
                ))}
            </div>
        </div>
    );
}

function ChildComponent() {
    return (
        <div style={{ height: "50px", background: "#f0f0f0", margin: "20px" }}>
            This is a child component
        </div>
    );
}

export const ParentComponent2 = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                maxHeight: "400px",
                overflowY: "scroll",
            }}
        >
            <ChildComponent2 height="100px" />
            <ChildComponent2 height="200px" />
            <ChildComponent2 height="300px" />
            <ChildComponent2 height="150px" />
            <ChildComponent2 height="250px" />
            <ChildComponent2 height="250px" />
            <ChildComponent2 height="250px" />
            <ChildComponent2 height="250px" />
        </div>
    );
};

const ChildComponent2 = ({ height }) => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: height,
                backgroundColor: "#f2f2f2",
                border: "1px solid #ddd",
                margin: "10px",
                borderRadius: "5px",
            }}
        >
            <p>Child Component</p>
        </div>
    );
};

//Bootstrap for responsiveness

export default class StatusWithBootstrap extends React.Component {
    render() {
        return (
            <div className="main_container">
                <h1>Therichpost.com</h1>

                <div class="container padding-bottom-3x mb-1">
                    <div class="card mb-3">
                        <div class="p-4 text-center text-white text-lg bg-dark rounded-top"><span class="text-uppercase">Tracking Order No - </span><span class="text-medium">001698653lp</span></div>
                        <div class="d-flex flex-wrap flex-sm-nowrap justify-content-between py-3 px-2 bg-secondary">
                            <div class="w-100 text-center py-1 px-2"><span class="text-medium">Shipped Via:</span> UPS Ground</div>
                            <div class="w-100 text-center py-1 px-2"><span class="text-medium">Status:</span> Checking Quality</div>
                            <div class="w-100 text-center py-1 px-2"><span class="text-medium">Expected Date:</span> APR 27, 2021</div>
                        </div>
                        <div class="card-body">
                            <div class="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
                                <div class="step completed">
                                    <div class="step-icon-wrap">
                                        <div class="step-icon"><i class="pe-7s-cart"></i></div>
                                    </div>
                                    <h4 class="step-title">Confirmed Order</h4>
                                </div>
                                <div class="step completed">
                                    <div class="step-icon-wrap">
                                        <div class="step-icon"><i class="pe-7s-config"></i></div>
                                    </div>
                                    <h4 class="step-title">Processing Order</h4>
                                </div>
                                <div class="step completed">
                                    <div class="step-icon-wrap">
                                        <div class="step-icon"><i class="pe-7s-medal"></i></div>
                                    </div>
                                    <h4 class="step-title">Quality Check</h4>
                                </div>
                                <div class="step">
                                    <div class="step-icon-wrap">
                                        <div class="step-icon"><i class="pe-7s-car"></i></div>
                                    </div>
                                    <h4 class="step-title">Product Dispatched</h4>
                                </div>
                                <div class="step">
                                    <div class="step-icon-wrap">
                                        <div class="step-icon"><i class="pe-7s-home"></i></div>
                                    </div>
                                    <h4 class="step-title">Product Delivered</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex flex-wrap flex-md-nowrap justify-content-center justify-content-sm-between align-items-center">
                        <div class="custom-control custom-checkbox mr-3">
                            <input class="custom-control-input" type="checkbox" id="notify_me" checked="" />
                            <label class="custom-control-label" for="notify_me">Notify me when order is delivered</label>
                        </div>
                        <div class="text-left text-sm-right"><a class="btn btn-outline-primary btn-rounded btn-sm" href="#">View Order Details</a></div>
                    </div>
                </div>
            </div>
        );
    }
}