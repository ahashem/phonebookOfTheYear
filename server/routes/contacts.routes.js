const Router = require('express');
const ContactsController = require('../controllers/contacts.controller');

const router = new Router();

// Get all Images from Collection
router.route('/contacts').get(ContactsController.getContacts);
router.route('/contacts/new').post(ContactsController.createLabel);
router.route('/contacts/:id').get(ContactsController.getContactById);
router.route('/contacts/:id').post(ContactsController.updateLabelById);
router.route('/contacts/:id').delete(ContactsController.removeLabelById);

module.exports = router;
