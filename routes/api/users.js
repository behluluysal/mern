const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

//Models
const User = require('../../models/User');

// @route   POST api/users
// @desc    Register Route
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name alanı gereklidir.').not().isEmpty(),
    check('email', 'Geçerli bir e-mail adresi giriniz.').isEmail(),
    check('password', 'Şifreniz en az 6 karakter olmalı.').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Check if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Bu maile ait kullanıcı mevcuttur.' }] });
      }
    } catch (error) {
      res.status(500).send('Server Error');
    }

    res.send('User Route');
  }
);

module.exports = router;
