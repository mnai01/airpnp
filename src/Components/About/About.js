import React from "react";
import "./about.css";

const About = () => {
  return (
    <div className="about">
      <div className="banner dark-layer">
        <div>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum
            libero, deserunt saepe quod a iure aliquid optio, vitae, dicta
            laudantium cum fuga expedita quia tempore aliquam quos recusandae
            eveniet. Recusandae?
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste
            accusantium, repellat laudantium repellendus dicta in nihil. Iure
            exercitationem rerum voluptatem dolorum, neque excepturi aut
            voluptatum porro corrupti alias quis ea!
          </p>
        </div>
      </div>
   <div className="bottom">
        <div className="flex-wrap">
          <div>
            <h2>Our Mission</h2>
            <p>AirPnP is a gateway to the restroom experience you deserve.</p>
          </div>
          <div>
            <h2>Our Promise</h2>
            <p>
              We deliver the search capability, detail, availibility and point
              of view to our user.
            </p>
          </div>
          <div>
            <h2>Our Essence</h2>
            <p>
              At our core, AirPnp operates on creativity, culture,
              collectiveness, and choice.
            </p>
          </div>
          <div>
            <h2>Our Vibe</h2>
            <p>
              At AirPnp, we make magic. We dream it, do it, so you can do what
              was once impossible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
