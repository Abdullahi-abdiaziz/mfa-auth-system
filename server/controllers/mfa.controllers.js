import speakeasy from "speakeasy";
import jwt from "jsonwebtoken";
import qrcode from "qrcode";

export const setupMfa = async (req, res) => {
  try {
    const user = req.user;
    var secret = speakeasy.generateSecret();

    user.twoFactorSecret = secret.base32;
    user.isMfaActive = true;
    await user.save();

    var url = speakeasy.otpauthURL({
      secret: secret.base32,
      label: req.user.username,
      issuer: "www.aboody.com",
      encoding: "base32",
    });

    const qrImageUrl = await qrcode.toDataURL(url);

    return res.status(200).json({
      message: "MFA setup successful",
      qrImageUrl,
      secret: secret.base32,
    });
  } catch (error) {
    console.log("Sending error response");
    return res.status(500).json({
      error: "Error while setting MFA",
      message: error.message,
    });
  }
};

export const verifyMfa = async (req, res) => {
  const { token } = req.body;

  const verified = speakeasy.totp.verify({
    secret: req.user.twoFactorSecret,
    encoding: "base32",
    token,
  });

  if (verified) {
    const accessToken = jwt.sign(
      { user: req.user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1hr" }
    );

    return res.status(200).json({
      message: "MFA verification successful",
      token: accessToken,
    });
  } else {
    return res.status(401).json({ message: "Invalid MFA token" });
  }
};

export const resetMfa = async (req, res) => {
  try {
    const user = req.user;
    user.twoFactorSecret = null;
    user.isMfaActive = false;
    await user.save();

    return res.status(200).json({ message: "MFA reset successful" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error while resetting MFA", message: error.message });
  }
};

export const verifyIsAuthenticated = async (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ message: "Unauthorized user" });
};
