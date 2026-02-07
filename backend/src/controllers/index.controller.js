export const healthCheck = (req, res) => {
  res.status(200).send("Backend is running");
};
