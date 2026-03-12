import express from 'express';
import {
  addAddress,
  fetchAllAddresses,
  editAddress,
  deleteAddress
} from "../controllers/shop/address-controller.js"
const router = express.Router();

router.post('/add', addAddress);
router.get('/all/:userId', fetchAllAddresses);
router.put('/edit/:userId/:addressId', editAddress);
router.delete('/delete/:userId/:addressId', deleteAddress);

export default router;