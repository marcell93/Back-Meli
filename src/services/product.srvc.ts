import axios from 'axios';

/**
 * @class ProductService
 */
class ProductService {

  /**
   * @description Search products
   * @returns {Promise<User[]>}
   */
  async search(search: string): Promise<any> {
    return await axios.get('https://api.mercadolibre.com/sites/MLA/search?q=:' + search);
  }

  /**
   * @description Find product by Id
   * @returns {Promise<void>}
   */
  async findById(id: string): Promise<any> {
    return await axios.get('https://api.mercadolibre.com/items/' + id);
  }

  /**
   * @description Find product description by Id
   * @returns {Promise<void>}
   */
  async findDescriptionById(id: string): Promise<any> {
    return await axios.get('https://api.mercadolibre.com/items/' + id + '/description');
  }

}

export default new ProductService();