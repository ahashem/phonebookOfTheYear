const logger = require('../../lib/logger');
const Contacts = require('../mock-data/mockData');

module.exports.getContacts = (req, res) => {
  if (!Contacts || Contacts.length === 0) {
    return res.status(400).send('No contacts found');
  }
  return res.json({ contacts: Contacts });
};

module.exports.getContactById = (req, res) => {
  const contactId = req.params.id;
  if (!contactId) {
    res.status(400).send('Something wrong with the requested contact Id');
  }
  let contact = Contacts.find(contact => contact.id === parseInt(contactId))
  if (!contact) {
    return res.status(400).send('Requested Contact not found');
  }

  return res.json({ contact });
};

module.exports.createContact = (req, res) => {
  const newContact = req.body.contact;
  if (!newContact) {
    res.status(400).send('Missing Contact object');
  }

  logger.info('create Contact object: ', newContact);
  const contact = {
    id: Contacts.length,
    name: newContact.name || '',
    phone: newContact.phone || '',
    email: newContact.email || ''
  };

  Contacts.push(contact);
  res.status(201).end();
};

module.exports.updateContactById = (req, res) => {
  const contactId = req.params.id;
  const updatedContact = req.body.contact;
  if (!contactId) {
    return res.status(400).send('Something wrong with the requested contact Id');
  }
  if (!updatedContact) {
    return res.status(400).send('Missing updated Contact object');
  }

  logger.info('updated Contact object: ', updatedContact);
  let contactToUpdate = Contacts.find(contact => contact.id === parseInt(contactId))
  if (!contactToUpdate) {
    return res.status(400).send('Requested Contact not found');
  }
  contactToUpdate.name = updatedContact.name || contactToUpdate.name;
  contactToUpdate.phone = updatedContact.phone || contactToUpdate.phone;
  contactToUpdate.email = updatedContact.email || contactToUpdate.email;

  return res.status(201).end();
};

module.exports.removeContactById = (req, res) => {
  const contactId = req.params.id;
  console.log('ContactId: ', contactId)
  if (!contactId) {
    return res.status(400).send('Something wrong with the requested contact Id');
  }
  let contactToRemove = Contacts.findIndex(contact => contact.id === parseInt(contactId))
  console.log('contactToRemove: ', contactToRemove)
  if (contactToRemove === -1) {
    return res.status(400).send('Requested Contact not found');
  }

  Contacts.splice(contactToRemove,1)
  return res.status(201).send();
};
