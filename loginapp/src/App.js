// import logo from './logo.svg';
import './App.css';
import Home from "./components/Home";
import Listing from "./components/Listing";
import About from "./components/About";
import Header from "./components/Header";
import Login from "./components/Login";
function App() {
  return (
    <div className="App">
      <Header/>
       <Login/>
       <Home/>
      <Listing/>
      <About/>
    </div>
  );
}

export default App;
