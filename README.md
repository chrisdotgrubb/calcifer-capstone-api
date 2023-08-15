# Store API

This API is designed to supply requested information to a separate front end for displaying that data. The models are
designed with a web store in mind. The _Item_ model holds information about the products that are for sale in the shop.
These _items_ can be placed in a cart in the client, then sent together to create an _order_. The _Order_ model holds
information about the _order_ that was placed. When an _order_ is placed, _items_ are converted into _order items_, so
the information about the specific _items_ will be retained through future changes to _items_.

A _User_ model is also available. This is to allow _user_ login and to associate _orders_ with the _user_ that placed
them. The _User_ model is can be used to filter out _orders_ by the associated _user_. This is currently not being
utilized, mainly to allow the site to be used by anyone without having to create an account to see all the features.

This project was made with Typescript, using Node and Express for the server. It uses Mongoose to connect to a MongoDB
database for storing all data. It is currently deployed [here](https://calcifer-api.onrender.com) using render.com.

# Routes

## Items

| Method | Path               | Purpose             |                    Data                    |
|--------|--------------------|---------------------|:------------------------------------------:|
| GET    | /api/items         | View all _items_    |                 No payload                 |
| GET    | /api/items/:itemId | View one _item_     |                 No payload                 |
| POST   | /api/items         | Create a new _item_ | Takes new _item_ fields<br>(req.body)<br/> |
| PUT    | /api/items/:itemId | Update an _item_    | Takes updated _item_ fields<br>(req.body)  |
| DELETE | /api/items/:itemId | Delete an _item_    |                 No Payload                 |

<br />

## Orders

| Method | Path                 | Purpose             |                       Data                       |
|--------|----------------------|---------------------|:------------------------------------------------:|
| GET    | /api/orders          | View all _orders_   |                    No payload                    |
| GET    | /api/orders/:orderId | View one order_     |                    No payload                    |
| POST   | /api/orders          | Create a new order_ | Takes cart _items_ and isDelivery <br>(req.body) |
| DELETE | /api/orders/:orderId | Delete an order_    |                    No Payload                    |

<br />

> _Order-create_ takes the cart items as an array of _item_ ids. It does not take the full object from the user, as this
> could lead to incorrect _item_ data. Once the ids are passed, the api looks up those _items_ by id to get the most
> recent information when placing the order. Also, isDelivery should be passed with a boolean to signify if the order is
> for delivery or pickup.

<br />


<br/>

## Users

| Method | Path               | Purpose             |                Data                |
|--------|--------------------|---------------------|:----------------------------------:|
| GET    | /api/users         | View all _users_    |             No payload             |
| POST   | /api/users         | Create a new _user_ | Takes _user_ fields <br>(req.body) |
| DELETE | /api/users/:userId | Delete a _user_     |             No Payload             |

> _User-create_ takes an object with _username_ and _password_ fields.

<br />

## Auth

| Method | Path              | Purpose                   |                                Data                                 |
|--------|-------------------|---------------------------|:-------------------------------------------------------------------:|
| GET    | /api/auth/refresh | Refresh accessToken       | No payload <br /> Needs to send http-only cookie with refresh token |
| POST   | /api/auth         | Login a _user_            |                Takes _user_ fields <br />(req.body)                 |
| POST   | /api/auth/logout  | Logout the current _user_ |                             No payload                              |

> _Auth-login_ takes an object with _username_ and _password_ fields. It returns a short-lived access token to be
> stored and sent with each request to the api that requires authentication. It also stores a refresh token as an
> http-only cookie that will be sent with refresh requests when the access token expires._Auth-refresh_returns a new
> access token using the refresh token that is stored in a secure cookie. The client needs to send http-only cookies to
> enable this to work properly. _Auth-logout_ clears the refresh-token from the http-only cookie, but access token will
> need to be cleared on the client-side.

## Next steps

The api is mostly complete, but could benefit from some improvements. Currently, all orders are being associated to one
user. Also, the manipulation of _items_ should require a _user_ to have a _manager role_. This is mostly for ease of
demonstrating the client. Once the client is updated, this api should assign the logged-in _user_ to the
_order_ being placed. Also in production, there should be more access restrictions using authentication and
authorization. Some settings, like CORS and the http-only cookie, can be changed for better security if needed.
