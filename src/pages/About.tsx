import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBack from "../components/icons/ArrowBack";
import "../styles/About.css";

const About = (): React.ReactElement => {
  const navigate = useNavigate();

  return (
    <main>
      <header className="route-header">
        <button className="rounded" onClick={() => navigate("/")}>
          <ArrowBack />
        </button>
        <h1>About</h1>
      </header>
      <div className="About">
        <section>
          <h2>The app</h2>
          <p>
            &quot;People&quot; let you add contacts to a list, edit and remove
            them, it uses your browser as storage so if you leave the app it
            will remember the data that you posted.
          </p>
        </section>
        <section>
          <h2>Me</h2>
          <p>
            Hi, I&apos;m Lucas, Web Developer from Argentina, my development
            stack is Javascript (Vanilla, React, Node), HTML, CSS and more, you
            can see my full profile at my{" "}
            <a
              href="https://lucaspanaro.ga/"
              rel="noopener noreferrer"
              target="_blank"
              className="About-me-link"
            >
              website
            </a>{" "}
            or my{" "}
            <a
              href="https://www.linkedin.com/in/lucas-panaro/"
              rel="noopener noreferrer"
              target="_blank"
              className="About-me-link"
            >
              LinkedIn
            </a>
            .
          </p>
          <p>Feel free to send my a message!</p>
          <ul className="About-me-links">
            <li>
              <a
                href="https://www.github.com/marlopc"
                rel="noopener noreferrer"
                target="_blank"
              >
                Github
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/lucas-panaro/"
                rel="noopener noreferrer"
                target="_blank"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://lucaspanaro.ga/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Website
              </a>
            </li>
          </ul>
        </section>
        <section>
          <h2>The development</h2>
          <p>
            With this app I tried to mimic a Google type website style without
            using any external libraries but React / React-router.
          </p>
          <p>
            I used Typescript (programming language that I&apos;m currently
            learning) for this app as a practical exercise, the app was made in
            1 day, as a personal challenge to make a good looking, functional
            app and being fast writting it.
          </p>
          <p>
            The current version is focused in mobile version, although it&apos;s
            functional for desktop too.
          </p>
          <p>I hope you liked the app, thanks for visiting it!</p>
        </section>
      </div>
    </main>
  );
};

export default About;
