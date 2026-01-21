import User from "../models/User.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile", error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  const updates = {};
  const allowed = ["name", "email"];
  allowed.forEach((k) => {
    if (req.body[k] !== undefined) updates[k] = req.body[k];
  });

  try {
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select("-password");
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile", error: err.message });
  }
};
