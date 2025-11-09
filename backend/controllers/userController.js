const express = require("express");
const User = require("../models/users");
const bcrypt = require("bcryptjs");

const getAllUser = async (req, res) => {
  try {
    const response = await User.find();

    if (!response) {
      res
        .status(500)
        .json({ message: "Error mengambil data user dari database: ", e });
    }

    res.status(200).json(response);
  } catch (e) {}
};

const getUserById = async (req, res) => {
  const { id_user } = req.body;

  try {
    const response = await User.findById({ _id: id_user });

    if (!response) {
      res.status(500).json({
        message: `Tidak ada data user dengan id ${id_user} yang ditemukan`,
      });
    }

    res.status(200).json(response);
  } catch (e) {
    throw Exception(
      `Error mengambil data user id:${id_user} dari database: ${e}`
    );
  }
};

const updateUser = async (req, res) => {
  const { id_user, nama, email, peran } = req.body;

  try {
    const existingUser = await User.findOne({ _id: id_user });

    existingUser.nama = nama;
    existingUser.email = email;
    existingUser.peran = peran;

    await existingUser.save();

    res
      .status(200)
      .json({ message: "Berhasil update data user id: ", id_user });
  } catch (e) {
    throw Exception(`Error mengupdate data user id:${id_user}: ${e}`);
  }
};

const ubahPassword = async (req, res) => {
  const { id_user, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({ _id: id_user });

    if (!existingUser) {
      return res
        .status(404)
        .json({ message: `User with ID ${id_user} tidak ditemukan` });
    }

    existingUser.password = hashedPassword;

    await existingUser.save();

    res
      .status(200)
      .json({ message: "Berhasil update password user id: ", id_user });
  } catch (e) {
    console.error(`Error updating password for user id:${id_user}: ${e}`);
    res.status(500).json({ message: `Error updating password: ${e.message}` });
  }
};

module.exports = {
  getAllUser,
  getUserById,
  updateUser,
  ubahPassword,
};
