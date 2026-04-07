import exprees from 'express';
import searchProduct from '../controllers/shop/searchController.js';

const router=exprees.Router();

router.get("/:keyword",searchProduct);

export default router