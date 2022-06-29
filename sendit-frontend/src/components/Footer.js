import React from 'react'
import "../styles/footer.css"

function  Footer(){
   
        return (
          <div className="footer">
            <ul>
              <li>
                <h2>About us</h2>
                <p>
                  SendIT is a parcel/courier service that <br />
                  delivers orders perfectly with utmost speed
                </p>
              </li>
              <li>
                <h2>Address</h2>
                <p>
                  124, palm street, <br />
                  ikeja, Lagos.
                </p>
              </li>
              <li>
                <h2>Working Hours</h2>
                <p>
                  Weekdays: 8am - 6pm <br />
                  Weekends: 10am - 4pm
                </p>
              </li>
            </ul>
          </div>
        );
}

export default Footer;
