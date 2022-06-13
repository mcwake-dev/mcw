import timeline from "../services/timeline.service";
import TimelineProject from "../components/TimelineProject";

export default function experience() {
  const odds = timeline().filter((item, index) => index % 2 === 1);
  const evens = timeline().filter((item, index) => index % 2 === 0);

  const renderProject = ({ title, description, technologies, year }, index) => {
    return (
      <TimelineProject
        key={title + index}
        title={title}
        description={description}
        technologies={technologies}
        year={year}
      />
    );
  };

  return (
    <div id="experience" className="text-green">
      <h2>Projects by Release Year</h2>
      <div className="timeline text-grey">
        <div className="left">{odds.map(renderProject)}</div>
        <div className="right">{evens.map(renderProject)}</div>
      </div>
    </div>
  );
}
