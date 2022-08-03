import './Table.scss'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {format} from 'timeago.js'
import { useEffect } from 'react';
import { getOrders, getUserOrders } from '../../redux/reducers/orderReducer';
import { useDispatch, useSelector } from 'react-redux';


const List = ({limit,userId,admin}) => {
  let imgP = process.env.REACT_APP_SERVER_URL+ '/images';
  let {orders} = useSelector(state=>state.orders);
 
  let dispatch = useDispatch()

  useEffect(()=>{

    console.log(userId)
    !userId ? dispatch(getOrders({admin,limit})) : dispatch(getUserOrders({admin,userId})) 

  },[userId])

  return (
    <div className='table'>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">address</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((row)=>{
            return (
                <TableRow key={row._id}>
                     <TableCell className="tableCell">{row._id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={`${imgP}/${row.userId.image}`} alt="" className="image" />
                  {row.userId.userName}
                </div>
              </TableCell>
              <TableCell className="tableCell">{format(row.createdAt)}</TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
              <TableCell className="tableCell">{row.address}</TableCell>
              <TableCell className="tableCell">{`Online Payment`}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default List