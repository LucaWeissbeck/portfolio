import React, { Component } from "react";
import Slide from "react-reveal";

class Resume extends Component {
  getRandomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render() {
    if (!this.props.data) return null;

    const skillmessage = this.props.data.skillmessage;
    const education = this.props.data.education.map(function (education) {
      return (
        <div key={education.school}>
          <h3>{education.school}</h3>
          <p className="info">
            {education.degree} <span>&bull;</span>
            <em className="date">{education.graduated}</em>
          </p>
          <p>{education.description}</p>
        </div>
      );
    });

    const work = this.props.data.work.map(function (work) {
      const workpic = "images/" + work.image;
      const projectReport = "resources/" + work.projectReport;
      return (
        <div key={work.company} style={{ marginTop: "10%" }}>
          <h3>{work.company}</h3>
          <p className="info">
            {work.title}
            <span>&bull;</span> <em className="date">{work.years}</em>
          </p>
          {work.projectReport &&
            <div className="download">
              <a href={projectReport} className="button" >
                <i className="fa fa-download"></i> Download Project Report
              </a>
            </div>
          }
          <p>{work.description}</p>
          {work.title === "Moovster - Sustainable Mobility Startup" &&
            <p>Click <a href="https://www.getmoovster.com/" target="_blank" rel="noreferrer" style={{ "color": "blue", "textDecoration": "underline" }}>here</a> to learn more about Moovster!</p>

          }
          {work.title === "IBM - IoT Center Munich" &&
            <p>The exhibit is now live at the German Museum in Nuremberg. <a href="https://www.deutsches-museum.de/nuernberg" target="_blank" rel="noreferrer" style={{ "color": "blue", "textDecoration": "underline" }}>https://www.deutsches-museum.de/nuernberg</a></p>
          }
          {work.image &&
            <img src={workpic} alt={work.title}></img>
          }
          {!work.last &&
            <hr />
          }


        </div>
      );
    });

    const skills = this.props.data.skills.map((skills) => {
      const backgroundColor = this.getRandomColor();
      const className = "bar-expand " + skills.name.toLowerCase();
      const width = skills.level;

      return (
        <li key={skills.name}>
          <span style={{ width, backgroundColor }} className={className}></span>
          <em>{skills.name}</em>
        </li>
      );
    });

    return (
      <section id="resume">

        <div className="row work">
          <div className="three columns header-col">
            <h1>
              <span>Work Experiences</span>
            </h1>
          </div>

          <div className="nine columns main-col">{work}</div>
        </div>

        <Slide left duration={1300}>
          <div className="row education">
            <div className="three columns header-col">
              <h1>
                <span>Education</span>
              </h1>
            </div>

            <div className="nine columns main-col">
              <div className="row item">
                <div className="twelve columns">{education}</div>
              </div>
            </div>
          </div>
        </Slide>

        <Slide left duration={1300}>
          <div className="row skill">
            <div className="three columns header-col">
              <h1>
                <span>Skills</span>
              </h1>
            </div>

            <div className="nine columns main-col">
              <p>{skillmessage}</p>

              <div className="bars">
                <ul className="skills">{skills}</ul>
              </div>
            </div>
          </div>
        </Slide>
      </section>
    );
  }
}

export default Resume;
