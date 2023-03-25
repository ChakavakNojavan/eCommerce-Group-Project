**Endpoints**

| Endpoint            | Method   | Description                                               |
| ------------------- | -------- | --------------------------------------------------------- |
| `/api/products`     | `GET`    | Returns all products.                                      |
| `/api/products/:id` | `GET`    | Return a single product based on id.                      |
| `/api/companies`    | `GET`    | Return a list of all companies.                           |
| `/api/cart`         | `GET`    | Return all products currently in cart.                    |
| --------            | ------   | ----------------------                                    |
| `/api/cart/:id`     | `POST`   | Add item to cart collection.                              |
| --------            | ------   | ----------------------                                    |
| `/api/cart/:id`     | `PATCH`  | This updates the quantity of items in the shopping cart.  |
| `/update-stock`     | `PATCH`  | This alters the number of stock available after checkout. |
| --------            | ------   | ----------------------                                    |
| `/api/cart`         | `DELETE` | Remove all items in cart                                  |
| `/api/cart/:id`     | `DELETE` | Remove a single item from cart                            |
