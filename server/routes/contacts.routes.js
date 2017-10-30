const Router = require('express');
const ContactsController = require('../controllers/contacts.controller');

const router = new Router();

// Get all Images from Collection
router.route('/contacts').get(ContactsController.getContacts);
router.route('/contacts/new').post(ContactsController.createContact);
router.route('/contacts/:id').get(ContactsController.getContactById);
router.route('/contacts/:id').post(ContactsController.updateContactById);
router.route('/contacts/:id').delete(ContactsController.removeContactById);

module.exports = router;
