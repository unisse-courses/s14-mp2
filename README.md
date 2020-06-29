# Charity App (S14)
This is an online charity management web application. Users can register and create posts to provide help and raise money for those in need.

## Heroku Deployment
Link: 

### Local Setup
1. Clone this repository: `git clone https://github.com/unisse-courses/s14-mp2`
2. Navigate to the directory
3. Install the dependencies: `npm install` and `npm install multer --save`
4. First, run `node add_data.js` to add data manually.
5. Stop the server using CTRL+C (Windows) or control (^) + C (Mac).
6. Then, run the server: `node main.js`
    * Navigate to `http://localhost:3000/` in the browser to view the app.

### Running tests
The following users may be used to log in:
| Username | Password |
|:-----------:|:--------:|
| Jacob_salazar | dlsu1234 |
| jazzmine07 | animeislife |
| Enrico_cuison | dlsu1234 |
| unisse_chua | dlsu1234 |

* Unregistered users will still be able to see posts. However, users would have limited features and would not be able to create posts and such.

### Dependencies
- bcrypt
- connect-flash
- connect-mongo
- express
- express-handlebars
- express-session
- express-validator
- hbs
- mongodb
- mongoose
- multer

### Members
- Cuison, Enrico Luis
- Ilagan, Mari Jazzmine
- Salazar, Jacob Israel

### Acknowledgments
* Miss Unisse Chua for providing materials and consulting the members.

### README Template Based On
- PurpleBooth – https://gist.github.com/PurpleBooth/109311bb0361f32d87a2