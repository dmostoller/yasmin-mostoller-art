import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Card, Grid, Button, Image } from 'semantic-ui-react';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAdmin } from '../context/admin';

const PollAdmin = () => {
  const [paintings, setPaintings] = useState([]);
  const [selectedPaintings, setSelectedPaintings] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [polls, setPolls] = useState([]);
  const [selectedPollId, setSelectedPollId] = useState(null);
  const [randomVote, setRandomVote] = useState(null);
  const { isAdmin } = useAdmin();
  const navigate  = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate('/'); // Redirect to homepage if not an admin
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    // Fetch paintings from the back-end
    axios.get('/painting')
      .then(response => setPaintings(response.data))
      .catch(error => console.error('Error fetching paintings:', error));

    // Fetch existing polls from the back-end
    axios.get('/api/polls')
      .then(response => setPolls(response.data))
      .catch(error => console.error('Error fetching polls:', error));
    //   console.log(polls);
  }, []);

  const handleRandomSelection = () => {
    const shuffled = [...paintings].sort(() => 0.5 - Math.random());
    setSelectedPaintings(shuffled.slice(0, 6));
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const data = {
        start_date: values.start_date,
        end_date: values.end_date,
        painting_ids: selectedPaintings.map(p => p.id),
      };

    axios.post('/api/polls/check_dates', { start_date: values.start_date, end_date: values.end_date })
      .then(response => {
        if (response.data.exists) {
          alert('A poll is already scheduled for these dates. Please choose different dates.');
          setSubmitting(false);
        } else {
          // Proceed with creating the new poll
          axios.post('/api/poll', data)
            .then(response => {
              alert('Poll created successfully!');
              setSubmitting(false);
              resetForm();
              setPolls([...polls, response.data]);
              setSelectedPaintings([]);
            })
            .catch(error => {
              console.error('Error creating poll:', error);
              setSubmitting(false);
            });
        }
      })
      .catch(error => {
        console.error('Error checking poll dates:', error);
        setSubmitting(false);
      });
  };
  const handleDelete = (pollId) => {
    if (window.confirm("Are you sure you want to delete this poll?")) {
    axios.delete(`/poll/${pollId}`)
      .then(response => {
        setSubmissionStatus('Poll deleted successfully!');
        setPolls(polls.filter(poll => poll.id !== pollId));
      })
      .catch(error => {
        setSubmissionStatus('Error deleting poll.');
      });
  };
};

  const handleRandomVote = (pollId) => {
    axios.get(`/api/polls/${pollId}/random_vote`)
      .then(response => {
        setRandomVote(response.data);
        setSelectedPollId(pollId);
      })
      .catch(error => {
        console.error('Error fetching random vote:', error);
        setRandomVote({ message: 'No votes found for this poll' });
        setSelectedPollId(pollId);

      });
  };

  const getPollStatus = (startDate, endDate) => {
    const today = new Date();
    if (today < new Date(startDate)) {
      return { status: "Upcoming", color: "blue" };
    } else if (today >= new Date(startDate) && today <= new Date(endDate)) {
      return { status: "Active", color: "green" };
    } else {
      return { status: "Completed", color: "red" };
    }
  };

  return (
    <div style={{marginTop: "110px"}}>
      <Link to="/poll">
            <Button className="ui right floated circular teal button" >Go to Contest</Button>
          </Link>
      <h1>Manage Print Contests</h1>
      <Formik
        initialValues={{ start_date: '', end_date: '' }}
        validationSchema={Yup.object({
          start_date: Yup.date().required('Required'),
          end_date: Yup.date().required('Required'),
        })}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="ui form">
            <div className='fields'>
            <div className="field">
              <label htmlFor="start_date">Start Date</label>
              <Field name="start_date" type="date" className="ui input" />
              <ErrorMessage name="start_date" component="div" className="ui pointing red basic label" />
            </div>
            <div className="field">
              <label htmlFor="end_date">End Date</label>
              <Field name="end_date" type="date" className="ui input" />
              <ErrorMessage name="end_date" component="div" className="ui pointing red basic label" />
            </div>
            </div>
            <button type="submit" className="ui teal button" disabled={isSubmitting || selectedPaintings.length !== 6}>Create Contest</button>
            <button onClick={handleRandomSelection} className="ui teal button" type='button'>Randomly Select 6 Paintings</button>
          </Form>
        )}
      </Formik>
    


    <div className='ui center aligned container'>
    </div>
      
      <h2>Selected Paintings</h2>
      <Grid centered stackable>
        {selectedPaintings.map(painting => (
          <Grid.Column key={painting.id} width={5}>
            <Card>
              <Image src={painting.image} wrapped ui={false} />
              <Card.Content>
                <Card.Header>{painting.title}</Card.Header>
              </Card.Content>
            </Card>
          </Grid.Column>
        ))}
      </Grid>

      {submissionStatus && 
    <span className='ui large red basic label' style={{marginTop: "10px"}}>{submissionStatus}</span>
    }
      
    
      <h2>Existing Polls</h2>
      <Grid>
        {Array.isArray(polls) && polls.map(poll => (
          <Grid.Column key={poll.id} width={16}>
            <Card fluid>
              <Card.Content>
                <Card.Header>Poll ID: {poll.id}
                  <div className='ui right floated' style={{ color: getPollStatus(poll.start_date, poll.end_date).color }}>
                    <span className={`ui ${getPollStatus(poll.start_date, poll.end_date).color} text`}>{getPollStatus(poll.start_date, poll.end_date).status}</span>
                  </div>
                </Card.Header>
                <Card.Meta>
                  <span>Start Date: {poll.start_date}</span>
                </Card.Meta>
                <Card.Meta>
                  <span>End Date: {poll.end_date}</span>
                </Card.Meta>
                <Card.Description>
                  <Card.Group itemsPerRow={3}>
                    {poll.paintings.map(painting => (
                      <Card key={painting.id}>
                        <Image src={painting.image} wrapped ui={false} />
                        <Card.Content>
                          <Card.Header>{painting.title}</Card.Header>
                          <Card.Description>
                            <span>Votes: <span className='ui large red text'>{painting.vote_total}</span></span>
                          </Card.Description>
                        </Card.Content>
                      </Card>
                    ))}
                  </Card.Group>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button onClick={() => handleDelete(poll.id)} basic color="red">Delete Poll</Button>
                <Button onClick={() => handleRandomVote(poll.id)} basic color="blue">Get Random Voter</Button>

                {selectedPollId === poll.id && randomVote && (
                    <span className='ui blue text'>
                        {randomVote.message ? randomVote.message : `${randomVote.voter_name} - ${randomVote.voter_email}`}
                    </span>
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        ))}
      </Grid>

    
    </div>
  );
};

export default PollAdmin;