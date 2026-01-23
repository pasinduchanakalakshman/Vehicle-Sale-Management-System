import User from "../models/User.js";

export const findByEmail = (email) => User.findOne({ email });

export const findById = (id) => User.findById(id);

export const createUser = (data) => User.create(data);

export const updateById = (id, data) => User.findByIdAndUpdate(id, data, { new: true });
