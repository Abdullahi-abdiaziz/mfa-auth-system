export const register = async (req, res) => {
  res.json({ message: "Registration successful" });
};

export const login = async (req, res) => {
  res.json({ message: "Login successful" });
};

export const logout = async (req, res) => {
  res.json({ message: "Logout successful" });
};

export const status = async (req, res) => {
  res.json({ message: "API is running" });
};
