import { Router } from 'express';
import ProductController from './controllers/product.ctrl';

const ProductRouter = Router();
ProductRouter.get('/', ProductController.search);
ProductRouter.get('/:id', ProductController.findById);
export { ProductRouter };
