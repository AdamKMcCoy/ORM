const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");
router.get("/", (req, res) =>
 {
  Tag.findAll({
    attributes: ["id", "tag_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock"],
        through: ProductTag,
        as: 'tagProducts'
      },
    ],
  })
    .then((dbtagData) => res.json(dbtagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) =>
 {
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "tag_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock"],
        through: ProductTag,
        as: 'tagProducts'
      },
    ],
  })
    .then((dbtagData) => res.json(dbtagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.post("/", (req, res) =>
 {
  Tag.create(req.body)
  .then((tag) => {
    res.status(200).json(tag);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});
router.put("/:id", (req, res) =>
 {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((dbTagData) => {
    if (!dbTagData) {
      res.status(404).json({ message: "No Tag found with this id" });
      return;
    }
    res.json(dbTagData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});
router.delete("/:id", (req, res) =>
 {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  }).then((dbTagData) => {
    if (!dbTagData) {
      res.status(404).json({ message: "No Tag found with this id" });
      return;
    }
    res.json(dbTagData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});
module.exports = router;