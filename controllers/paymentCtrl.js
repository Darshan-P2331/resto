const Payment = require("../models/paymentModel");
const User = require("../models/userModel");
const Product = require("../models/productModel");

const paymentCtrl = {
  getPayments: async (req, res) => {
    try {
      const payments = await Payment.find({ user: req.user.id });
      res.json(payments);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllPayments: async (req, res) => {
    try {
      const payments = await Payment.find();
      res.json(payments);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createPayment: async (req, res) => {
    try {
      const { orderItems, total, paidAt, payment } = req.body;
      const newPayment = new Payment({
        orderItems,
        shippingAddress: {
          fullName: payment.address.recipient_name,
          address: payment.address.line1,
          city: payment.address.city,
          country: payment.address.country_code,
          postalCode: payment.address.postal_code,
        },
        paymentResult: {
          id: payment.paymentID,
          status: payment.paid,
          update_time: Date(paidAt).toString(),
          email_address: payment.email,
        },
        totalPrice: total,
        user: req.user.id,
        isPaid: payment.paid,
        paidAt,
      });

      orderItems.filter((item) => {
        return sold(item._id, item.quantity, item.sold);
      });

      await newPayment.save();
      res.json({ msg: "Payment successfull" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const sold = async (id, quantity, oldSold) => {
  await Product.findOneAndUpdate(
    { _id: id },
    {
      sold: quantity + oldSold,
    }
  );
};

module.exports = paymentCtrl;
