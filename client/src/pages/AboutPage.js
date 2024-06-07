import React from 'react';
import './AboutPage.css';

function AboutPage() {
  return (
    <div className="about-container">
      <h1>About Culinary Critique</h1>
      <p>
        Welcome to Culinary Critique, where students and staff can share and explore reviews
        of dining halls across UCLA. Our mission is to provide a space for honest, comprehensive feedback
        on dining services to help you make the best dining choices. Whether you're looking for the healthiest
        options, the best comfort food, or the quickest service, our community-driven reviews cover all aspects
        of campus dining experiences.
      </p>
      <h2>What is Culinary Critique?</h2>
      <p>
        Culinary Critique is a community-driven platform where students and staff can share their dining experiences across UCLA.
      </p>
      <h2>Who developed Culinary Critique?</h2>
      <p>
        Culinary Critique was developed by a dedicated team of students. You can see the source code at this <a href="https://github.com/nleobandung/culinary-critique">link</a>.
      </p>
      <h2>How can I start using Culinary Critique?</h2>
      <p>
        Log in today to start using Culinary Critique and share your dining experiences!
      </p>
    </div>
  );
}

export default AboutPage;
