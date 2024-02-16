exports.dashboardPage = async (req, res) => {
  const user = req.user;
  const { name, email } = user;
  res.render("dashboard", { name, email, baseUrl: process.env.BASE_URL });
};