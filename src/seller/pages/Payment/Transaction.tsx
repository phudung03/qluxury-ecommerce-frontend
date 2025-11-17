import { Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";

import { Theme } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchTransactionsBySeller } from "../../../State/seller/transactionSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) =>({
    '&:nth-of-type(odd)' : {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th':{
        border:0,
    },
}));

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
){
    return {name, calories, fat,carbs,protein};
}
const rows =[
    createData('Frozen yoghurt',159,6.0,24,4.0),
    createData('Ice cream sandwich',237,9.0,37,4.3),
    createData('Eclair',262,16.0,24,6.0),
    createData('Cupcake',305,3.7,67,4.3),
    createData('Gingerbread',356,16.0,49,3.9),
];

export default function TransactionTable(){
    const dispatch = useAppDispatch()
    const {transactions} = useAppSelector(store=>store);

    React.useEffect(()=>{
        dispatch(fetchTransactionsBySeller(localStorage.getItem("jwt") || ""))
    },[])
    return(
        <TableContainer component={Paper}>
            <Table sx={{minWidth:700}} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Date</StyledTableCell>
                        
                        <StyledTableCell align="right">Customer Details</StyledTableCell>
                        <StyledTableCell align="right">Order</StyledTableCell>
                        <StyledTableCell align="right">Amount</StyledTableCell>
                        
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.transactions.map((item) => (
                        <StyledTableRow key={item.id}>
                            <StyledTableCell component="th" scope="row">{item.date}</StyledTableCell>
                            
                            <StyledTableCell component="th" scope="row">{item.customer.email}</StyledTableCell>
                            <StyledTableCell align="right">{item.order.id}</StyledTableCell>
                            <StyledTableCell align="right">{item.order.totalSellingPrice}</StyledTableCell>
                        </StyledTableRow>
                        
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
