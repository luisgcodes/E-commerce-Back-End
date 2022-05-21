const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  try {
    const getCategories = await Category.findAll({
      include: [Product]
    });
    res.status(202).json(getCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', (req, res) => {

  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const getCategories = await Category.findByPk(req.params.id,{
      include: [Product]
    });
    res.status(202).json(getCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

 // create a new category
router.post('/', (req, res) => {
  try {
    const newCategory = await Category.create({
    category_name: req.body.category_name,
  }); res.status(202).json(newCategory); 
} catch (err) {
    res.status(400).json(err)
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update({
      category_name: req.body.category_name },
      {where: {id: req.params.id}}
    ); 
      res.status(202).json(updateCategory); 
    } catch (err) {
      res.status(400).json(err)
    }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.delete({
      where: {id: req.params.id}
    }); res.status(202).json(deleteCategory);
  } catch (err) {
    res.status(400)
  }
});

module.exports = router;
