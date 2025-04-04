function authorizeRole(role) {
    return (req, res, next) => {
      if (req.user.role !== role) {
        return res.status(403).json({ message: 'Access denied. '+role.toUpperCase()+' only.' });
      }
      next();
    };
  }
  
  module.exports = authorizeRole;