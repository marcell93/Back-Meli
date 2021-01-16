import { Request, Response } from 'express';
import ProductService from '../services/product.srvc';

class ProductController {

  private author = {
    name: 'Marcell',
    lastname: 'Calero'
  };

  search = async (req: Request, resp: Response) => {
    try {
      const search = req.query.q;
      if (!search) {
        return resp.status(400).send({
          msg: 'q param is missing',
          code: 400
        });
      }
      const products = await ProductService.search(search);
      const response = {
        author: this.author,
        categories: products.data.available_filters.find(f => f.id === 'category')?.values.map(v => v.name) ?? [],
        items: products.data.results
      };
      resp.status(200).send(response);
    } catch (error) {
      console.error('ProductController - search', error);
      resp.send({
        msg: 'Error',
        status: 500
      });
    }
  }

  findById = async (req: Request, resp: Response) => {
    try {
      const id = req.params.id;
      if (!id) {
        return resp.status(400).send({
          msg: 'id is missing',
          code: 400
        });
      }
      const produt = await ProductService.findById(id);
      const produtDescription = await ProductService.findDescriptionById(id);
      const response = {
        author: this.author,
        item: produt.data,
      };
      if (response.item) {
        response.item.description = produtDescription.data.plain_text;
      }
      resp.status(200).send(response);
    } catch (error) {
      console.error('ProductController - findById', error);
      resp.send({
        msg: 'Error',
        status: 500
      });
    }
  }
}

export default new ProductController();