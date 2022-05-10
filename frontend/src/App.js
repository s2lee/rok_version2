import "./App.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import SearchNewsByDate from "./components/SearchNewsByDate";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ArticleSectionPage from "./pages/ArticleSectionPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import SearchNewsByDatePage from "./pages/SearchNewsByDatePage";
import PostArticle from "./components/PostArticle";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Header />
          <Navbar />
          <div id="wrapper">
            <div id="main">
              <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/login" exact component={LoginPage} />
                <Route path="/signup" exact component={SignUpPage} />
                <Route
                  path="/newspaper"
                  exact
                  component={SearchNewsByDatePage}
                />
                <Route
                  path="/newspaper/:year/:month/:day/"
                  exact
                  component={SearchNewsByDate}
                />
                <Route
                  path="/:category/"
                  exact
                  component={ArticleSectionPage}
                />
                <Route path="/:category/post/" exact component={PostArticle} />
                <Route
                  path="/:category/:id"
                  exact
                  component={ArticleDetailPage}
                />
              </Switch>
            </div>
            <Footer />
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
