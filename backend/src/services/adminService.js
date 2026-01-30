import User from "../models/User.js";
import Vehicle from "../models/Vehicle.js";

export const getAdminOverview = async () => {
  const [totalUsers, totalVehicles, adminCount, ownerCount, managerCount, customerCount] =
    await Promise.all([
      User.countDocuments({}),
      Vehicle.countDocuments({}),
      User.countDocuments({ role: "admin" }),
      User.countDocuments({ role: "owner" }),
      User.countDocuments({ role: "manager" }),
      User.countDocuments({ role: "customer" }),
    ]);

  return {
    totals: {
      users: totalUsers,
      vehicles: totalVehicles,
    },
    usersByRole: {
      admin: adminCount,
      owner: ownerCount,
      manager: managerCount,
      customer: customerCount,
    },
  };
};
