
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (username === 'admin' && password === '123') {
            
            const token = jwt.sign(
                { id: '60c72b2f90b9a67a54a72d1f', role: 'admin' }, 
                'CUC_KY_BI_MAT_123', 
                { expiresIn: '1d' }
            );

            return res.json({ 
                message: "Login Successfully (HARDCODED)", 
                token: token,
                username: 'Admin',
                role: 'admin'
            });
        } else {
            return res.status(400).json({ message: "Incorrect username or password!" });
        }
    } catch (err) {
        res.status(500).json({ error: 'Server error during token creation.' });
    }
};
