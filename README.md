# 👗 Virtual Closet App

The Virtual Closet app is a personal wardrobe manager where users can create a digital version of their closet.  
It allows adding clothing items, organizing them into outfits, and viewing all wardrobe items in one place.  

This app was built as part of a full-stack project using Node.js and MongoDB.  
It combines authentication, CRUD functionality, and relational data modeling to meet assignment requirements.  

---

## 🖼️ Screenshot / Logo
![App Screenshot](screenshot.png)  

---

## ✨ Inspiration
The idea for this app was inspired by the movie *Clueless* (1995).  
In the film, the main character Cher uses a computer program to browse her wardrobe and put together outfits.  
This project reimagines that concept with modern web technologies, giving users their own digital closet to store clothing items and create outfits.

---

## 📌 User Stories

- **As a guest user**  
  - I want to sign up for an account, so that I can have my own virtual closet.  
  - I want to log in, so that I can access my closet.  
  - I want to be restricted from adding, editing, or deleting clothing items or outfits, so that only registered users can manage data.  

- **As a logged-in user**  
  - I want to add new clothing items, so that I can keep track of my wardrobe.  
  - I want to view all my clothing items, so that I can see what I own at a glance.  
  - I want to edit clothing items, so that I can correct or update their details.  
  - I want to delete clothing items, so that I can remove items I no longer want.  
  - I want to create outfits by combining clothing items, so that I can plan my outfits.  
  - I want to view my outfits, so that I can see my combinations at a glance.  
  - I want to edit my outfits, so that I can modify outfit details or add/remove items.  
  - I want to delete my outfits, so that I can remove unwanted combinations.  
  - I want to log out securely, so that my account remains private.  

---

## 📂 Routes Overview

### Authentication
| Method | Route        | Description             |
|--------|-------------|-------------------------|
| GET    | `/signup`   | Show signup form        |
| POST   | `/signup`   | Create new user         |
| GET    | `/login`    | Show login form         |
| POST   | `/login`    | Authenticate user       |
| GET    | `/logout`   | Log out current user    |

### Clothing Items
| Method | Route              | Description                     |
|--------|-------------------|---------------------------------|
| GET    | `/clothing`       | List all clothing items (user)  |
| GET    | `/clothing/new`   | Show form to add new item       |
| POST   | `/clothing`       | Create new clothing item        |
| GET    | `/clothing/:id`   | Show details of one item        |
| GET    | `/clothing/:id/edit` | Show edit form              |
| PUT    | `/clothing/:id`   | Update item details             |
| DELETE | `/clothing/:id`   | Delete clothing item            |

### Outfits
| Method | Route             | Description                     |
|--------|------------------|---------------------------------|
| GET    | `/outfits`       | List all outfits (user)         |
| GET    | `/outfits/new`   | Show form to create new outfit  |
| POST   | `/outfits`       | Create new outfit               |
| GET    | `/outfits/:id`   | Show details of one outfit      |
| GET    | `/outfits/:id/edit` | Show edit form               |
| PUT    | `/outfits/:id`   | Update outfit details           |
| DELETE | `/outfits/:id`   | Delete outfit                   |

---

## 🛠️ Technologies Used

- **Languages:** JavaScript, HTML, CSS  
- **Backend Framework:** Node.js, Express  
- **Frontend:** EJS Templates  
- **Database:** MongoDB with Mongoose  
- **Authentication:** express-session + bcrypt  
- **Deployment:** Render or Railway + MongoDB Atlas  

---

## ⚙️ Getting Started

- **Deployed App:** [Live Demo](https://your-deployed-app-link.com)  
- **Planning Materials:** [Trello Board / Wireframes / Docs](https://trello.com/invite/b/68cfdb04cd1a41da3d331923/ATTI33fb665c90d835021aeb1e0563a0c5f9AE633675/virtual-closet)

---

## 🚀 Future Work

- Integration with external fashion APIs (e.g., trend suggestions, shopping links).  
- Outfit calendar to plan what to wear on specific days.  
- Social features: follow friends, like and comment on outfits.  
- AI-based outfit recommendations based on user preferences and closet inventory.  
- Export closet/outfits as a PDF lookbook.  
