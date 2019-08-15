const router = require('express').Router();
let Poll = require('../models/poll.model');

router.route('/').get((req, res) => {
  Poll.find()
    .then(polls => res.json(polls))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/create').post((req, res) => {
  const question = req.body.question;
  const options = req.body.options;

  const newPoll = new Poll({
    question,
    options,
  });

  newPoll.save()
    .then(() => res.json(newPoll._id))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Poll.findByIdAndDelete(req.params.id)
    .then(() => res.json('Poll deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').post((req, res) => {
  Poll.findById(req.params.id)
    .then(poll => {
      poll.options = req.body.options;

      poll.save()
        .then(() => res.json('Vote registered'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;