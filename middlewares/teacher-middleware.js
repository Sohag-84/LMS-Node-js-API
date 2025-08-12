const isTeacherUser = (req, res, next) => {
  if (req.userInfo.role != "teacher" && req.userInfo.role != "admin") {
    return res.status(401).json({
      success: false,
      message: "Access denied!Admin or Teacher rights required",
    });
  }
  next();
};

module.exports = isTeacherUser;
