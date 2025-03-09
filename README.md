###Super Index 🦸‍♂️🦸‍♀️
This React-based Single Page Application (SPA) allows you to explore Marvel superheroes, view their details, and manage a list of favourites. Users can also create accounts, log in, and log out to personalize their experience.

---

## Features ✨

- **Explore Superheroes**: Browse through a vast collection of Marvel superheroes. 🕵️‍♂️
- **Search and Filter**: Search for superheroes by name and filter results. 🔍
- **View Details**: Click on a superhero to see their description and their lists of comics. 📖
- **Favourites**: Log in to save your favourite superheroes and access them anytime, you can also remove them from your list. ❤️
- **Infinite Scroll**: Instead of numbered pages the heroes just keep loading. 🔄
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices. 📱💻

---

## How to Use 🚀

### 1. Landing

- You can choose to sign up, log in or simply browse freely.
- By clicking on the search button on the landing page you'll find it takes you to a search bar. 🦸‍♂️
- Clicking the show all button will give you superheroes organized alphabetically.
- Scroll down to load more superheroes. ⬇️

### 2. Search for Superheroes

- Use the search bar at the top to find superheroes by name. 🔍
- Type at least 3 characters to see suggestions. ✨

### 3. View Superhero Details

- Click on a superhero card to open a modal with more details, including:
- A description of the superhero. 📝
- A list of comics they appear in. 📚

### 4. Manage Favourites

- **Log in** or **sign up** to save your favourite superheroes. 🔐
- Click the "🖤 Assemble" button on a superhero card to add them to your favourites. ❤️
- View and edit your faves on the **Favourites** page. 📋

---

## Setup for Local Development 🛠️

To run this project locally, you’ll need to set up both the **backend** and **frontend**. Follow these steps:

### Prerequisites

- Node.js (v16 or higher) 🖥️
- npm (comes with Node.js) 📦

---

### 1. Set Up the Backend

#### a. Clone the Repository

```
git clone https://github.com/dreahocevar/marvel-super-index.git
cd marvel-super-index/backend
```

#### b. Install Dependencies

```
npm install
```

#### c. Set Up Environment Variables

1. Create a `.env` file in the `backend` folder.
2. Add your Marvel API keys:

```
MARVEL_PUBLIC_KEY=your_public_key
MARVEL_PRIVATE_KEY=your_private_key
```

- Replace `your_public_key` and `your_private_key` with your actual Marvel API keys from the [Marvel Developer Portal](https://developer.marvel.com/).

#### d. Start the Backend Server

```
node server.js
```

- The backend server will run at `http://localhost:5000`.

---

### 2. Set Up the Frontend

#### a. Navigate to the src Folder

```
cd ../src
```

#### b. Install Dependencies

```
npm install
```

#### c. Start the React App

```
npm start
```

- The React app will open in your browser at `http://localhost:3000`.

---

## Technologies Used 🛠️

- **Frontend**: React, React Router, Axios 🖥️
- **Styling**: CSS Modules 🎨
- **Authentication**: Context API 🔐
- **API**: [Marvel API](https://www.postman.com/alex-postman-workspace/marvel-api-workspace/documentation/989e351/marvel-api) 🌐
- **Backend**: Node.js, Express 🖥️

---

## Contributing 🤝

Contributions are welcome! If you’d like to contribute to this project, please follow these steps:

1. Fork the repository. 🍴
2. Create a new branch (`git checkout -b feature/your-feature`). 🌿
3. Commit your changes (`git commit -m 'Add some feature'`). 💾
4. Push to the branch (`git push origin feature/your-feature`). 🚀
5. Open a pull request. 🔄

---

## License 📄

This project is licensed under the MIT License. See the [LICENSE](https://license/) file for details.

---

Go ahead, assemble you fav heroes and tell me all about it!🚀
