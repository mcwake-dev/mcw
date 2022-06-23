export default function TimelineTech({ tech }) {
  let icons = "fa ";

  switch (tech) {
    case "python":
      icons += "fa-python";
      break;
    case "excel":
      icons += "fa-file-excel-o";
      break;
    case "powerpoint":
      icons += "fa-file-powerpoint-o";
      break;
    case "react":
      icons += "fa-react";
      break;
    case "heroku":
      icons += "fa-heroku";
      break;
    case "nodejs":
      icons += "fa-nodejs";
      break;
    case "asp":
      icons += "fa-code";
      break;
    case "oracle":
    case "mongodb":
    case "postgresql":
    case "sqlite":
    case "access":
      icons += "fa-database";
      break;
    case "html":
      icons += "fa-html5";
      break;
    case "css":
      icons += "fa-css3";
      break;
    case "google maps":
      icons += "fa-map";
      break;
    default:
      break;
  }

  return (
    <div className="tech">
      <i className={icons}></i> {tech}
    </div>
  );
}
