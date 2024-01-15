// indexController.js
const renderHomePage = (req, res) => {
  res.render("index", { title: "Home Page" });
};

module.exports = { renderHomePage };
