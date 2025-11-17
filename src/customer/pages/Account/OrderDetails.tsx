import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Divider } from "@mui/material";
import OrderStepper from "./OrderStepper";
import { Payments } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchOrderById, fetchOrderItemById } from "../../../State/customer/orderSlice";

const OrderDetails = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { orderId, orderItemId } = useParams();

    // --- Sửa: lấy đúng slice order từ Redux store ---
    const { orderItem, currentOrder } = useAppSelector(state => state.order);

    useEffect(() => {
        if (orderId) {
            dispatch(fetchOrderById({ orderId: Number(orderId), jwt: localStorage.getItem("jwt") || "" }));
        }
        if (orderItemId) {
            dispatch(fetchOrderItemById({ orderItemId: Number(orderItemId), jwt: localStorage.getItem("jwt") || "" }));
        }
    }, [dispatch, orderId, orderItemId]);

    // --- Loading state nếu dữ liệu chưa load ---
    if (!orderItem || !currentOrder) {
        return <div>Loading order details...</div>;
    }

    return (
        <Box className="space-y-5">

            {/* --- Product Section --- */}
            <section className="flex flex-col gap-5 justify-center items-center">
                {orderItem.product?.images?.length > 0 ? (
                    <img
                        className="w-[100px]"
                        src={orderItem.product.images[0]}
                        alt={orderItem.product.title || "Product"}
                    />
                ) : (
                    <div className="w-[100px] h-[100px] bg-gray-200 flex items-center justify-center">
                        No Image
                    </div>
                )}

                <div className="text-sm space-y-1 text-center">
                    <h1 className="font-bold">
                        {orderItem.product?.seller?.businessDetails?.businessName || "Loading..."}
                    </h1>
                    <p>{orderItem.product?.title || "Loading..."}</p>
                    <p><strong>size: </strong>M</p>
                </div>

                <div>
                    <Button onClick={() => navigate(`/reviews/${orderItem.id}/create`)}>Write Review</Button>
                </div>
            </section>

            {/* --- Order Stepper --- */}
            <section className="border p-5">
                <OrderStepper orderStatus={currentOrder.orderStatus || "PENDING"} />
            </section>

            {/* --- Delivery Address --- */}
            <div className="border p-5">
                <h1 className="font-bold pn-3">Delivery Address</h1>
                <div className="text-sm space-y-2">
                    <div className="flex gap-5 font-medium">
                        <p>{currentOrder.shippingAddress?.name || "Loading..."}</p>
                        <Divider flexItem orientation="vertical" />
                        <p>{currentOrder.shippingAddress?.mobile || "Loading..."}</p>
                    </div>
                    <p>
                        {currentOrder.shippingAddress?.address || ""},{" "}
                        {currentOrder.shippingAddress?.state || ""},{" "}
                        {currentOrder.shippingAddress?.city || ""} -{" "}
                        {currentOrder.shippingAddress?.pinCode || ""}
                    </p>
                </div>
            </div>

            {/* --- Price & Payment Section --- */}
            <div className="border space-y-4">
                <div className="flex justify-between text-sm pt-5 px-5">
                    <div className="space-y-1">
                        <p className="font-bold">Total Item Price</p>
                        <p>You saved <span className="text-green-500 font-medium text-xs">{699}</span> on this item</p>
                    </div>
                    <p className="font-medium">{orderItem.sellingPrice || "N/A"}</p>
                </div>

                <div className="px-5">
                    <div className="bg-teal-50 px-5 py-2 text-xs font-medium flex items-center gap-3">
                        <Payments />
                        <p>Pay on Delivery</p>
                    </div>
                </div>
                <Divider />

                <div className="px-5 pb-5">
                    <p className="text-xs">
                        <strong>Sold by: </strong>
                        {orderItem.product?.seller?.businessDetails?.businessName || "Loading..."}
                    </p>
                </div>

                <div className="p-10">
                    <Button
                        disabled={false}
                        color="error"
                        sx={{ py: "0.7rem" }}
                        variant="outlined"
                        fullWidth
                    >
                        {false ? "order canceled" : "Cancel Order"}
                    </Button>
                </div>
            </div>
        </Box>
    );
};

export default OrderDetails;
