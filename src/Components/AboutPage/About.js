import React from "react";
import "./about.css";

const About = () => {
  return (
    <div className="about">
      <div className="banner dark-layer">
        <div>
          <p>
            Welcome to AirPnP
          </p>
          <p>
            Get to know us
          </p>
        </div>
      </div>
      <div className="top-content">
        <h2>Who we are</h2>
        <p>
        Airpnp is the first of its kind in the world to help you find a place to do your business at the palm of your hand. 
You will never have to experience the pain of going to storefront to storefront to ask if you can use their bathroom ever again. 
Whether you want to use a free public bathroom or experience one of our many private bathrooms. 
We offer over 20,000 public bathrooms in the US and many private bathroom experiences all around the world.
        </p>
        <p>
        Airpnp promotes easy living, 
        has benefited many entrepreneurs financially just by opening their bathrooms to the public at a cost and provides unique bathroom experiences to everyone.
        </p>
      </div>
      <div className="bottom">
          <div className="flex-wrap">
              <div>
                  <h2>Our Mission</h2>
                  <p>AirPnP is a gateway to the restroom experience you deserve.</p>
              </div>
              <div>
                  <h2>Our Promise</h2>
                  <p>We deliver the search capability, detail, availibility and point of view to our user.</p>
              </div>
              <div>
                  <h2>Our Essence</h2>
                  <p>At our core, AirPnp operates on creativity, culture, collectiveness, and choice.</p>
              </div>
              <div>
                  <h2>Our Vibe</h2>
                  <p>At AirPnp, we make magic. We dream it, do it, so you can do what was once impossible.</p>
              </div>
          </div>
      </div>
    </div>
  );
};

export default About;
