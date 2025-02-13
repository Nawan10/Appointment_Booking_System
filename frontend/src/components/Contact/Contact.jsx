import React from 'react';
import './Contact.css';
import contact from '../../assets/contact.png';
import contact_mail from '../../assets/contact_mail.png';
import contact_tel from '../../assets/contact_tel.png';
import contact_location from '../../assets/contact_location.png';

function Contact() {

    const [result, setResult] = React.useState("");

    // sending an email after submit

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "603638f4-baf6-4fc1-b463-95f56bbdd4ce");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Message Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

    return (
      <div className='contact'>
          {/* Header Section */}
          <div className='contact-header'>
              <h1> Contact Us </h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              </p>
          </div>

          {/* Main Content - Contact Details & Form */}
          <div className='contact-content'>
              <div className='contact-col-left'>
                  <h3>Send us a message <img src={contact} alt='' /> </h3>
                  <ul>
                      <li><img src={contact_mail} alt='' />contact@YoungVéSalon.com </li>
                      <li><img src={contact_tel} alt='' />+94 123-456-7890</li>
                      <li><img src={contact_location} alt='' />35/D4 Main Road, Colombo,<br/> Sri Lanka</li>
                  </ul>
              </div>
  
              <div className='contact-col-right'>
                  <form onSubmit={onSubmit}>
                      <label>Your Name</label>
                      <input type='text' name='name' placeholder='Enter Your Name' required />
                      <label>Phone Number</label>
                      <input type='tel' name='phone' placeholder='Enter Your Phone Number' required />
                      <label>Message</label>
                      <textarea name='message' rows='6' placeholder='Write Your Message Here' required></textarea>
                      <button type='submit' className='btn'>Submit Message</button>
                  </form>
                  <span>{result}</span>
              </div>
          </div>
      </div>
    )
  }  

export default Contact