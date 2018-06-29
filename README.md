# adonis-resource-controller
Restful resource controller for AdonisJs

## Usage
1. Requirements
  Please install [adonis-resource-middleware](https://github.com/wxs77577/adonis-resource-middleware) first, and setup the routes with `resource` middleware. After that, your `/start/routes.js` should looks like this:
  ```javascript
  const Route = use('Route')

  Route.resource('/api/:resource', 'ResourceController').middleware(['resource'])
  ```
1. Install 
    ```bash
    npm i -S adonis-resource-controller
    ```
1. Make a controller: `/app/Controllers/Http/ResourceController.js`
    ```javascript
    const BaseController = require('adonis-resource-controller')

    module.exports = class ResourceController extends BaseController {

    }
    ```
#### Now, you can play CRUD with your APIs. All [CRUD Routes](https://www.adonisjs.com/docs/4.1/routing#_route_resources).

## for [REST-ADMIN](https://github.com/wxs77577/rest-admin)

> The routes and returned data gave a first-class supporting for [`rest-admin`](https://github.com/wxs77577/rest-admin) - A Powerful Admin Dashboard based on `vue2` + `bootstrap4`

### Usage
> Let's getting start with CRUD for users.
1. Open your `/app/Models/User.js`, add a `fields()` method:
    ```javascript
    class User {
      
      static get fields() {
        return {
          _id: { label: 'ID' },
          username: { label: 'Username', cols: 3 },
          password: { label: 'Password', type: 'password', listable: false, cols: 3 },
          is_active: { label: 'Is Active', type: 'switch', cols: 3, editable: false },
          member_type: { label: 'Member Type', type: 'select', options: [
            { text: 'VIP', value: 1 },
            { text: 'GOLD', value: 2 },
          ] },
          intro: { label: 'Intro', type: 'html', cols: 6, listable: false, },
        }
      }

    }
    ```

1. Clone [rest-admin](https://github.com/wxs77577/rest-admin)
1. Copy `.env` to `.env.development.local`, open it, and change the API URL to the AdonisJs server api url:
    ```bash
    VUE_APP_API_URL=http://localhost:3333/api/
    ```
1. `npm run dev`
1. Open http://localhost:8080/#/rest/users

Is that what you want? :)
