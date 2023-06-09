import { Link } from "react-router-dom";
import logo from "../../../assets/logos/krafti-logo.png";
import { FaEnvelope, FaFacebookSquare, FaGlobe, FaLinkedin, FaPhoneSquare, FaTwitterSquare, FaYoutubeSquare } from 'react-icons/fa';

const Footer = () => {
    return (
        <div>
            <footer className="footer p-10 bg-primary text-primary-content">
                <div>
                    <img src={logo} alt="footer-info-logo" />
                    <p><span className="text-xl font-bold">Krafti-Summer Camp Learning School</span><br />- Providing practical training since 2003.</p>
                </div>
                <div>
                    <span className="footer-title">Contact</span>
                    <div className="flex">
                        <FaGlobe className="mt-1" />
                        <p className="ml-1">
                            <span className="font-bold">Address:</span> 456 Elmwood Avenue,
                            <br />Springfield, NY 12345
                            <br />United States.
                        </p>
                    </div>
                    <div className="flex">
                        <FaEnvelope className="mt-1" />
                        <p className="ml-1">
                            <span className="font-bold">Email:</span> <a href="mailto:info@kraftisummerschool.com">info@kraftisummerschool.com</a>
                        </p>
                    </div>
                    <div className="flex">
                        <FaPhoneSquare className="mt-1" />
                        <p className="ml-1">
                            <span className="font-bold">Phone:</span> <a href="tel:+1 5551234567">+1555-123-4567</a>
                        </p>
                    </div>


                </div>
                <div>
                    <span className="footer-title">Company</span>
                    <Link to="#" className="link link-hover">About us</Link>
                    <Link to="#" className="link link-hover">Contact</Link>
                    <Link to="/all-instructors" className="link link-hover">All Instructors</Link>
                    <Link to="/all-classes" className="link link-hover">All Classes</Link>
                </div>
                <div>
                    <span className="footer-title">Legal</span>
                    <Link to="#" className="link link-hover">Terms of use</Link>
                    <Link to="#" className="link link-hover">Privacy policy</Link>
                    <Link to="#" className="link link-hover">Cookie policy</Link>
                </div>
            </footer>

            <footer className="footer px-10 py-4 border-t bg-neutral text-neutral-content border-base-300">
                <div className="items-center grid-flow-col">
                    <p>Copyright &copy; {new Date().getFullYear()} | <Link to="/" className="font-bold">Krafti-Summer Camp Learning School</Link> by <Link href="https://github.com/csmahmud99" target="_blank" className="font-bold">CS Mahmud</Link> <br />All Rights Reserved. </p>
                </div>
                <div className="md:place-self-center md:justify-self-end">
                    <div className="grid grid-flow-col gap-4 text-2xl">
                        <Link to="https://www.facebook.com" target="_blank"><FaFacebookSquare /></Link>
                        <Link to="https://twitter.com" target="_blank"><FaTwitterSquare /></Link>
                        <Link to="https://linkedin.com" target="_blank"><FaLinkedin /></Link>
                        <Link to="https://www.youtube.com" target="_blank"><FaYoutubeSquare /></Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;