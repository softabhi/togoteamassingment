// Token verification middleware
const jwt = require('jsonwebtoken');
const jwtSecret = "fdsdeg4521serfs"

    verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
  
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'Unauthorized' });
      }
  
      req.user = decoded;
      next();
    });
  };