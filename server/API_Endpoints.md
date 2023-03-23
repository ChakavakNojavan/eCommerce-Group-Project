**Endpoints**

| Endpoint            | Method   | Description                            |
| ------------------- | -------- | -------------------------------------- |
| `/api/products`     | `GET`    | Return all products.                   |
| `/api/products/:id` | `GET`    | Return a single product based on id.   |
| `/api/companies`    | `GET`    | Return a list of all companies.        |
| `/api/cart`         | `GET`    | Return all products currently in cart. |
| --------            | ------   | ----------------------                 |
| `/api/cart/:id`     | `POST`   | Add item to cart collection.           |
| --------            | ------   | ----------------------                 |
| `/api/cart`         | `DELETE` | Remove all items in cart               |
| `/api/cart/:id`     | `DELETE` | Remove a single item from cart         |
