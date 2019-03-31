const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Job model
const Job = require('../../models/Job');

// Profile model
const Profile = require('../../models/Profile');

// Job Validation
const validateJobInput = require('../../validation/job')

// @route Get api/posts/test
// @desc Tests posts route
// @access Public
router.get('/test', (req, res) => res.json({msg:"Jobs Works"}));

// @route Get api/jobs
// @desc Get jobs
// @access Public
router.get('/', (req, res) => {
  Job.find()
    .sort({date: -1})
    .then(jobs => res.json(jobs))
    .catch(err => res.status(404).json({nojobsfound: 'No jobs found'}) // not works
  );
});

// @route Get api/jobs/:id
// @desc Get jobs
// @access Public
router.get('/:id', (req, res) => {
  Job.findById(req.params.id)
    .then(job => res.json(job))
    .catch(err => res.status(404).json({nojobsfound: 'No jobs found with this ID'}));
});

// @route Post api/jobs
// @desc Creat jobs
// @access Private
router.post('/', passport.authenticate('jwt', {session: false}),(req, res) => {
 const {errors, isValid} = validateJobInput(req.body);

 //Check Validation
 if(!isValid) {
   return res.status(400).json(errors);
 }

  const newJob = new Job({
    title: req.body.title,
    companyName: req.body.companyName,
    requirements: req.body.requirements,
    aboutCompany: req.aboutCompany,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  });

  newJob.save().then(job => res.json(job));
});

// @route Delete api/jobs/:id
// @desc delete job
// @access Private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOne({user: req.user.id})
    .then(profile => {
      Job.findById(req.params.id)
        .then(job => {
          if(job.user.toString() !== req.user.id){
            return res.status(401).json({notauthorized: 'User not authorized'});
          }

          // Delet job
          job.remove().then(() => res.json({success: true}));
        })
        .catch(err => res.status(404).json({jobnotfound: 'Job not found'}));
    });

});


module.exports = router;
