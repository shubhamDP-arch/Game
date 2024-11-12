import React from 'react';
import '../../styles/contact.css';

const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <div className="contact-info">
        <h2>Contact Us</h2>
        <div className="info-item">
          <i className="fas fa-map-marker-alt"></i>
          <p>295 Witting Streets Suite 666, Melbourne, Australia</p>
        </div>
        <div className="info-item">
          <i className="fas fa-phone-alt"></i>
          <p>(01) 479-642-7461<br/>(01) 479-642-7462</p>
        </div>
        <div className="info-item">
          <i className="fas fa-envelope"></i>
          <p>anderson@hotmail.com<br/>hello@hotmail.com</p>
        </div>
      </div>

      <div className="contact-form">
        <h2>Or Write Us</h2>
        <form>
          <input type="text" placeholder="Name *" required />
          <input type="email" placeholder="Email *" required />
          <textarea placeholder="Enter Your Message" required></textarea>
          <button type="submit">SEND MESSAGE</button>
        </form>
      </div>
    </div>
  )}

export default ContactUs