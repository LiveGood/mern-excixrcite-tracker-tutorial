const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
    Exercise.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error ' + err))
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);
    
    const newExercise = new Exercise({
        // _id: req.body._id ? req.body._id : undefined,
        username,
        description,
        duration,
        date
    });
    
    newExercise.save()
    .then(() => res.json('Exercise added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
      .then(exercise => {
        res.json(exercise)
      })
      .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
      .then(exercise => res.json(`Exercise '${exercise._id}' deleted.`))
      .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/update/:id').put((req, res) => {
    Exercise.findById(req.params.id)
      .then(exercise => {
        console.log(req.params);
        console.log(exercise);
        exercise.username = req.body.username? req.body.username : exercise.username;
        exercise.description = req.body.description ? req.body.description : exercise.description;
        exercise.duration = Number(req.body.duration) ? Number(req.body.duration) : exercise.duration;
        exercise.date = Date.parse(req.body.date) ? Date.parse(req.body.date) : exercise.date;

        exercise.save()
          .then(() => res.json(`Exercise '${req.params.id}' updated!`))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err))

});


module.exports = router;