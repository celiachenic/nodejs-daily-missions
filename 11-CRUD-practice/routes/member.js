const express = require("express");
const router = express.Router();

let members = [
  { id: 1, name: "王小明" },
  { id: 2, name: "李小花" },
];

let nextId = 3;

//----------------helper functions------------
const findById = (list, id) => {
  return list.find((item) => item.id === Number(id));
};

const validateFields = (body, requiredFields) => {
  return requiredFields.filter((item) => {
    const value = body[item];
    return value == null || value.toString().trim() === ""; //value == null 成立條件： value 為 null 或 undefined
  });
};

//------------------路由處理-------------------

router.get("/", (req, res) => {
  return res.status(200).json({
    status: "success",
    data: members,
  });
});

router.post("/", (req, res) => {
  const body = req.body;
  if (validateFields(body, ["name"]).length > 0) {
    return res.status(400).json({
      status: "error",
      message: "缺少必填欄位：name",
    });
  }
  const newMember = {
    id: nextId,
    name: body.name,
  };
  members.push(newMember);
  nextId++;
  return res.status(201).json({
    status: "success",
    data: newMember,
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const member = findById(members, id);
  if (!member) {
    return res.status(404).json({
      status: "error",
      message: "找不到此會員",
    });
  }
  const body = req.body;
  if (validateFields(body, ["name"]).length > 0) {
    return res.status(400).json({
      status: "error",
      message: "缺少必填欄位：name",
    });
  }

  member.name = body.name;

  return res.status(200).json({
    status: "success",
    data: {
      id: member.id,
      name: member.name,
    },
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const member = findById(members, id);
  if (!member) {
    return res.status(404).json({
      status: "error",
      message: "找不到此會員",
    });
  }
  const index = members.findIndex((item) => item.id === Number(id));
  members.splice(index, 1);

  return res.status(204).end();
});

module.exports = router;
