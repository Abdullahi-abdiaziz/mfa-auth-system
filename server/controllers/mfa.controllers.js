export const setupMfa = async (req, res) => {
  res.json({ message: "MFA setup successful" });
};

export const verifyMfa = async (req, res) => {
  res.json({ message: "MFA verification successful" });
};

export const resetMfa = async (req, res) => {
  res.json({ message: "MFA reset successful" });
};
