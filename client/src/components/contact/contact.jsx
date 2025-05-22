import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "./constact.scss";

const Contact = () => {
  return (
    <section className="contact">
      <div className="contact-container">
        <h2>Contact Us</h2>
        <form>
          <div className="input-group">
            <input type="text" placeholder="Your Name" required />
          </div>
          <div className="input-group">
            <input type="email" placeholder="Your Email" required />
          </div>
          <div className="input-group">
            <textarea placeholder="Your Message" required></textarea>
          </div>
          <button type="submit">Send Message</button>
        </form>

        {/* Social Media Buttons */}
        <div className="social-media">
          <p>Or reach us on</p>
          <div className="social-icons">
            <a href="#" className="facebook"><FaFacebookF /></a>
            <a href="#" className="twitter"><FaTwitter /></a>
            <a href="#" className="instagram"><FaInstagram /></a>
            <a href="#" className="linkedin"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact