const logger = require('../../lib/logger');
const Contacts = require('../mock-data/mockData')

module.exports.getContacts = (req, res) => {
  if (!Contacts || Contacts.length === 0) {
        return res.status(400).send('No contacts found');
      }
      return res.json({ contacts: Contacts });
};

module.exports.getContactById = (req, res) => {
  if (!req.params.id) {
    res.status(400).send('Something wrong with the requested contact Id');
  }
  Contacts.findById(req.params.id)
    .then(contact => {
      if (!label) {
        res.status(400).send('Requested Label not found');
      }
      return res.json({ contact });
    })
    .catch(error => {
      logger.error(error);
      res.status(500).send(error);
    });
};

module.exports.createLabel = (req, res) => {
  const newLabel = req.body.label;
  if (!newLabel) {
    res.status(400).send('Missing Label object');
  }

  logger.info('create Label object: ', newLabel);
  const contact = new Label(newLabel);
  label
    .save()
    .then(contact => {
      res.status(201).end();
    })
    .catch(error => {
      logger.error(error);
      res.status(500).send(error);
    });
};

module.exports.updateLabelById = (req, res) => {
  const labelId = req.params.id;
  const updatedLabel = req.body.label;
  if (!labelId) {
    res.status(400).send('Something wrong with the requested contact Id');
  }
  if (!updatedLabel) {
    res.status(400).send('Missing updated Label object');
  }

  logger.info('updated Label object: ', updatedLabel);
  Contacts.findById(labelId)
    .then(contact => {
      if (!label) {
        res.status(400).send('Requested Label not found');
      }
      label.contact = updatedLabel;
      return label.save();
    })
    .then(contact => {
      res.status(201).end();
    })
    .catch(error => {
      logger.error(error);
      res.status(500).send(error);
    });
};

module.exports.removeLabelById = (req, res) => {
  const labelId = req.params.id;
  if (!labelId) {
    res.status(400).send('Something wrong with the requested contact Id');
  }
  logger.info('removing Label object with Id: ', labelId);
  Contacts.findByIdAndRemove(labelId)
    .then(() => res.status(201).send())
    .catch(error => {
      logger.error(error);
      res.status(500).send(error);
    });
};
