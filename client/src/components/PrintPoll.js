import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useAdmin } from '../context/admin';
import { Card, Grid, Button, Image, Segment, Modal, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';



const PrintPoll = () => {
  const [selectedPainting, setSelectedPainting] = useState(null);
  const [paintings, setPaintings] = useState([]);
  const {isAdmin} = useAdmin();
  const [nextPollStartDate, setNextPollStartDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');


  useEffect(() => {
    // Fetch the current poll data
    axios.get('/current_poll')
      .then(response => {
        if (response.data.paintings) {
          setPaintings(response.data.paintings);
        } else {
          console.error('No paintings found for the current poll');
          fetchNextPollStartDate();
        }
      })
      .catch(error => {
        console.error('Error fetching current poll:', error);
        fetchNextPollStartDate();
      });
  }, []);

  const fetchNextPollStartDate = () => {
    axios.get('/next_poll_start_date')
      .then(response => {
        if (response.data.start_date) {
          setNextPollStartDate(response.data.start_date);
        } else {
          console.error('No upcoming polls found');
        }
      })
      .catch(error => console.error('Error fetching next poll start date:', error));
  };


  const handleSelect = (paintingId) => {
    setSelectedPainting(paintingId);
    // console.log(selectedPainting);
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Check if the user has already voted
    axios.post('/check_vote', { email: values.email })
      .then(response => {
        if (response.data.hasVoted) {
          alert('You have already voted in this poll. You can only vote once per poll.');
          setSubmitting(false);
        } else {
          // Proceed with submitting the vote
          const data = {
            ...values,
            painting_id: selectedPainting,
          };
  
          axios.post('/vote', data)
            .then(response => {
              alert('Vote submitted successfully!');
              setSubmitting(false);
              resetForm(); // Reset the form fields
              setSelectedPainting(null); // Optionally reset the selected painting
            })
            .catch(error => {
              console.error('Error submitting vote:', error);
              setSubmitting(false);
            });
        }
      })
      .catch(error => {
        console.error('Error checking vote:', error);
        setSubmitting(false);
      });
  };

  const openModal = (image) => {
    setModalImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImage('');
  };

  return (
    <div className='ui text container' style={{marginTop: "110px"}}>
    <div>
      <h1>🌟 Cast Your Vote & Win a Limited-Edition Art Print! 🌟</h1>
      <p>Welcome to our exclusive art contest, where your voice has the power to bring a painting to life as a limited-edition print! We’ve handpicked three of our most captivating pieces, and now it’s up to you to decide which one will be transformed into a collectible work of art.</p>
      { isAdmin && (
      <div className='ui center aligned container'>
        <Link to="/polladmin">
          <Button color="teal">Poll Admin Panel</Button>
        </Link>
      </div>
      )}
      <h2>How It Works:</h2>
      <ol>
        <li>
          <strong>Explore the Art:</strong>
          <p>Take a moment to admire the three paintings we've selected for this contest. Each piece is a unique blend of creativity and emotion, crafted to inspire and captivate.</p>
        </li>
        <li>
          <strong>Make Your Choice:</strong>
          <p>Vote for the painting you want to see as a limited-edition print. The artwork with the most votes will be produced in an exclusive run of just 5 prints, making it a truly rare and special piece.</p>
        </li>
        <li>
          <strong>Win & Purchase:</strong>
          <p>When you cast your vote, you’ll automatically enter for a chance to <strong>win a free print</strong> of the winning artwork! As a voter, you’ll also get first access to purchase one of the limited prints before they’re available to the public.</p>
        </li>
        <li>
          <strong>Celebrate Your Impact:</strong>
          <p>The remaining prints will be available for sale, offering a unique opportunity to own a piece of art that you helped bring to life.</p>
        </li>
      </ol>
    
      <h2>Why Participate?</h2>
      <ul>
        <li><strong>Influence the Art:</strong> Be an integral part of our creative journey by choosing which painting becomes a print.</li>
        <li><strong>Exclusive Access:</strong> Secure your spot to purchase a limited edition print before anyone else.</li>
        <li><strong>Chance to Win:</strong> Stand a chance to win a free print of the artwork you voted for!</li>
      </ul>
    
      <h2>How to Vote:</h2>
      <ol>
        <li>Browse through the selected paintings below.</li>
        <li>Click on your favorite, then enter your name and email adress to cast your vote.</li>
        <li>Keep an eye on your inbox—we’ll notify you if you’re the lucky winner!</li>
      </ol>
    
    </div>

   {paintings.length > 0 ? (
    <>
    <h2>Vote Now!</h2>
      <p>Voting closes soon, so don't miss out on this exciting opportunity to shape our next limited edition print and take home a piece of art that’s as unique as your taste.</p>    

    <div className='ui center aligned container'>  
    <Grid centered padded stackable>
        {paintings.map(painting => (
          <Grid.Column key={painting.id} width={5} style={{textAlign: "center"}}>
            <Card
              link
              onClick={() => handleSelect(painting.id)}
              className={selectedPainting === painting.id ? 'selected' : ''}
              color={selectedPainting === painting.id ? 'teal' : null}
            >
              <Image src={painting.image} ui={false} />
              <Card.Content>
                <Card.Header>{painting.title}</Card.Header>
              </Card.Content>
            </Card>
            <Button onClick={() => openModal(painting.image)} basic size='small' color="teal" labelPosition='left' icon>
                  <Icon name="expand" />
                  View Full Size
                </Button>
            </Grid.Column>
        ))}
      </Grid>
        </div>

      <Formik
        initialValues={{ name: '', email: '' }}
        validationSchema={Yup.object({
          name: Yup.string().required('Please enter your name'),
          email: Yup.string().email('Invalid email address').required('Please enter your email'),
        })}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className='ui form'>
            <div className='equal width fields'>
            <div className='field'>
              <label htmlFor="name">Name</label>
              <Field name="name" type="text" className="ui input"/>
              <ErrorMessage name="name" component="div" className="ui pointing red basic label"/>
            </div>
            <div className='field'>
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" className="ui input"/>
              <ErrorMessage name="email" component="div" className="ui pointing red basic label"/>
            </div>
            </div>
            <div className='ui center aligned container'>
              <p><small>By voting, you agree to subscribe to our mailing list and receive infrequent emails.</small></p>
            
            <button type="submit" className='ui large circular teal button' disabled={isSubmitting || !selectedPainting}>Submit Vote</button>
            </div>

          </Form>
        )}
      </Formik>
      </>
   ): (
        <Segment textAlign='center'>
          <h2>There Are no Active Polls currently</h2>
          {nextPollStartDate && (
            <h4 style={{marginTop: "0px"}}>The next poll will start on: {new Date(nextPollStartDate).toLocaleString()}</h4>
          )}
        </Segment>
)}

      <Modal open={modalOpen} dimmer='blurring' basic closeIcon onClose={closeModal}>
        <Modal.Content image>
          <Image src={modalImage} wrapped />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={closeModal}>Close</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default PrintPoll;