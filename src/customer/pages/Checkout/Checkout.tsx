import { Box, Button, FormControlLabel, Modal, Radio, RadioGroup } from "@mui/material";
import React from "react";
import AddressCard from "./AddressCard";
import { transform } from "typescript";
import AddressForm from "./AddressForm";
import PricingCard from "../Cart/PricingCard";

const style ={
    position: 'absolute',
    top:'50%',
    left:'50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const paymentGatwayList=[
    {
        value:"RAZORPAY",
        image:"data:image/png;base64,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",
        label:""
    },
    {
        value:"STRIPE",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc_b7cYDTEaXxYsRDAdsVXYknigIr16CNbZQ&s",
        label:""
    }
]

const Checkout = () => {
    const [open,setOpen] = React.useState(false);
    const handleOpen = ()=> setOpen(true);
    const handleClose = ()=> setOpen(false);
    const[paymentGatway, setPaymentGatway] = React.useState("RAZORPAY");

    const handlePaymentChange = (event:any) =>{
        setPaymentGatway(event.target.value);
    };
    return (
        <>
            <div className="pt-10 px-5 sm:px-10 md:px-44 lg:px-60 min-h-screen">
            <div className="space-y-5 lg:space-y-0 lg:grid grid-cols-3 lg:gap-9">
                <div className="col-span-2 space-y-5">
                    <div className="flex justify-between items-center">
                        <h1 className="font semibold">Select Address</h1>
                        <Button onClick={handleOpen}>Add new Address</Button>
                    </div>
                    <div className="text-xs font-medium space-y-5">
                        <p>Saved Addresses</p>
                        <div className="space-y-3">
                            {[1,1,1].map((item) => <AddressCard/>)}
                        </div>
                    </div>
                    <div className="py-4 px-5 rounded-md border">
                        <Button onClick={handleOpen}>
                            Add new Address
                        </Button>
                    </div>
                </div>
                <div>
                    <div className="border rounded-md">
                        <div className="space-y-3 border p-5 rounded-md">
                            <h1 className="text-[#00927c] font-medium pb-2 text-center">Chose Payment Gatway</h1>
                            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group" className="flex justify-between pr-0"
                            onChange={handlePaymentChange} value={paymentGatway}>
                                {paymentGatwayList.map((item) =>
                                    <FormControlLabel className="border w-[45%] pr-2 rounded-md flex justify-center" 
                                    value={item.value} control={<Radio/>} label={<img className={`${item.value=="stripe"?"w-14":""} object-cover`} src={item.image} alt={item.label}/>}
                                />)}
                            </RadioGroup>
                        </div>
                        <PricingCard/>
                        <div className="p-5">
                            <Button fullWidth variant="contained" sx={{py:"11px"}}>Checkout</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
            <Box sx={style}><AddressForm paymentGatway={paymentGatway}/></Box>
        </Modal>
        </>
    )
}
export default Checkout