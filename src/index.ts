import app from "./infra/http/server";

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000/graphql");
});
