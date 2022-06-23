import TimelineTech from "./TimelineTech";

export default function TimelineProject({
  title,
  description,
  technologies,
  year,
}) {
  return (
    <div className="projectContainer">
      <div className="timelineConnector"></div>
      <div className="year">{year}</div>
      <div className="project">
        <div className="title text-orange">{title}</div>
        <div className="description">{description}</div>
        <div className="technology">
          {technologies.map((tech) => (
            <TimelineTech key={title + tech} tech={tech} />
          ))}
        </div>
      </div>
    </div>
  );
}
